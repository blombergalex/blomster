import type { Metadata } from "next";
import { Toaster } from "sonner";

import "./globals.css";
import Providers from "@/providers/theme-providers";
import { QueryClientProvider } from "@/providers/query-client-provider";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Blomster",
  description: "Where ideas bloom",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen text-primary bg-background">
        <Providers>
          <QueryClientProvider>
              {children}
              <Toaster />
            <Footer />
          </QueryClientProvider>
        </Providers>
      </body>
    </html>
  );
}
