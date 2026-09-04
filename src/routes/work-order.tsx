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
          "Kelola work order corrective, preventive, predictive, dan emergency lengkap dengan status dan teknisi.",
      },
      { property: "og:title", content: "Work Order — CMMS" },
      {
        property: "og:description",
        content: "Daftar perintah kerja perbaikan beserta prioritas dan status penyelesaian.",
      },
    ],
  }),
  component: WorkOrderPage,
});

const statusTone = (s: string) =>
  s === "Selesai"
    ? "success"
    : s === "Open"
      ? "info"
      : s === "Menunggu Sparepart"
        ? "warning"
        : "primary";

const prioTone = (p: string) =>
  p === "Critical" ? "destructive" : p === "High" ? "warning" : p === "Low" ? "muted" : "info";

function WorkOrderPage() {
  return (
    <div>
      <PageHeader
        title="Work Order"
        description="Perintah kerja dari checklist gagal, PM jatuh tempo, breakdown, dan rekomendasi AI"
        actions={
          <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
            <Plus className="size-4" /> Buat Work Order
          </button>
        }
      />
      <Panel actions={<SearchBar placeholder="Cari nomor WO / equipment..." />} title="Daftar Work Order">
        <DataTable
          columns={[
            "No. WO",
            "Equipment",
            "Deskripsi",
            "Tipe",
            "Prioritas",
            "Teknisi",
            "Status",
            "Target Selesai",
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
