"use client";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { SessionProvider } from "next-auth/react";

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem={true}
        disableTransitionOnChange={true}
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
