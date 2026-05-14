import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NeuroChunk Trainer",
  description: "Neuro-scientific L2 listening trainer powered by MiMo V2.5 API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
