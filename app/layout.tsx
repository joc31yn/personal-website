import type { Metadata } from "next";
import {
  Caveat,
  Sora,
  Lato,
  Cinzel,
  Cinzel_Decorative,
} from "next/font/google";
import "../styles/globals.css";
import Nav from "@/app/components/nav";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-caveat",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-sora",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
});

const cinzelDecorative = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-cinzelDecorative",
});

export const metadata: Metadata = {
  title: "Jocelyn Xu",
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
        className={`${caveat.variable} ${sora.variable} ${lato.variable} ${cinzel.variable} ${cinzelDecorative.variable} antialiased`}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}
