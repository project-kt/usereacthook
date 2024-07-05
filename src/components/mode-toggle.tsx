"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import useHasMounted from "./hooks/useHasMounted";

export function ModeToggle(): React.JSX.Element | undefined {
  const { theme, setTheme } = useTheme();
  const hasMounted = useHasMounted();

  const handleChamgeTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  if (hasMounted) {
    return (
      <Button onClick={handleChamgeTheme} size={"icon"} variant={"ghost"} aria-label="mode-toggle">
        {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>
    );
  }
}
