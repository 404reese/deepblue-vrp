import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "../components/sidebar"; 
import Navbar from "../components/navbar";

export const metadata: Metadata = {
  title: "Fleety Admin Panel",
  description: "Made with love by Riddhesh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
      </head>
      <body className="antialiased">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
