import { Bell, ChevronDown, Moon, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { navSections } from "@/lib/nav";

function useTitle() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  for (const section of navSections) {
    for (const item of section.items) {
      if (item.url === pathname) return item.title;
      const child = item.children?.find((c) => c.url === pathname);
      if (child) return item.children && item.url === undefined ? child.title : child.title;
    }
  }
  return "Dashboard";
}

export function AppHeader({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const title = useTitle();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="flex h-[72px] shrink-0 items-center gap-4 border-b border-border bg-surface px-5">
      <button
        type="button"
        onClick={onToggle}
        aria-label="Toggle sidebar"
        className="rounded-md border border-border p-1.5 text-muted-foreground transition-colors hover:bg-muted"
      >
        {collapsed ? (
          <PanelLeftOpen className="size-[18px]" />
        ) : (
          <PanelLeftClose className="size-[18px]" />
        )}
      </button>
      <span className="h-6 w-px bg-border" />
      <h1 className="text-lg font-bold">{title}</h1>

      <div className="ml-auto flex items-center gap-5">
        <Moon className="size-[18px] text-muted-foreground" />
        <div className="text-right leading-tight">
          <p className="text-sm font-semibold tabular-nums">
            {now ? now.toLocaleTimeString("en-GB") : "--:--:--"}
          </p>
          <p className="text-xs text-muted-foreground">
            {now
              ? now.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              : ""}
          </p>
        </div>
        <button type="button" aria-label="Notifications" className="relative">
          <Bell className="size-[18px] text-muted-foreground" />
          <span className="absolute -top-1 -right-1 size-2 rounded-full bg-destructive" />
        </button>
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
            G
          </div>
          <div className="hidden leading-tight sm:block">
            <p className="text-sm font-semibold">Guest</p>
            <p className="text-[11px] tracking-wide text-muted-foreground">GUEST</p>
          </div>
          <ChevronDown className="size-4 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
}
