import type { Metadata } from "next";
import { Inter, Handlee} from "next/font/google";
import clsx from "clsx";
import "./globals.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})
 
const handlee= Handlee({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-handlee',
  weight: "400"
})

export const metadata: Metadata = {
  metadataBase: new URL('https://tonidocs.com'),
  title: "ToniDocs",
  description: "Discover tonidocs by Toniann Wallace: a showcase of innovative software engineering projects and insights.",
   openGraph: {
    images: '/images/og-mage.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={clsx(inter.variable, handlee.variable)}>
     
     <body>
      <Header />
      <NavBar />
      {children}
     </body>
    </html>
  );
}
