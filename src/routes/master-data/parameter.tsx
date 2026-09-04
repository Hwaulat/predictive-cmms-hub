import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { DataTable, PageHeader, Panel, SearchBar } from "@/components/ui-kit/page";
import { parameters } from "@/lib/mock-data";

export const Route = createFileRoute("/master-data/parameter")({
  head: () => ({
    meta: [
      { title: "System Parameters — Maintenance Monitoring System" },
      {
        name: "description",
        content: "System parameter configuration: approval limits, AI horizon, PM grace period.",
      },
      { property: "og:title", content: "System Parameters — CMMS" },
      {
        property: "og:description",
        content: "Global parameter settings that control CMMS system behavior.",
      },
    ],
  }),
  component: ParameterPage,
});

function ParameterPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="System Parameters"
        description="Global configuration controlling behavior across all CMMS modules"
        actions={
          <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90">
            <Plus className="size-4" /> Add Parameter
          </button>
        }
      />

      <Panel
        title="Parameter List"
        actions={<SearchBar placeholder="Search parameter..." />}
      >
        <DataTable
          columns={["Key", "Value", "Description"]}
          rows={parameters.map((p) => [
            <span className="font-mono text-xs font-semibold text-primary">{p.key}</span>,
            <span className="font-semibold">{p.value}</span>,
            <span className="text-muted-foreground">{p.desc}</span>,
          ])}
        />
      </Panel>
    </div>
  );
}
