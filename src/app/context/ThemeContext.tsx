// //  try toggle theme logic 

"use client";

import React, { ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light" // Defaults to light; change to "system" if you want OS preference
      enableSystem={false} // Disable system sync if not needed; set to true for OS dark mode support
      storageKey="theme" // Matches your localStorage key
    >
      {children}
    </NextThemesProvider>
  );
};

// No need for custom useTheme; we'll import { useTheme } from 'next-themes' directly in components