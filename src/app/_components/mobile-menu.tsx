"use client";

import SearchCommand from "@/components/search-command";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { docsConfig } from "@/config/docs";
import { Atom, EllipsisVertical, Menu, Search } from "lucide-react";
import { useState } from "react";
import HooksSidebarLinks from "../docs/_components/hooks-sidebar-links";
import Divider from "./divider";
import Icons from "./icons";
import Logo from "./logo";
import NavbarMenu from "./navbar-menu";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full bg-background/80 backdrop-blur-sm">
        <div className="flex h-full flex-col">
          <div className="sticky top-0 pb-3">
            <Logo />
          </div>
          <div className="flex h-full flex-1 flex-col overflow-y-auto py-3">
            <div className="mb-8">
              <p className="mb-2 flex items-center font-semibold">
                Search
                <Search className="ml-2 h-4 w-4" />
              </p>
              <SearchCommand />
            </div>
            <div className="flex w-full flex-col gap-y-3" onClick={() => setOpen(false)}>
              <Divider>
                Menu
                <EllipsisVertical className="ml-2 h-4 w-4" />
              </Divider>
              <NavbarMenu />
              <Divider>
                Documentation Hooks
                <Atom className="ml-2 h-4 w-4" />
              </Divider>
              <HooksSidebarLinks items={docsConfig} />
            </div>
          </div>
          <div className="sticky bottom-0 pt-3">
            <Icons />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
