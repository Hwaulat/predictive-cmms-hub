import { createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DataTable, PageHeader, Panel, StatusPill } from "@/components/ui-kit/page";
import { inventory, stockTransactions, logPart } from "@/lib/mock-data";

export const Route = createFileRoute("/report/sparepart")({
  head: () => ({
    meta: [
      { title: "Laporan Sparepart — Maintenance Monitoring System" },
      {
        name: "description",
        content: "Ringkasan laporan sparepart: stok kritis, konsumsi terbanyak, dan transaksi bulanan.",
      },
      { property: "og:title", content: "Laporan Sparepart — CMMS" },
      {
        property: "og:description",
        content: "Dashboard laporan status dan konsumsi sparepart.",
      },
    ],
  }),
  component: SparepartReportPage,
});

const stockByCategory = inventory.reduce(
  (acc, item) => {
    const existing = acc.find((a) => a.category === item.cat);
    if (existing) {
      existing.stock += item.stock;
    } else {
      acc.push({ category: item.cat, stock: item.stock });
    }
    return acc;
  },
  [] as { category: string; stock: number }[],
);

function SparepartReportPage() {
  const kritis = inventory.filter((i) => i.status === "Kritis").length;
  const menipis = inventory.filter((i) => i.status === "Menipis").length;
  const totalTrx = stockTransactions.length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Laporan Sparepart"
        description="Ringkasan kondisi stok dan pemakaian sparepart bulan berjalan"
      />

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total SKU", value: inventory.length },
          { label: "Stok Kritis", value: `${kritis} item` },
          { label: "Stok Menipis", value: `${menipis} item` },
          { label: "Transaksi Bulan Ini", value: totalTrx },
        ].map((s) => (
          <div key={s.label} className="card-surface p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="mt-2 font-display text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Stok per Kategori">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stockByCategory}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="category" fontSize={12} stroke="var(--color-muted-foreground)" />
                <YAxis fontSize={12} stroke="var(--color-muted-foreground)" />
                <Tooltip />
                <Bar dataKey="stock" name="Stok" fill="var(--color-chart-2)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Status Ketersediaan">
          <div className="space-y-4 py-4">
            {[
              { label: "Aman", value: inventory.filter((i) => i.status === "Aman").length, tone: "var(--color-success)" },
              { label: "Menipis", value: menipis, tone: "var(--color-warning)" },
              { label: "Kritis", value: kritis, tone: "var(--color-destructive)" },
            ].map((r) => (
              <div key={r.label}>
                <div className="flex justify-between text-sm">
                  <span>{r.label}</span>
                  <span className="font-semibold">{r.value} SKU</span>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${(r.value / inventory.length) * 100}%`,
                      backgroundColor: r.tone,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title="Pemakaian Part Terbaru">
        <DataTable
          columns={["Tanggal", "No. WO", "Nama Part", "Qty", "Equipment", "Teknisi"]}
          rows={logPart.map((l) => [
            l.date,
            <span className="font-medium">{l.wo}</span>,
            l.part,
            l.qty,
            l.equipment,
            l.tech,
          ])}
        />
      </Panel>
    </div>
  );
}
