import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Check, Eye, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { approvalMaintenanceList2 } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/approval/maintenance")({
  head: () => ({
    meta: [
      { title: "Maintenance Approval — Maintenance Monitoring System" },
      {
        name: "description",
        content: "Work order cost approval list requiring management sign-off.",
      },
    ],
  }),
  component: ApprovalMaintenancePage,
});

function ApprovalMaintenancePage() {
  const [tab, setTab] = useState<"Pending" | "Confirmed">("Pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [catFilter, setCatFilter] = useState("all");

  const categoryTone = (c: string) =>
    c === "Checklist"
      ? "text-blue-600 border-blue-600 bg-blue-50/50"
      : c === "Preventive"
      ? "text-orange-500 border-orange-500 bg-orange-50/50"
      : "text-red-500 border-red-500 bg-red-50/50";

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

  const filteredData = approvalMaintenanceList2.filter((a) => {
    const matchesTab = a.status === tab;
    const matchesSearch =
      a.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.doc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.machine.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.exec.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = deptFilter === "all" || a.dept === deptFilter;
    const matchesCat = catFilter === "all" || a.category === catFilter;
    return matchesTab && matchesSearch && matchesDept && matchesCat;
  });

  return (
    <div className="space-y-6 pb-20 animate-in fade-in-50 duration-500">
      {/* Top Tablist Header (Matched with Capsule Tablist style) */}
      <div className="flex items-center justify-between">
        <div className="bg-slate-100 p-1 rounded-xl border inline-flex items-center gap-1 shadow-inner">
          <button
            type="button"
            onClick={() => setTab("Pending")}
            className={cn(
              "px-5 py-2 text-xs font-bold rounded-lg transition-all",
              tab === "Pending"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            )}
          >
            Pending (10)
          </button>
          <button
            type="button"
            onClick={() => setTab("Confirmed")}
            className={cn(
              "px-5 py-2 text-xs font-bold rounded-lg transition-all",
              tab === "Confirmed"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            )}
          >
            Confirmed
          </button>
        </div>
      </div>

      {/* Main Container Card */}
      <div className="bg-white rounded-xl border shadow-sm flex flex-col">
        {/* Filters Bar - Positioned matching request-order-list */}
        <div className="p-4 border-b flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search by ID, Document, Machine..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-slate-50/50 w-full text-xs"
            />
          </div>

          <Select value={deptFilter} onValueChange={setDeptFilter}>
            <SelectTrigger className="w-[190px] bg-white text-xs text-slate-700">
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Filter by department</SelectItem>
              <SelectItem value="Department A">Department A</SelectItem>
              <SelectItem value="Department B">Department B</SelectItem>
              <SelectItem value="Department C">Department C</SelectItem>
              <SelectItem value="Department D">Department D</SelectItem>
            </SelectContent>
          </Select>

          <Select value={catFilter} onValueChange={setCatFilter}>
            <SelectTrigger className="w-[180px] bg-white text-xs text-slate-700">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Filter by category</SelectItem>
              <SelectItem value="Checklist">Checklist</SelectItem>
              <SelectItem value="Preventive">Preventive</SelectItem>
              <SelectItem value="Work Order">Work Order</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table: Category column moved to the right of Action column */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100/50 border-b text-slate-500 uppercase text-xs font-bold tracking-wider whitespace-nowrap text-left">
                <th className="py-4 px-4 text-center w-24">Action</th>
                <th className="py-4 px-4 min-w-[130px]">Category</th>
                <th className="py-4 px-4 min-w-[110px]">ID</th>
                <th className="py-4 px-4 min-w-[180px]">Document Number</th>
                <th className="py-4 px-4 min-w-[150px]">Submit Form</th>
                <th className="py-4 px-4 min-w-[170px]">Machine/Item</th>
                <th className="py-4 px-4 min-w-[140px]">Department</th>
                <th className="py-4 px-4 min-w-[120px]">Area</th>
                <th className="py-4 px-4 min-w-[160px]">Line</th>
                <th className="py-4 px-4 min-w-[130px]">Executor</th>
                <th className="py-4 px-4 min-w-[200px]">Summary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredData.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50/70 transition-colors whitespace-nowrap">
                  {/* Action Column */}
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-green-600 bg-white shadow-xs"
                        title="Approve"
                      >
                        <Check className="size-4" />
                      </Button>
                      <Link
                        to={`/approval/maintenance/${a.id}` as any}
                        className="inline-flex items-center justify-center rounded-md border bg-white shadow-xs hover:bg-accent hover:text-primary h-8 w-8 text-slate-400 transition-colors"
                        title="View Details"
                      >
                        <Eye className="size-4" />
                      </Link>
                    </div>
                  </td>

                  {/* Category Column (Right next to Action) */}
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-semibold ${categoryTone(
                        a.category
                      )}`}
                    >
                      {a.category}
                    </span>
                  </td>

                  <td className="py-3 px-4 font-medium text-slate-800">{a.id}</td>
                  <td className="py-3 px-4 font-mono text-slate-700">{a.doc}</td>
                  <td className="py-3 px-4 text-slate-500">{a.submit}</td>
                  <td className="py-3 px-4 font-medium text-slate-800">{a.machine}</td>
                  <td className="py-3 px-4 text-slate-700">{a.dept}</td>
                  <td className="py-3 px-4 text-slate-700">{a.area}</td>
                  <td className="py-3 px-4 text-slate-700">{a.line}</td>
                  <td className="py-3 px-4 text-slate-800 font-medium">{a.exec}</td>
                  <td className="py-3 px-4">{summaryRender(a.summary)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Note: Bottom pagination removed as requested */}
      </div>
    </div>
  );
}
