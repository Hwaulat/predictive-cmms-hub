import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Circle } from "lucide-react";
import { useState } from "react";
import { navSections } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function AppSidebar({ collapsed }: { collapsed: boolean }) {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (url: string) => pathname === url;

  return (
    <aside
      className={cn(
        "hidden shrink-0 flex-col bg-sidebar text-sidebar-foreground transition-[width] duration-200 md:flex",
        collapsed ? "w-[76px]" : "w-[272px]",
      )}
    >
      <div className="flex h-[72px] items-center gap-3 px-5">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-lg font-bold text-primary-foreground">
          M
        </div>
        {!collapsed && (
          <div className="leading-tight">
            <p className="font-display text-[15px] font-bold">Maintenance</p>
            <p className="text-xs text-primary/90 text-sidebar-muted">Monitoring System</p>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        {navSections.map((section) => (
          <div key={section.label} className="mb-2">
            {!collapsed && (
              <div className="flex items-center gap-3 px-3 pt-4 pb-2">
                <span className="text-[10px] font-semibold tracking-[0.14em] text-sidebar-muted uppercase">
                  {section.label}
                </span>
                <span className="h-px flex-1 bg-sidebar-border" />
              </div>
            )}
            <ul className="space-y-1">
              {section.items.map((item) => (
                <SidebarItem
                  key={item.title}
                  item={item}
                  collapsed={collapsed}
                  isActive={isActive}
                  pathname={pathname}
                />
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="flex items-center justify-between border-t border-sidebar-border px-5 py-4 text-xs text-sidebar-muted">
        <span className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-success" />
          {!collapsed && "System Online"}
        </span>
        {!collapsed && <span>v2.4.1</span>}
      </div>
    </aside>
  );
}

function SidebarItem({
  item,
  collapsed,
  isActive,
  pathname,
}: {
  item: import("@/lib/nav").NavItem;
  collapsed: boolean;
  isActive: (url: string) => boolean;
  pathname: string;
}) {
  const childActive = item.children?.some((c) => c.url === pathname) ?? false;
  const [open, setOpen] = useState(childActive);
  const Icon = item.icon;

  if (item.children) {
    return (
      <li>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
            childActive
              ? "bg-sidebar-active text-sidebar-active-foreground"
              : "text-sidebar-foreground/85 hover:bg-sidebar-active/60",
          )}
        >
          {Icon && <Icon className="size-[18px] shrink-0" />}
          {!collapsed && (
            <>
              <span className="flex-1 text-left">{item.title}</span>
              <ChevronDown
                className={cn("size-4 transition-transform", open && "rotate-180")}
              />
            </>
          )}
        </button>
        {open && !collapsed && (
          <ul className="mt-1 ml-[26px] space-y-0.5 border-l border-sidebar-border pl-3">
            {item.children.map((child) => (
              <li key={child.url}>
                <Link
                  to={child.url}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] transition-colors",
                    isActive(child.url)
                      ? "bg-sidebar-active text-sidebar-active-foreground"
                      : "text-sidebar-foreground/75 hover:text-sidebar-active-foreground",
                  )}
                >
                  <Circle className="size-2.5" />
                  {child.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li>
      <Link
        to={item.url!}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
          isActive(item.url!)
            ? "bg-sidebar-active text-sidebar-active-foreground"
            : "text-sidebar-foreground/85 hover:bg-sidebar-active/60",
        )}
      >
        {Icon && <Icon className="size-[18px] shrink-0" />}
        {!collapsed && item.title}
      </Link>
    </li>
  );
}
