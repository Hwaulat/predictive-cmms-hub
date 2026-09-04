import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { DataTable, PageHeader, Panel, SearchBar, StatusPill } from "@/components/ui-kit/page";
import { machines } from "@/lib/mock-data";

export const Route = createFileRoute("/master-data/machine")({
  head: () => ({
    meta: [
      { title: "Master Machine/Equipment — Maintenance Monitoring System" },
      {
        name: "description",
        content: "Master machine and equipment data: code, area, brand, year, and operational status.",
      },
      { property: "og:title", content: "Master Machine/Equipment — CMMS" },
      {
        property: "og:description",
        content: "Complete list of machines and equipment registered in the CMMS.",
      },
    ],
  }),
  component: MachinePage,
});

const statusTone = (s: string) =>
  s === "Running" ? "success" : s === "Maintenance" ? "warning" : "info";

function MachinePage() {
  const running = machines.filter((m) => m.status === "Running").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Master Machine / Equipment"
        description="Machine and equipment data registered in the maintenance system"
        actions={
          <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90">
            <Plus className="size-4" /> Add Equipment
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total Equipment", value: machines.length },
          { label: "Running", value: running },
          { label: "Maintenance", value: machines.filter((m) => m.status === "Maintenance").length },
          { label: "Standby", value: machines.filter((m) => m.status === "Standby").length },
        ].map((s) => (
          <div key={s.label} className="card-surface p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="mt-2 font-display text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <Panel
        title="Equipment List"
        actions={<SearchBar placeholder="Search equipment..." />}
      >
        <DataTable
          columns={["Code", "Equipment Name", "Area", "Brand", "Year", "Status"]}
          rows={machines.map((m) => [
            <span className="font-medium">{m.code}</span>,
            m.name,
            m.area,
            m.brand,
            m.year,
            <StatusPill label={m.status} tone={statusTone(m.status)} />,
          ])}
        />
      </Panel>
    </div>
  );
}
