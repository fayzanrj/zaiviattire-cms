"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SideBarListItemProps {
  link: string;
  children: React.ReactNode;
}

const SideBarListItem: React.FC<SideBarListItemProps> = ({
  link,
  children,
}) => {
  // Getting path names to find active page
  const pathname = usePathname();
  const path = pathname.split("/");
  const itemLink = link.split("/");

  return (
    <li
      className={`my-1 text-sm text-left font-semibold p-2.5 rounded-lg w-11/12 mx-auto ${
        itemLink[2] === path[2] && "bg-stone-300"
      }`}
    >
      <Link href={link}>{children}</Link>
    </li>
  );
};

export default SideBarListItem;
