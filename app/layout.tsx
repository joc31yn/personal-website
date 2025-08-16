import type { Metadata } from "next";
import { Caveat, Open_Sans, Sora } from "next/font/google";
import "../styles/globals.css";
import Nav from "@/app/components/nav";
import FlashlightCursor from "./components/flashlightCursor";
import CanvasCursor from "@/cursors/canvasCursor";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-caveat",
});

const opensans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-opensans",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "Jocelyn Xu | Portfolio",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${caveat.variable} ${opensans.variable} ${sora.variable} antialiased`}
      >
        <Nav />
        <CanvasCursor />
        {children}
      </body>
    </html>
  );
}
