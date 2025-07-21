import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/providers/ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "./logo.png",
    shortcut: "./logo.png",
  },
  title: "Тренировка",
  description: "Тренировка с подходами, ТРЕНИРОВКА, ОТЖИМНИЕ,ПОДЬЕМ С ТУРНИКА, ПРИСЕДАНИЕ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 h-100%`}
      >
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
