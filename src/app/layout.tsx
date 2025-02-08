import type { Metadata } from "next";
import { Montserrat, Nunito } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"]
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"]
});


const metadata: Metadata = {
  title: "Concord",
  description: "Let's chat",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${nunito.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}


export { metadata }