import { createFileRoute } from "@tanstack/react-router";
import { Upload } from "lucide-react";
import { DataTable, PageHeader, Panel, SearchBar, StatusPill } from "@/components/ui-kit/page";
import { documents } from "@/lib/mock-data";

export const Route = createFileRoute("/documentation")({
  head: () => ({
    meta: [
      { title: "Dokumentasi Teknis — Maintenance Monitoring System" },
      {
        name: "description",
        content: "Repositori manual book, SOP, dan wiring diagram equipment dengan kontrol versi.",
      },
      { property: "og:title", content: "Dokumentasi Teknis — CMMS" },
      {
        property: "og:description",
        content: "Manual, SOP, dan gambar teknik per equipment dalam satu tempat.",
      },
    ],
  }),
  component: DocumentationPage,
});

function DocumentationPage() {
  return (
    <div>
      <PageHeader
        title="Documentation"
        description="Manual book, SOP, dan gambar teknik per equipment"
        actions={
          <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90">
            <Upload className="size-4" /> Upload Dokumen
          </button>
        }
      />
      <Panel actions={<SearchBar placeholder="Cari dokumen..." />} title="Daftar Dokumen">
        <DataTable
          columns={["Nama Dokumen", "Tipe", "Equipment", "Versi", "Terakhir Update"]}
          rows={documents.map((d) => [
            <span className="font-medium">{d.name}</span>,
            <StatusPill label={d.type} tone="info" />,
            d.equipment,
            d.version,
            d.updated,
          ])}
        />
      </Panel>
    </div>
  );
}
