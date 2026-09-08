import { Link, createFileRoute } from "@tanstack/react-router";
import { Plus, Eye, Calendar } from "lucide-react";
import { DataTable, PageHeader, Panel, SearchBar, StatusPill } from "@/components/ui-kit/page";
import { historyWorkOrders } from "@/lib/mock-data";

export const Route = createFileRoute("/work-order/")({
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
        title="History Work Order"
        description="List of reports that have been created"
        actions={
          <Link
            to="/work-order/add"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <Plus className="size-4" /> Add New Work Order
          </Link>
        }
      />
      <Panel actions={
        <div className="flex flex-wrap items-center gap-4 w-full">
            <SearchBar placeholder="Search" />
            <select className="h-10 rounded-lg border border-input bg-surface px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20">
              <option>Filter by status</option>
            </select>
            <select className="h-10 rounded-lg border border-input bg-surface px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20">
              <option>Filter by type</option>
            </select>
            <div className="h-10 rounded-lg border border-input bg-surface px-3 text-sm flex items-center justify-center text-muted-foreground ml-auto">
               <Calendar className="mr-2 size-4" /> dd/mm/yyyy - dd/mm/yyyy
            </div>
          </div>
      } className="mt-4 border-0 p-0 card-surface-none">
        <DataTable
          columns={[
            "Preview",
            "Work Order ID",
            "Submit Form",
            "Approved Date",
            "Type",
            "Machine/Item",
            "Department",
            "Area",
            "Line",
            "Status",
          ]}
          rows={historyWorkOrders.map((w) => [
            <Link to={`/work-order/${w.no}`} className="flex size-8 items-center justify-center rounded bg-blue-600 text-white hover:bg-blue-700">
              <Eye className="size-4" />
            </Link>,
            <span className="font-medium">{w.no}</span>,
            <span className="text-muted-foreground">{w.submit}</span>,
            <span className="text-muted-foreground">{w.approved}</span>,
            <span className="text-muted-foreground">{w.type}</span>,
            w.machineItem,
            w.department,
            w.area,
            w.line,
            <StatusPill label={w.status} tone={statusTone(w.status)} />,
          ])}
        />
        
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
