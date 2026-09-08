import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { DataTable, PageHeader, Panel } from "@/components/ui-kit/page";
import { documentNumbers } from "@/lib/mock-data";

export const Route = createFileRoute("/master-data/document-number")({
  head: () => ({
    meta: [
      { title: "Document Number Format — Maintenance Monitoring System" },
      {
        name: "description",
        content: "Auto-numbering format configuration for WO, PM, and Part Requests.",
      },
      { property: "og:title", content: "Document Number Format — CMMS" },
      {
        property: "og:description",
        content: "Prefix and auto-number format settings for CMMS documents.",
      },
    ],
  }),
  component: DocumentNumberPage,
});

function DocumentNumberPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Document Number Format"
        description="Auto-numbering configuration for each document type in the CMMS system"
        actions={
          <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90">
            <Plus className="size-4" /> Add Format
          </button>
        }
      />

      <Panel title="Document Format List">
        <DataTable
          columns={["Document Type", "Prefix", "Format", "Last Number"]}
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
