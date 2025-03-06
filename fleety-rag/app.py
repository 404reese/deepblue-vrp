import streamlit as st
from supabase import create_client, Client
import os
from dotenv import load_dotenv
import pandas as pd
import plotly.express as px
from groq import Groq
from io import BytesIO
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

# Load environment variables
load_dotenv()

# Get Supabase & Groq credentials
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Validate API keys
if not SUPABASE_URL or not SUPABASE_KEY:
    st.error("⚠️ Supabase credentials missing! Check your .env file.")
    st.stop()

if not GROQ_API_KEY:
    st.error("⚠️ GROQ_API_KEY is missing! Check your .env file.")
    st.stop()

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Initialize Groq client
client = Groq(api_key=GROQ_API_KEY)

# Function to get unique log IDs
def get_unique_log_ids():
    response = supabase.table("estimation_logs").select("log_id").execute()
    return list(set(log["log_id"] for log in response.data)) if response.data else []

# Function to fetch estimation log by log_id
def get_estimation_log(log_id):
    response = supabase.table("estimation_logs").select("*").eq("log_id", log_id).execute()
    return response.data[0] if response.data else None

# Function to fetch delivery log by log_id
def get_delivery_log(log_id):
    response = supabase.table("delivery_logs").select("*").eq("log_id", log_id).execute()
    return response.data[0] if response.data else None

# Function to get AI feedback from Groq
def get_groq_feedback(estimation_data, delivery_data):
    """Generates structured AI feedback using Groq's LLM."""
    
    prompt = f"""
    As a logistics optimization expert, provide a detailed analysis comparing the estimated and actual delivery performance. The response should be clear, professional, and easy to understand, avoiding overly technical jargon.

    ### **Summary of Key Insights**
    Briefly summarize the main observations, highlighting key discrepancies and potential areas for improvement.

    ### **Detailed Comparison**
    Compare the estimated and actual performance based on the following metrics:
    - **Total Time:** Estimated **{estimation_data["total_estimated_time"]} min**, Actual **{delivery_data["total_actual_time"]} min**.
    - **Distance:** Estimated **{estimation_data["estimated_distance"]} km**, Actual **{delivery_data["actual_distance"]} km**.
    - **Average Speed:** Estimated **{estimation_data["estimated_avg_speed"]} km/h**, Actual **{delivery_data["actual_avg_speed"]} km/h**.
    - **Fuel Consumption:** Estimated **{estimation_data["estimated_fuel"]} L**, Actual **{delivery_data["actual_fuel"]} L**.
    - **Cost:** Estimated **${estimation_data["estimated_cost"]}**, Actual **${delivery_data["actual_cost"]}**.
    - **Travel Time:** Estimated **{estimation_data["est_travel_time"]} min**, Actual **{delivery_data["act_travel_time"]} min**.
    - **Waiting Time:** Estimated **{estimation_data["est_waiting_time"]} min**, Actual **{delivery_data["act_waiting_time"]} min**.

    ### **Possible Reasons for Variations**
    Explain why the actual values deviated from the estimates. Consider factors such as:
    - Traffic congestion or unexpected delays.
    - Driver behavior and route deviations.
    - Inaccurate fuel consumption estimates.
    - External factors like weather conditions or roadblocks.

    ### **Recommendations for Improvement**
    Provide actionable recommendations to improve future estimations, such as:
    - Enhancing route optimization models.
    - Incorporating real-time traffic data.
    - Adjusting fuel and cost prediction methods.
    - Training drivers for better efficiency.

    Ensure the response is well-structured and formatted for easy reading.
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.5
    )

    return response.choices[0].message.content

# Function to export data and feedback as PDF
def export_to_pdf(log_id, df, feedback):
    buffer = BytesIO()
    pdf = canvas.Canvas(buffer, pagesize=letter)
    
    pdf.setFont("Helvetica-Bold", 14)
    pdf.drawString(200, 750, f"Delivery Log Report - Log ID: {log_id}")
    
    pdf.setFont("Helvetica", 12)
    pdf.drawString(50, 720, "📊 Estimation vs Actual Data")

    y_position = 700
    for index, row in df.iterrows():
        pdf.drawString(50, y_position, f"{row['Metric']}: Estimated {row['Estimated']}, Actual {row['Actual']}")
        y_position -= 20

    pdf.drawString(50, y_position - 20, "🧠 AI Feedback & Recommendations:")
    
    y_position -= 40
    for line in feedback.split("\n"):
        pdf.drawString(50, y_position, line)
        y_position -= 15
        if y_position < 50:  # Move to next page if needed
            pdf.showPage()
            y_position = 750

    pdf.save()
    buffer.seek(0)
    return buffer

# Streamlit UI
st.title("Fleety Dev Log Viewer")

# Fetch unique log IDs
log_ids = get_unique_log_ids()

if log_ids:
    selected_log_id = st.selectbox("Select a Log ID:", log_ids)

    if selected_log_id:
        with st.spinner("Fetching data..."):
            estimation_data = get_estimation_log(selected_log_id)
            delivery_data = get_delivery_log(selected_log_id)

        if estimation_data and delivery_data:
            st.subheader("📊 Estimation vs Actual Data")

            # Convert data into DataFrame
            data_dict = {
                "Metric": [
                    "Total Time (min)", "Distance (km)", "Average Speed (km/h)", 
                    "Fuel Consumption (L)", "Cost ($)", "Travel Time (min)", "Waiting Time (min)"
                ],
                "Estimated": [
                    estimation_data["total_estimated_time"], estimation_data["estimated_distance"],
                    estimation_data["estimated_avg_speed"], estimation_data["estimated_fuel"],
                    estimation_data["estimated_cost"], estimation_data["est_travel_time"],
                    estimation_data["est_waiting_time"]
                ],
                "Actual": [
                    delivery_data["total_actual_time"], delivery_data["actual_distance"],
                    delivery_data["actual_avg_speed"], delivery_data["actual_fuel"],
                    delivery_data["actual_cost"], delivery_data["act_travel_time"],
                    delivery_data["act_waiting_time"]
                ]
            }

            df = pd.DataFrame(data_dict)

            # Show Data Table
            st.dataframe(df, use_container_width=True)

            # Show comparison charts
            st.subheader("📈 Comparison Charts")
            fig_bar = px.bar(df, x="Metric", y=["Estimated", "Actual"], barmode="group",
                             title="Estimated vs Actual Values", text_auto=True)
            st.plotly_chart(fig_bar, use_container_width=True)

            # AI Feedback Button
            if st.button("🧠 Get AI Feedback"):
                with st.spinner("Generating AI Feedback..."):
                    feedback = get_groq_feedback(estimation_data, delivery_data)
                st.session_state.feedback = feedback  # Store feedback in session state

            # Display AI Feedback if available
            if "feedback" in st.session_state:
                st.subheader("📌 AI Feedback & Recommendations")
                st.write(st.session_state.feedback)

                # PDF Export Button
                if st.button("📄 Export as PDF"):
                    pdf_buffer = export_to_pdf(selected_log_id, df, st.session_state.feedback)
                    st.download_button(
                        label="Download PDF",
                        data=pdf_buffer,
                        file_name=f"Delivery_Report_{selected_log_id}.pdf",
                        mime="application/pdf"
                    )

        else:
            st.warning("⚠️ No data found for the selected log.")
else:
    st.error("❌ No log data available.")