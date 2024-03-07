import "./globals.css";

import StoreProvider from "./StoreProvider";

import { Theme, ThemePanel } from "@radix-ui/themes";
import { Inter } from "next/font/google";

import type { Viewport } from "next";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "TTC Eta Tracker v2",
  description:
    "A simple ETA tracker for the TTC, built on Next.js and Radix UI, Powered by umo API.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme
          appearance="dark"
          accentColor="sky"
          grayColor="slate"
          scaling="100%"
          radius="large"
        >
          <StoreProvider>{children}</StoreProvider>
          {/* uncomment for local testing */}
          {/* <ThemePanel /> */}
        </Theme>
      </body>
    </html>
  );
}
