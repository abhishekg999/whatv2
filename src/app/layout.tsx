import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from './_components/Header';
import { TimedMessageProvider } from './_contexts/TimedMessageContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "What v2",
  description: "What editor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TimedMessageProvider>
          <div className="flex flex-col min-h-screen text-gray-50 bg-[rgb(17,_19,_31)]">
            <Header />
            <div className="flex flex-1">
              {/* <Sidebar /> */}
              {children}
            </div>
          </div>
        </TimedMessageProvider>
      </body>
    </html>
  );
}
