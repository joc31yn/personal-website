import type { Metadata } from "next";
import { Caveat, Poppins, Sora } from "next/font/google";
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
        className={`${caveat.variable} ${poppins.variable} ${sora.variable} antialiased`}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}
