import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Sidebar from "@/components/dashboard/Sidebar";
import { Toaster } from "react-hot-toast";
import Providers from "@/context/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Zaivi Attire CMS",
    template: `%s - Zaivi Attire CMS`,
  },
  description: "To manage Zaivi Attire",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Toaster />
          <main>
            <div className="w-full rounded-xl relative SCROLL_BAR">
              {children}
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
