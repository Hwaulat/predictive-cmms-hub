import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { DataTable, PageHeader, Panel } from "@/components/ui-kit/page";
import { documentNumbers } from "@/lib/mock-data";

export const Route = createFileRoute("/master-data/document-number")({
  head: () => ({
    meta: [
      { title: "Format Nomor Dokumen — Maintenance Monitoring System" },
      {
        name: "description",
        content: "Konfigurasi format penomoran otomatis untuk WO, PM, dan Request Part.",
      },
      { property: "og:title", content: "Format Nomor Dokumen — CMMS" },
      {
        property: "og:description",
        content: "Pengaturan prefix dan format auto-number dokumen CMMS.",
      },
    ],
  }),
  component: DocumentNumberPage,
});

function DocumentNumberPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Format Nomor Dokumen"
        description="Konfigurasi auto-numbering untuk setiap tipe dokumen di sistem CMMS"
        actions={
          <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90">
            <Plus className="size-4" /> Tambah Format
          </button>
        }
      />

      <Panel title="Daftar Format Dokumen">
        <DataTable
          columns={["Tipe Dokumen", "Prefix", "Format", "Nomor Terakhir"]}
          rows={documentNumbers.map((d) => [
            <span className="font-medium">{d.doc}</span>,
            <span className="font-mono text-xs font-semibold text-primary">{d.prefix}</span>,
            <span className="font-mono text-xs">{d.format}</span>,
            <span className="font-mono text-xs font-semibold">{d.last}</span>,
          ])}
        />
      </Panel>
    </div>
  );
}
