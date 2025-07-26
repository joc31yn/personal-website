import type { Metadata } from "next";
import { Caveat, Poppins } from "next/font/google";
import "../styles/globals.css";
import Nav from "@/app/components/nav";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-caveat",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins",
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
        className={`${caveat.variable} ${poppins.variable} antialiased`}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}
