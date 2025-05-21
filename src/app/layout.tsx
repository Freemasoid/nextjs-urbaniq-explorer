"use client";

import "./globals.css";
import { Toaster } from "@/components/ui/Toaster";
import { Toaster as Sonner } from "@/components/ui/Sonner";
import { TooltipProvider } from "@/components/ui/Tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/hooks/use-theme";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { ResponsiveLayout } from "@/layouts/ResponsiveLayout";

// Initialize the query client
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
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
                  <Sonner />
                </TooltipProvider>
              </ThemeProvider>
            </LanguageProvider>
          </Provider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
