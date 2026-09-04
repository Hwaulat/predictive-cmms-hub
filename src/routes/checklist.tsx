import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { DataTable, PageHeader, Panel, SearchBar, StatusPill } from "@/components/ui-kit/page";
import { checklists } from "@/lib/mock-data";

export const Route = createFileRoute("/checklist")({
  head: () => ({
    meta: [
      { title: "Inspection Checklist — Maintenance Monitoring System" },
      {
        name: "description",
        content:
          "Daily and per-shift equipment inspection checklist templates and history with compliance rate per shift.",
      },
      { property: "og:title", content: "Inspection Checklist — CMMS" },
      {
        property: "og:description",
        content: "Equipment checklist completion and automatic work order creation from findings.",
      },
    ],
  }),
  component: ChecklistPage,
});

function ChecklistPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Checklist"
        description="Routine equipment condition checks per shift — failed findings automatically offer Work Order creation"
        actions={
          <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90">
            <Plus className="size-4" /> New Template
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Today's Compliance", value: "86%" },
          { label: "Checklists Filled", value: "24 / 28" },
          { label: "Failed Findings", value: "5 items" },
        ].map((s) => (
          <div key={s.label} className="card-surface p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="mt-2 font-display text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <Panel title="Completion History" actions={<SearchBar placeholder="Search checklist..." />}>
        <DataTable
          columns={["Checklist Name", "Equipment", "Frequency", "Items", "Shift", "Inspector", "Status"]}
          rows={checklists.map((c) => [
            <span className="font-medium">{c.name}</span>,
            c.equipment,
            c.freq,
            c.items,
            c.shift,
            c.by,
            <StatusPill
              label={c.status}
              tone={
                c.status === "Completed"
                  ? "success"
                  : c.status === "Finding Found"
                    ? "warning"
                    : c.status === "Missed"
                      ? "destructive"
                      : "info"
              }
            />,
          ])}
        />
      </Panel>
    </div>
  );
}
