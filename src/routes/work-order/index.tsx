import { Link, createFileRoute } from "@tanstack/react-router";
import { Plus, Eye, Calendar, Search } from "lucide-react";
import { DataTable, PageHeader, StatusPill } from "@/components/ui-kit/page";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

function WorkOrderPage() {
  return (
    <div className="space-y-6">
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
      
      <div className="bg-white border rounded-xl shadow-sm flex flex-col">
        {/* Filter Bar styled like users management */}
        <div className="p-4 border-b flex flex-wrap md:flex-nowrap items-center gap-4 justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input placeholder="Search work order..." className="pl-9 bg-slate-50/50" />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px] bg-white">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="awaiting">Awaiting Sparepart</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-[140px] bg-white">
                <SelectValue placeholder="All Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Type</SelectItem>
                <SelectItem value="corrective">Corrective</SelectItem>
                <SelectItem value="preventive">Preventive</SelectItem>
              </SelectContent>
            </Select>

            <div className="h-9 px-3 rounded-md border border-input bg-white text-xs flex items-center justify-center text-muted-foreground">
              <Calendar className="mr-2 size-3.5" /> dd/mm/yyyy - dd/mm/yyyy
            </div>
          </div>
        </div>

        <DataTable
          columns={[
            "Action",
            "Status",
            "Work Order ID",
            "Submit Form",
            "Approved Date",
            "Type",
            "Machine/Item",
            "Department",
            "Area",
            "Line",
          ]}
          rows={historyWorkOrders.map((w) => [
            <Link
              to={`/work-order/${w.no}` as any}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-primary h-8 w-8 text-slate-400"
            >
              <Eye className="size-4" />
            </Link>,
            <StatusPill label={w.status} tone={statusTone(w.status)} />,
            <span className="font-medium">{w.no}</span>,
            <span className="text-muted-foreground">{w.submit}</span>,
            <span className="text-muted-foreground">{w.approved}</span>,
            <span className="text-muted-foreground">{w.type}</span>,
            w.machineItem,
            w.department,
            w.area,
            w.line,
          ])}
        />
      </div>
    </div>
  );
}
