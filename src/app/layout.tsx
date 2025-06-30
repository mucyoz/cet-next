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
          <Toaster
            position="top-right"
            toastOptions={{
              // The `classNames` prop is where you add custom Tailwind CSS classes.
              classNames: {
                // ---- Base Toast Style ----
                // This is the default style that applies to all toasts.
                toast:
                  "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",

                // ---- Custom Styles for each toast type ----
                // These styles override the base style for specific toast types.
                success:
                  "group-[.toast]:bg-green-50 group-[.toast]:border-green-500 group-[.toast]:text-green-900 dark:group-[.toast]:bg-green-950 dark:group-[.toast]:border-green-700 dark:group-[.toast]:text-green-200",
                error:
                  "group-[.toast]:bg-red-50 group-[.toast]:border-red-500 group-[.toast]:text-red-900 dark:group-[.toast]:bg-red-950 dark:group-[.toast]:border-red-700 dark:group-[.toast]:text-red-200",
                info: "group-[.toast]:bg-blue-50 group-[.toast]:border-blue-500 group-[.toast]:text-blue-900 dark:group-[.toast]:bg-blue-950 dark:group-[.toast]:border-blue-700 dark:group-[.toast]:text-blue-200",
                warning:
                  "group-[.toast]:bg-yellow-50 group-[.toast]:border-yellow-500 group-[.toast]:text-yellow-900 dark:group-[.toast]:bg-yellow-950 dark:group-[.toast]:border-yellow-700 dark:group-[.toast]:text-yellow-200",

                // ---- Styles for other elements within the toast ----
                title: "font-semibold",
                description: "group-[.toast]:text-muted-foreground",
                actionButton:
                  "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
                cancelButton:
                  "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
