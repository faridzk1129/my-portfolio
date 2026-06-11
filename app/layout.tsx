import type { Metadata } from "next";
import { Poppins, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-poppins",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex",
});

export const metadata: Metadata = {
  title: "Farid Portfolio",
  description: "Personal Portfolio of Farid",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${ibmPlexMono.variable} font-sans bg-white`}>
        {children}
      </body>
    </html>
  );
}
