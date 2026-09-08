import type { ReactNode } from "react";
import { ArrowLeft, Search } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: ReactNode | string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight">{title}</h2>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions}
    </div>
  );
}

export function BackButton({ to = "/" }: { to?: string }) {
  return (
    <Link to={to as never}>
      <Button variant="outline" size="sm" className="text-slate-700 bg-white">
        <ArrowLeft className="size-4 mr-1" /> Back
      </Button>
    </Link>
  );
}

export function Panel({
  title,
  titleBadge,
  description,
  actions,
  className,
  children,
}: {
  title?: ReactNode | string;
  titleBadge?: ReactNode;
  description?: string;
  actions?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={cn("card-surface p-5", className)}>
      {(title || actions) && (
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            {title && (
              <h3 className="text-base font-semibold flex items-center gap-1">
                {title}
                {titleBadge}
              </h3>
            )}
            {description && (
              <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
            )}
          </div>
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}

export function SearchBar({ placeholder = "Search data..." }: { placeholder?: string }) {
  return (
    <div className="relative w-full">
      <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <input
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-input bg-surface pr-3 pl-9 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
      />
    </div>
  );
}

type Tone = "success" | "warning" | "destructive" | "info" | "muted" | "primary";

const toneClass: Record<Tone, string> = {
  success: "bg-success/12 text-success",
  warning: "bg-warning/18 text-warning-foreground",
  destructive: "bg-destructive/12 text-destructive",
  info: "bg-info/12 text-info",
  primary: "bg-primary/12 text-primary",
  muted: "bg-muted text-muted-foreground",
};

export function StatusPill({ label, tone = "muted" }: { label: string; tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold",
        toneClass[tone],
      )}
    >
      {label}
    </span>
  );
}

export function TablePagination() {
  return (
    <div className="p-4 border-t flex items-center justify-between text-sm text-muted-foreground w-full">
      <div className="flex items-center gap-2">
        <span>Rows per page</span>
        <Select defaultValue="10">
          <SelectTrigger className="w-[70px] h-8 bg-slate-50">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
          </SelectContent>
        </Select>
        <span className="ml-2">1-10 of 10</span>
      </div>
      
      <div className="flex items-center gap-1">
        <Button variant="outline" size="icon" className="size-8 opacity-50 cursor-not-allowed">
          {"<<"}
        </Button>
        <Button variant="outline" size="icon" className="size-8 opacity-50 cursor-not-allowed">
          {"<"}
        </Button>
        <Button variant="outline" size="icon" className="size-8 bg-[#2563eb] text-white hover:bg-[#1d4ed8]">
          1
        </Button>
        <Button variant="outline" size="icon" className="size-8 opacity-50 cursor-not-allowed">
          {">"}
        </Button>
        <Button variant="outline" size="icon" className="size-8 opacity-50 cursor-not-allowed">
          {">>"}
        </Button>
      </div>
    </div>
  );
}

export function DataTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="flex flex-col w-full">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="bg-slate-100/50 text-slate-500 uppercase text-xs font-bold tracking-wider border-b">
              {columns.map((c) => (
                <th
                  key={c}
                  className="py-4 px-4 text-left font-semibold whitespace-nowrap"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                {row.map((cell, j) => (
                  <td key={j} className="py-3 px-4 align-middle">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TablePagination />
    </div>
  );
}
