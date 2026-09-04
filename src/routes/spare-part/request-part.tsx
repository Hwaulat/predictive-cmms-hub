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
        content: "Ajukan permintaan sparepart dan pantau status persetujuan dari setiap departemen.",
      },
      { property: "og:title", content: "Request Part — CMMS" },
      {
        property: "og:description",
        content: "Formulir dan daftar permintaan sparepart beserta status approval.",
      },
    ],
  }),
  component: RequestPartPage,
});

const statusTone = (s: string) =>
  s === "Disetujui" ? "success" : s === "Ditolak" ? "destructive" : "warning";

function RequestPartPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Request Part"
        description="Ajukan permintaan sparepart ke gudang — status approval real-time"
        actions={
          <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90">
            <Plus className="size-4" /> Buat Permintaan
          </button>
        }
      />

      <Panel
        title="Daftar Permintaan"
        actions={<SearchBar placeholder="Cari request..." />}
      >
        <DataTable
          columns={["No. Request", "Tanggal", "Nama Part", "Qty", "Pemohon", "Departemen", "Status"]}
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
