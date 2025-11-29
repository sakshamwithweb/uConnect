import { Oxanium } from "next/font/google";
import "./globals.css";

const oxanium = Oxanium({
  subsets: ["latin"]
});

export const metadata = {
  title: "uConnect",
  description: "Connect with your like-minded neighbour",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${oxanium.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
