import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Plus } from "lucide-react";
import { DataTable, PageHeader, Panel, SearchBar, StatusPill } from "@/components/ui-kit/page";
import { requests } from "@/lib/mock-data";

export const Route = createFileRoute("/spare-part/request-part")({
  head: () => ({
    meta: [
      { title: "Request Part — Maintenance Monitoring System" },
      {
        name: "description",
        content: "Submit sparepart requests and track approval status from each department.",
      },
      { property: "og:title", content: "Request Part — CMMS" },
      {
        property: "og:description",
        content: "Sparepart request form and list with approval status.",
      },
    ],
  }),
  component: RequestPartPage,
});

const statusTone = (s: string) =>
  s === "Approved" ? "success" : s === "Rejected" ? "destructive" : "warning";

function RequestPartPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Request Part"
        description="Submit sparepart requests to warehouse — real-time approval status"
        actions={
          <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90">
            <Plus className="size-4" /> New Request
          </button>
        }
      />

      <Panel
        title="Request List"
        actions={
          <div className="flex flex-wrap items-center gap-4 w-full">
            <SearchBar placeholder="Search request..." />
            <select className="h-10 rounded-lg border border-input bg-surface px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20">
              <option>Filter by status</option>
            </select>
            <select className="h-10 rounded-lg border border-input bg-surface px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20">
              <option>Filter by category</option>
            </select>
            <div className="h-10 rounded-lg border border-input bg-surface px-3 text-sm flex items-center justify-center text-muted-foreground ml-auto">
               <Calendar className="mr-2 size-4" /> dd/mm/yyyy - dd/mm/yyyy
            </div>
          </div>
        }
      >
        <DataTable
          columns={["Request No.", "Date", "Part Name", "Qty", "Requester", "Department", "Status"]}
          rows={requests.map((r) => [
            <span className="font-medium">{r.id}</span>,
            r.date,
            r.part,
            r.qty,
            r.requester,
            r.dept,
            <StatusPill label={r.status} tone={statusTone(r.status)} />,
          ])}
        />
      </Panel>
    </div>
  );
}
