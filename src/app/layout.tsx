import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css"; // Your global stylesheet

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Center for Education Transitions",
  description: "Credential evaluation and education transition support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* ThemeProvider and Toaster now wrap the entire application */}
        <ThemeProvider defaultTheme="light">
          {children} {/* The 'children' will be your page components */}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
