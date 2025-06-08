"use client";
import { CookiesProvider } from "react-cookie";
import { Toaster } from "react-hot-toast";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CookiesProvider>
      <Toaster />
      {children}
    </CookiesProvider>
  );
}
