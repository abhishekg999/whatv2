import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "./_components/Header";
import { TimedMessageProvider } from "./_contexts/TimedMessageContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

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
    <html lang="en" className={inter.className}>
      <body>
        <TimedMessageProvider>
          <div className="flex flex-col min-h-screen text-foreground bg-background">
            <Header />
            <div className="flex flex-1">{children}</div>
          </div>
        </TimedMessageProvider>
      </body>
    </html>
  );
}
