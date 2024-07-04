import { ModeToggle } from "@/components/mode-toggle";
import type React from "react";
import Icons from "./icons";
import Logo from "./logo";
import MobileMenu from "./mobile-menu";
import NavbarMenu from "./navbar-menu";
import SearchCommand from "@/components/search-command";

export type NavBarLink = {
  title: string;
  href: string;
};

export default function Navbar(): React.JSX.Element {
  return (
    <nav
      role="navbar"
      className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 py-6 backdrop-blur-sm md:px-6"
    >
      <div className="hidden w-full items-center lg:flex">
        <Logo />
        <div className="flex items-center gap-x-3">
          <SearchCommand />
          <NavbarMenu />
        </div>
        <div className="ml-auto">
          <Icons />
        </div>
      </div>
      <div className="flex w-full gap-x-2 lg:hidden">
        <Logo />
        <div className="ml-auto">
          <ModeToggle />
        </div>
        <div className="ml-auto">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
