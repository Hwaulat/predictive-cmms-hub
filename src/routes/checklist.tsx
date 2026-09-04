import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { DataTable, PageHeader, Panel, SearchBar, StatusPill } from "@/components/ui-kit/page";
import { checklists } from "@/lib/mock-data";

export const Route = createFileRoute("/checklist")({
  head: () => ({
    meta: [
      { title: "Checklist Inspeksi — Maintenance Monitoring System" },
      {
        name: "description",
        content:
          "Template dan riwayat checklist harian/per-shift equipment beserta compliance rate tiap shift.",
      },
      { property: "og:title", content: "Checklist Inspeksi — CMMS" },
      {
        property: "og:description",
        content: "Pengisian checklist equipment dan pembuatan work order otomatis dari temuan.",
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
        description="Pemeriksaan rutin kondisi equipment per shift — temuan gagal otomatis menawarkan Work Order"
        actions={
          <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90">
            <Plus className="size-4" /> Template Baru
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Compliance Hari Ini", value: "86%" },
          { label: "Checklist Terisi", value: "24 / 28" },
          { label: "Temuan Gagal", value: "5 item" },
        ].map((s) => (
          <div key={s.label} className="card-surface p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="mt-2 font-display text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <Panel title="Riwayat Pengisian" actions={<SearchBar placeholder="Cari checklist..." />}>
        <DataTable
          columns={["Nama Checklist", "Equipment", "Frekuensi", "Jml Item", "Shift", "Petugas", "Status"]}
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
                c.status === "Selesai"
                  ? "success"
                  : c.status === "Ada Temuan"
                    ? "warning"
                    : c.status === "Terlewat"
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
