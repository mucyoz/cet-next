import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css"; // Your global stylesheet

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Center for Education Transitions - Professional Credential Evaluation",
  description:
    "Professional credential evaluation and education transition support for internationally trained professionals. Get your credentials evaluated for career advancement in the United States.",
  keywords:
    "professional credential evaluation, internationally trained professionals, credential evaluation services, career advancement, education transition, US credential evaluation, professional licensing, international credentials",
  openGraph: {
    title:
      "Center for Education Transitions - Professional Credential Evaluation",
    description:
      "Professional credential evaluation and education transition support for internationally trained professionals. Get your credentials evaluated for career advancement in the United States.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Center for Education Transitions - Professional Credential Evaluation",
    description:
      "Professional credential evaluation and education transition support for internationally trained professionals.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* <!-- Meta Pixel Code --> */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '23966535932973959');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=23966535932973959&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* <!-- End Meta Pixel Code --> */}
      </head>
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
