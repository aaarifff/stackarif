import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { THEME_INIT_SCRIPT } from "@/lib/theme";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ClientTalk — English practice for freelancers",
  description:
    "Practice English client conversations for web development and digital marketing freelancing, with AI roleplay, three reply ideas, and coaching feedback.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // The inline script below mutates <html>'s class list before hydration.
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Applies the stored (or OS-preferred) theme before the first paint. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
