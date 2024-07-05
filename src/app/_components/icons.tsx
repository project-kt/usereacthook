import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { Github } from "lucide-react";
import Link from "next/link";

export default function Icons() {
  return (
    <div className="flex items-center gap-x-2">
      <ModeToggle />
      <Link href={siteConfig.links.github} aria-label="github">
        <Button variant="ghost" size={"icon"}>
          <Github className="text-main h-5 w-5" />
        </Button>
      </Link>
    </div>
  );
}
