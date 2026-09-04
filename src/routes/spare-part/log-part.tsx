import { createFileRoute } from "@tanstack/react-router";
import { DataTable, PageHeader, Panel, SearchBar } from "@/components/ui-kit/page";
import { logPart } from "@/lib/mock-data";

export const Route = createFileRoute("/spare-part/log-part")({
  head: () => ({
    meta: [
      { title: "Part Usage Log — Maintenance Monitoring System" },
      {
        name: "description",
        content: "Complete sparepart usage history per work order with assigned technician.",
      },
      { property: "og:title", content: "Part Usage Log — CMMS" },
      {
        property: "og:description",
        content: "Part usage history linked to work orders and equipment.",
      },
    ],
  }),
  component: LogPartPage,
});

function LogPartPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Part Usage Log"
        description="History of sparepart withdrawals from warehouse for each work order"
      />

      <Panel title="Usage History" actions={<SearchBar placeholder="Search WO / part..." />}>
        <DataTable
          columns={["Date", "WO No.", "Part Name", "Qty", "Equipment", "Technician"]}
          rows={logPart.map((l) => [
            l.date,
            <span className="font-medium">{l.wo}</span>,
            l.part,
            l.qty,
            l.equipment,
            l.tech,
          ])}
        />
      </Panel>
    </div>
  );
}
