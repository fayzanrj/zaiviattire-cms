import Image from "next/image";
import logo from "../../../public/logo.png";
import SignoutButton from "../auth/SignoutButton";
import SideBarListItem from "./SideBarListItem";
import ROUTES from "@/constants/SidebarRoutes";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utilities/AuthOptions";

const Sidebar = async () => {
  const data = await getServerSession(authOptions);
  // @ts-ignore
  const username = data?.user.username;
  // @ts-ignore
  const role = data?.user.role;

  return (
    <aside className="fixed z-50 w-72 h-dvh border-r border-stone-300 bg-[#f6f6f6] overflow-y-auto SCROLL_BAR">
      <section className="h-16 border-b border-stone-300 relative ">
        {/* Logo */}
        <Image
          src={logo}
          width={800}
          height={1000}
          quality={100}
          alt="logo"
          className="w-16 CENTER left-5 mx-auto"
        />
      </section>

      {/* Nav items section */}
      <section className="my-3">
        <ul>
          {ROUTES.map((route, index) => (
            <SideBarListItem key={route.link} link={route.link}>
              {route.name}
            </SideBarListItem>
          ))}
          {role === "admin" && (
            <SideBarListItem key={"/dashboard/users"} link={"/dashboard/users"}>
              Users
            </SideBarListItem>
          )}
        </ul>
      </section>

      {/* Sign out button */}
      <SignoutButton username={username} />
    </aside>
  );
};

export default Sidebar;
