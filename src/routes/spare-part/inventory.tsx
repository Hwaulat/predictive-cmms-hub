import { createFileRoute } from "@tanstack/react-router";
import { Package } from "lucide-react";
import { DataTable, PageHeader, Panel, SearchBar, StatusPill } from "@/components/ui-kit/page";
import { inventory } from "@/lib/mock-data";

export const Route = createFileRoute("/spare-part/inventory")({
  head: () => ({
    meta: [
      { title: "Sparepart Inventory — Maintenance Monitoring System" },
      {
        name: "description",
        content:
          "Manage sparepart stock, monitor minimum levels, and identify critical parts in real-time.",
      },
      { property: "og:title", content: "Sparepart Inventory — CMMS" },
      {
        property: "og:description",
        content: "Complete sparepart list with stock, location, and availability status.",
      },
    ],
  }),
  component: InventoryPage,
});

const statusTone = (s: string) =>
  s === "Critical" ? "destructive" : s === "Low" ? "warning" : "success";

function InventoryPage() {
  const critical = inventory.filter((i) => i.status === "Critical").length;
  const low = inventory.filter((i) => i.status === "Low").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sparepart Inventory"
        description="Warehouse sparepart stock — monitor critical levels and storage locations"
        actions={
          <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90">
            <Package className="size-4" /> Add Part
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total SKU", value: inventory.length },
          { label: "Critical Stock", value: `${critical} items` },
          { label: "Low Stock", value: `${low} items` },
        ].map((s) => (
          <div key={s.label} className="card-surface p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="mt-2 font-display text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <Panel title="Sparepart List" actions={<SearchBar placeholder="Search code / part name..." />}>
        <DataTable
          columns={["Code", "Part Name", "Category", "Stock", "Min", "UOM", "Location", "Status"]}
          rows={inventory.map((i) => [
            <span className="font-medium">{i.code}</span>,
            i.name,
            i.cat,
            <span className={i.stock < i.min ? "font-semibold text-destructive" : ""}>{i.stock}</span>,
            i.min,
            i.uom,
            i.loc,
            <StatusPill label={i.status} tone={statusTone(i.status)} />,
          ])}
        />
      </Panel>
    </div>
  );
}
