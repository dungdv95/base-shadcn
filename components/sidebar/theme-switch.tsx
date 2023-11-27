"use client";

import { useEffect, useState } from "react";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { match } from "ts-pattern";

import { Icons } from "@/components/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  function changeTheme() {
    if (theme === "dark") {
      setTheme("system");
      return;
    }

    if (theme === "system") {
      setTheme("light");
      return;
    }

    setTheme("dark");
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={changeTheme}
          className="p-2 opacity-50 transition duration-100 hover:opacity-100"
        >
          {match(theme)
            .with("light", () => <Sun className="w-4 h-4" />)
            .with("dark", () => <Moon className="w-4 h-4" />)
            .otherwise(() => (
              <Icons.adjust />
            ))}
        </button>
      </TooltipTrigger>
      <TooltipContent>
        {match(theme)
          .with("light", () => "Theme: Light")
          .with("dark", () => "Theme: Dark")
          .otherwise(() => "Theme: System/Auto")}
      </TooltipContent>
    </Tooltip>
  );
}
