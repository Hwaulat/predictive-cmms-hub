import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { DataTable, PageHeader, Panel, SearchBar, StatusPill } from "@/components/ui-kit/page";
import { workOrders } from "@/lib/mock-data";

export const Route = createFileRoute("/work-order")({
  head: () => ({
    meta: [
      { title: "Work Order — Maintenance Monitoring System" },
      {
        name: "description",
        content:
          "Manage corrective, preventive, predictive, and emergency work orders with status and technician tracking.",
      },
      { property: "og:title", content: "Work Order — CMMS" },
      {
        property: "og:description",
        content: "Work order list with priority and completion status.",
      },
    ],
  }),
  component: WorkOrderPage,
});

const statusTone = (s: string) =>
  s === "Completed"
    ? "success"
    : s === "Open"
      ? "info"
      : s === "Awaiting Sparepart"
        ? "warning"
        : "primary";

const prioTone = (p: string) =>
  p === "Critical" ? "destructive" : p === "High" ? "warning" : p === "Low" ? "muted" : "info";

function WorkOrderPage() {
  return (
    <div>
      <PageHeader
        title="Work Order"
        description="Work orders from failed checklists, due PMs, breakdowns, and AI recommendations"
        actions={
          <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
            <Plus className="size-4" /> Create Work Order
          </button>
        }
      />
      <Panel actions={<SearchBar placeholder="Search WO no. / equipment..." />} title="Work Order List">
        <DataTable
          columns={[
            "WO No.",
            "Equipment",
            "Description",
            "Type",
            "Priority",
            "Technician",
            "Status",
            "Target Date",
          ]}
          rows={workOrders.map((w) => [
            <span className="font-medium">{w.no}</span>,
            w.equipment,
            <span className="text-muted-foreground">{w.desc}</span>,
            <StatusPill label={w.type} tone={w.type === "Predictive" ? "primary" : "muted"} />,
            <StatusPill label={w.prio} tone={prioTone(w.prio)} />,
            w.tech,
            <StatusPill label={w.status} tone={statusTone(w.status)} />,
            w.due,
          ])}
        />
      </Panel>
    </div>
  );
}
