import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DataProvider } from "@/contexts/DataContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { MainHeader } from "@/components/main-header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ProjectPro",
  description: "Manage your projects efficiently with ProjectPro.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " flex min-h-screen flex-col"}>
        <AuthProvider>
          <DataProvider>
            <div className="flex-1">{children}</div>
          </DataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
