import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Check, Eye } from "lucide-react";
import { DataTable, PageHeader, Panel, SearchBar } from "@/components/ui-kit/page";
import { approvalMaintenanceList2 } from "@/lib/mock-data";

export const Route = createFileRoute("/approval/maintenance")({
  head: () => ({
    meta: [
      { title: "Maintenance Approval — Maintenance Monitoring System" },
      {
        name: "description",
        content: "Work order cost approval list requiring management sign-off.",
      },
      { property: "og:title", content: "Maintenance Approval — CMMS" },
      {
        property: "og:description",
        content: "Work order cost approval process before repair execution.",
      },
    ],
  }),
  component: ApprovalMaintenancePage,
});

function ApprovalMaintenancePage() {
  const [tab, setTab] = useState<"Pending" | "Confirmed">("Pending");
  
  const filteredData = approvalMaintenanceList2.filter((a) => a.status === tab);
  
  const categoryTone = (c: string) =>
    c === "Checklist" ? "text-blue-600 border-blue-600" :
    c === "Preventive" ? "text-orange-500 border-orange-500" :
    c === "Work Order" ? "text-red-500 border-red-500" :
    "text-red-500 border-red-500";

  const summaryRender = (summary: string) => {
    if (summary === "No Data") return <span className="text-muted-foreground">{summary}</span>;
    return (
      <div className="flex gap-2">
        {summary.split(" ").map((word, i) => {
          if (word.includes("OK") || word.includes("Check")) {
            return <span key={i} className="text-green-600 font-medium">{word}</span>;
          }
          if (word.includes("NG") || word.includes("Repair") || word.includes("Change")) {
            return <span key={i} className="text-orange-500 font-medium">{word}</span>;
          }
          return <span key={i} className="text-muted-foreground">{word}</span>;
        })}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setTab("Pending")}
          className={`rounded-t-lg px-6 py-2.5 text-sm font-semibold transition-colors ${
            tab === "Pending" ? "bg-surface text-foreground shadow-sm" : "bg-muted/50 text-muted-foreground hover:bg-muted"
          }`}
        >
          Pending (10)
        </button>
        <button
          onClick={() => setTab("Confirmed")}
          className={`rounded-t-lg px-6 py-2.5 text-sm font-semibold transition-colors ${
            tab === "Confirmed" ? "bg-surface text-foreground shadow-sm" : "bg-muted/50 text-muted-foreground hover:bg-muted"
          }`}
        >
          Confirmed
        </button>
      </div>

      <Panel
        actions={
          <div className="flex flex-wrap items-center gap-4 w-full">
            <SearchBar placeholder="Search" />
            <select className="h-10 rounded-lg border border-input bg-surface px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20">
              <option>Filter by department</option>
            </select>
            <select className="h-10 rounded-lg border border-input bg-surface px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20">
              <option>Filter by category</option>
            </select>
          </div>
        }
        className="rounded-tl-none border-0 p-0 card-surface-none"
      >
        <div className="mt-4">
          <DataTable
            columns={["Action", "ID", "Document Number", "Submit Form", "Machine/Item", "Department", "Area", "Line", "Executor", "Summary", "Category"]}
            rows={filteredData.map((a) => [
              <div className="flex items-center gap-1">
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-green-500 h-8 w-8 text-slate-400">
                  <Check className="size-4" />
                </button>
                <Link to={`/approval/maintenance/${a.id}` as any} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-primary h-8 w-8 text-slate-400">
                  <Eye className="size-4" />
                </Link>
              </div>,
              <span className="font-medium">{a.id}</span>,
              a.doc,
              <span className="text-muted-foreground">{a.submit}</span>,
              a.machine,
              a.dept,
              a.area,
              a.line,
              a.exec,
              summaryRender(a.summary),
              <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold bg-surface ${categoryTone(a.category)}`}>
                {a.category}
              </span>,
            ])}
          />
        </div>
        
        <div className="flex items-center justify-end gap-4 p-4 text-sm text-muted-foreground border-t border-border mt-4">
          <div className="flex items-center gap-2">
            <span>Rows per page</span>
            <select className="rounded border border-input px-2 py-1 bg-surface">
              <option>10</option>
            </select>
          </div>
          <div>Page 1 of 10</div>
          <div className="flex items-center gap-1">
            <button className="px-2 py-1 rounded border border-border disabled:opacity-50" disabled>&laquo;</button>
            <button className="px-2 py-1 rounded border border-border disabled:opacity-50" disabled>&lsaquo;</button>
            <button className="px-2 py-1 rounded border border-border">&rsaquo;</button>
            <button className="px-2 py-1 rounded border border-border">&raquo;</button>
          </div>
        </div>
      </Panel>
    </div>
  );
}
