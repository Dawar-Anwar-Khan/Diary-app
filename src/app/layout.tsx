import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Homework Whiteboard Generator",
  description: "Generate homework whiteboard images for school classes instantly",
   icons: {
    icon: "/book.png", 
}};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Patrick+Hand&family=Nunito:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-gray-100">
        {children}
      </body>
    </html>
  );
}
