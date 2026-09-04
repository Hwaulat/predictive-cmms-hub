import { useState, type ReactNode } from "react";
import { AppSidebar } from "./app-sidebar";
import { AppHeader } from "./app-header";

export function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar collapsed={collapsed} />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
