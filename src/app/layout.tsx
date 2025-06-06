"use client";

import "./globals.css";
import { Toaster, TooltipProvider } from "@/components/ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/hooks/use-theme";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { ResponsiveLayout } from "@/layouts/ResponsiveLayout";
import { ClerkProvider } from "@clerk/nextjs";

// Initialize the query client
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
    >
      <html
        lang="en"
        suppressHydrationWarning
      >
        <body>
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
              <LanguageProvider>
                <ThemeProvider>
                  <TooltipProvider>
                    <ResponsiveLayout>{children}</ResponsiveLayout>
                    <Toaster />
                  </TooltipProvider>
                </ThemeProvider>
              </LanguageProvider>
            </Provider>
          </QueryClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
