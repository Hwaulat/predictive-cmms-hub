import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { DataTable, PageHeader, Panel, SearchBar } from "@/components/ui-kit/page";
import { parameters } from "@/lib/mock-data";

export const Route = createFileRoute("/master-data/parameter")({
  head: () => ({
    meta: [
      { title: "Parameter Sistem — Maintenance Monitoring System" },
      {
        name: "description",
        content: "Konfigurasi parameter sistem: batas approval, horizon AI, grace period PM.",
      },
      { property: "og:title", content: "Parameter Sistem — CMMS" },
      {
        property: "og:description",
        content: "Pengaturan parameter global yang mengontrol perilaku sistem CMMS.",
      },
    ],
  }),
  component: ParameterPage,
});

function ParameterPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Parameter Sistem"
        description="Konfigurasi global yang mengontrol perilaku seluruh modul CMMS"
        actions={
          <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90">
            <Plus className="size-4" /> Tambah Parameter
          </button>
        }
      />

      <Panel
        title="Daftar Parameter"
        actions={<SearchBar placeholder="Cari parameter..." />}
      >
        <DataTable
          columns={["Key", "Value", "Deskripsi"]}
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
