import type { Metadata } from "next";

import "./globals.css";
import Providers from "./providers/theme-providers";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { QueryClientProvider } from "./providers/query-client-provider";

export const metadata: Metadata = {
  title: "Blomster",
  description: "Where ideas bloom",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="text-primary bg-background">
        <Providers>
          <QueryClientProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </QueryClientProvider>
        </Providers>
      </body>
    </html>
  );
}
