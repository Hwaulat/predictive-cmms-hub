import { createFileRoute } from "@tanstack/react-router";
import { Package } from "lucide-react";
import { DataTable, PageHeader, Panel, SearchBar, StatusPill } from "@/components/ui-kit/page";
import { inventory } from "@/lib/mock-data";

export const Route = createFileRoute("/spare-part/inventory")({
  head: () => ({
    meta: [
      { title: "Inventory Sparepart — Maintenance Monitoring System" },
      {
        name: "description",
        content:
          "Kelola stok sparepart, pantau level minimum, dan identifikasi part kritis secara real-time.",
      },
      { property: "og:title", content: "Inventory Sparepart — CMMS" },
      {
        property: "og:description",
        content: "Daftar lengkap sparepart beserta stok, lokasi, dan status ketersediaan.",
      },
    ],
  }),
  component: InventoryPage,
});

const statusTone = (s: string) =>
  s === "Kritis" ? "destructive" : s === "Menipis" ? "warning" : "success";

function InventoryPage() {
  const kritis = inventory.filter((i) => i.status === "Kritis").length;
  const menipis = inventory.filter((i) => i.status === "Menipis").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Inventory Sparepart"
        description="Stok sparepart gudang — pantau level kritis dan lokasi penyimpanan"
        actions={
          <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90">
            <Package className="size-4" /> Tambah Part
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total SKU", value: inventory.length },
          { label: "Stok Kritis", value: `${kritis} item` },
          { label: "Stok Menipis", value: `${menipis} item` },
        ].map((s) => (
          <div key={s.label} className="card-surface p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="mt-2 font-display text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <Panel title="Daftar Sparepart" actions={<SearchBar placeholder="Cari kode / nama part..." />}>
        <DataTable
          columns={["Kode", "Nama Part", "Kategori", "Stok", "Min", "UOM", "Lokasi", "Status"]}
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
