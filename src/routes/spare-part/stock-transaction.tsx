import { createFileRoute } from "@tanstack/react-router";
import { DataTable, PageHeader, Panel, SearchBar, StatusPill } from "@/components/ui-kit/page";
import { stockTransactions } from "@/lib/mock-data";

export const Route = createFileRoute("/spare-part/stock-transaction")({
  head: () => ({
    meta: [
      { title: "Transaksi Stok — Maintenance Monitoring System" },
      {
        name: "description",
        content: "Catatan seluruh transaksi masuk, keluar, dan adjustment stok sparepart.",
      },
      { property: "og:title", content: "Transaksi Stok — CMMS" },
      {
        property: "og:description",
        content: "Log transaksi stok sparepart: masuk, keluar, dan penyesuaian.",
      },
    ],
  }),
  component: StockTransactionPage,
});

const typeTone = (t: string) =>
  t === "Masuk" ? "success" : t === "Keluar" ? "destructive" : "warning";

function StockTransactionPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Transaksi Stok"
        description="Seluruh pergerakan stok sparepart — masuk, keluar, dan adjustment"
      />

      <Panel
        title="Riwayat Transaksi"
        actions={<SearchBar placeholder="Cari transaksi / part..." />}
      >
        <DataTable
          columns={["ID Transaksi", "Tanggal", "Tipe", "Nama Part", "Qty", "Referensi", "Oleh"]}
          rows={stockTransactions.map((t) => [
            <span className="font-medium">{t.id}</span>,
            t.date,
            <StatusPill label={t.type} tone={typeTone(t.type)} />,
            t.part,
            <span className={t.qty < 0 ? "font-semibold text-destructive" : "font-semibold text-success"}>
              {t.qty > 0 ? `+${t.qty}` : t.qty}
            </span>,
            t.ref,
            t.by,
          ])}
        />
      </Panel>
    </div>
  );
}
