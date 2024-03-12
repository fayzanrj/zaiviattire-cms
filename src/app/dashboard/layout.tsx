import Sidebar from "@/components/dashboard/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Dashboard",
    template: `%s - Zaivi Attire CMS`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Not available note */}
      <div className="non-availbiltiy-note h-svh px-10 justify-center items-center">
        <p className="text-2xl font-semibold font-sans text-center">
          Not available on devices with width less than 840 px
        </p>
      </div>
      {/* Main */}
      <div className="availability">
        <Sidebar />
        <div className="w-full rounded-xl relative pl-72">{children}</div>
      </div>
    </>
  );
}
