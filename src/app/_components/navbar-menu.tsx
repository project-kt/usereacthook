"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type NavBarLink } from "./navbar";
import { NAVBAR_LINKS } from "@/lib/constats";

export default function NavbarMenu() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <>
      {Object.entries(NAVBAR_LINKS).map(([title, href], index) => (
        <div key={index}>
          <Button variant={!isActive(href) ? "ghost" : "secondary"} asChild>
            <Link href={href}>{title}</Link>
          </Button>
        </div>
      ))}
    </>
  );
}
