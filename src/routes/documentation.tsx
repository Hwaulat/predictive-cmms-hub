import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Upload } from "lucide-react";
import { DataTable, PageHeader, Panel, SearchBar, StatusPill } from "@/components/ui-kit/page";
import { documents } from "@/lib/mock-data";

export const Route = createFileRoute("/documentation")({
  head: () => ({
    meta: [
      { title: "Technical Documentation — Maintenance Monitoring System" },
      {
        name: "description",
        content: "Repository of manual books, SOPs, and equipment wiring diagrams with version control.",
      },
      { property: "og:title", content: "Technical Documentation — CMMS" },
      {
        property: "og:description",
        content: "Manuals, SOPs, and technical drawings per equipment in one place.",
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
        description="Manual books, SOPs, and technical drawings per equipment"
        actions={
          <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90">
            <Upload className="size-4" /> Upload Document
          </button>
        }
      />
      <Panel actions={
          <div className="flex flex-wrap items-center gap-4 w-full">
            <SearchBar placeholder="Search documents..." />
            <select className="h-10 rounded-lg border border-input bg-surface px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20">
              <option>Filter by status</option>
            </select>
            <select className="h-10 rounded-lg border border-input bg-surface px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20">
              <option>Filter by category</option>
            </select>
            <div className="h-10 rounded-lg border border-input bg-surface px-3 text-sm flex items-center justify-center text-muted-foreground ml-auto">
               <Calendar className="mr-2 size-4" /> dd/mm/yyyy - dd/mm/yyyy
            </div>
          </div>
        } title="Document List">
        <DataTable
          columns={["Document Name", "Type", "Equipment", "Version", "Last Updated"]}
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
