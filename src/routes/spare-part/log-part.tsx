import { createFileRoute } from "@tanstack/react-router";
import { DataTable, PageHeader, Panel, SearchBar } from "@/components/ui-kit/page";
import { logPart } from "@/lib/mock-data";

export const Route = createFileRoute("/spare-part/log-part")({
  head: () => ({
    meta: [
      { title: "Log Pemakaian Part — Maintenance Monitoring System" },
      {
        name: "description",
        content: "Riwayat lengkap pemakaian sparepart per work order beserta teknisi pelaksana.",
      },
      { property: "og:title", content: "Log Pemakaian Part — CMMS" },
      {
        property: "og:description",
        content: "Histori pemakaian part yang terhubung ke work order dan equipment.",
      },
    ],
  }),
  component: LogPartPage,
});

function LogPartPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Log Pemakaian Part"
        description="Riwayat pengambilan sparepart dari gudang untuk setiap work order"
      />

      <Panel title="Riwayat Pemakaian" actions={<SearchBar placeholder="Cari WO / part..." />}>
        <DataTable
          columns={["Tanggal", "No. WO", "Nama Part", "Qty", "Equipment", "Teknisi"]}
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
