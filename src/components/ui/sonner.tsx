"use client";

import { Toaster as Sonner, ToasterProps } from "sonner@2.0.3";

const Toaster = ({ ...props }: ToasterProps) => {
  // Detect theme from document root
  const isDark = document.documentElement.classList.contains('dark-theme');

  return (
    <Sonner
      theme={isDark ? "dark" : "light"}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--seasons-bg-elev)",
          "--normal-text": "var(--seasons-text-primary)",
          "--normal-border": "var(--seasons-border-hair)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
