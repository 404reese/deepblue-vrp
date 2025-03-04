import random
from datetime import datetime, timedelta

# Provided addresses
addresses = [
    {"address": "Chembur, Mumbai - Harbour Line, Maharashtra", "latitude": 19.0327996, "longitude": 72.8963568},
    {"address": "Chembur, Mumbai - Harbour Line, Maharashtra", "latitude": 19.0327996, "longitude": 72.8963568},
    {"address": "Ghatkopar East, Mumbai - Central Line, Maharashtra", "latitude": 19.0856, "longitude": 72.909277},
    {"address": "Plot Number 283, Road Number 3, Jawahar Nagar, Off S. V. Road, Goregaon (West), Mumbai, Maharashtra, India 400104, Goregaon West, Mumbai - North Mumbai, Maharashtra", "latitude": 19.155756, "longitude": 72.846862},
    {"address": "malad east, Malad East, Mumbai - North Mumbai, Maharashtra", "latitude": 19.177555, "longitude": 72.849887},
    {"address": "Bhandup, Mumbai, Bhandup, Mumbai - Central Line, Maharashtra", "latitude": 19.148058, "longitude": 72.937725},
    {"address": "Siddharth Nagar, Goregaon West, Mumbai, Goregaon West, Mumbai - North Mumbai, Maharashtra", "latitude": 19.15491921, "longitude": 72.84356576}
]

# Function to generate random time within a range
def random_time(start, end):
    delta = end - start
    random_seconds = random.randint(0, int(delta.total_seconds()))
    return start + timedelta(seconds=random_seconds)

# Function to generate unique names and phone numbers
def generate_unique_data(index):
    return {
        "senderName": f"Sender{index}",
        "receiverName": f"Receiver{index}",
        "phoneNumber": f"98765432{index:02d}"
    }

# Function to generate 20 entries for each warehouse
def generate_entries(warehouse_id):
    entries = []
    start_time = datetime(2025, 3, 8, 8, 30)
    end_time = datetime(2025, 3, 8, 22, 0)
    
    for i in range(20):
        data = generate_unique_data(i + 1)
        address = random.choice(addresses)
        visit_start = random_time(start_time, end_time)
        service_duration = timedelta(minutes=random.randint(5, 15))
        visit_end = visit_start + service_duration
        
        entry = {
            "senderName": data["senderName"],
            "receiverName": data["receiverName"],
            "receiverAddress": address["address"],
            "phoneNumber": data["phoneNumber"],
            "visit": {
                "location": {
                    "latitude": address["latitude"],
                    "longitude": address["longitude"]
                },
                "demand": 1073741824,
                "minStartTime": visit_start.isoformat() + "Z",
                "maxEndTime": visit_end.isoformat() + "Z",
                "serviceDuration": f"PT{service_duration.seconds // 60}M"
            }
        }
        entries.append(entry)
    
    return entries

# Generate entries for each warehouse
warehouses = [1, 2, 3]
all_entries = []
for warehouse_id in warehouses:
    entries = generate_entries(warehouse_id)
    all_entries.extend(entries)

# Construct SQL queries
sql_queries = []
for entry in all_entries:
    sql_query = f"""
    INSERT INTO your_table_name (senderName, receiverName, receiverAddress, phoneNumber, visit)
    VALUES (
        '{entry["senderName"]}',
        '{entry["receiverName"]}',
        '{entry["receiverAddress"]}',
        '{entry["phoneNumber"]}',
        '{json.dumps(entry["visit"])}'
    );
    """
    sql_queries.append(sql_query)

# Print SQL queries
for query in sql_queries:
    print(query)