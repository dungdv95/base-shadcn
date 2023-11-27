import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { fontSans } from "@/lib/fonts";
import { ThemeProvider } from "@/components/provider-theme";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/app/providers";
import { ErrorConfirm } from "@/components/comfirm-error";
import { Confirmer } from "@/components/confirm";

export const metadata = {
  title: "EID-Merchants"
};
export default function RootLayout({ children }: { children: ReactNode }) {
  const body = cn("font-sans", fontSans.variable);

  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="icon" href="@/app/favicon.ico" sizes="any" />
      <body className={body}>
        <ThemeProvider>
          <TooltipProvider delayDuration={200}>
            <Providers> {children}</Providers>
            <Toaster />
            <ErrorConfirm />
            <Confirmer />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
