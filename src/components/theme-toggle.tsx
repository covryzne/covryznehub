"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useTheme } from "next-themes";

type ThemeToggleProps = {
  className?: string;
};

export const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <Button
      className={className}
      variant="outline"
      size="icon"
      aria-label="Toggle day / night theme"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
    >
      <Icons.sun aria-hidden="true" className="hidden size-5 dark:block" />
      <Icons.moon aria-hidden="true" className="size-5 dark:hidden" />
    </Button>
  );
};
