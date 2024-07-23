import type { Metadata } from "next";
import { Inter, Handlee} from "next/font/google";
import clsx from "clsx";
import "./globals.css";

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
  title: "ToniDocs",
  description: "Discover tonidocs by Toniann Wallace: a showcase of innovative software engineering projects and insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={clsx(inter.variable, handlee.variable)}>
      <body >{children}</body>
    </html>
  );
}
