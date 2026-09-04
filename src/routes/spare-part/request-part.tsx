import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
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
        actions={<SearchBar placeholder="Search request..." />}
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
