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
      { title: "Sparepart Report — Maintenance Monitoring System" },
      {
        name: "description",
        content: "Sparepart report summary: critical stock, highest consumption, and monthly transactions.",
      },
      { property: "og:title", content: "Sparepart Report — CMMS" },
      {
        property: "og:description",
        content: "Sparepart status and consumption report dashboard.",
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
  const critical = inventory.filter((i) => i.status === "Critical").length;
  const low = inventory.filter((i) => i.status === "Low").length;
  const totalTrx = stockTransactions.length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sparepart Report"
        description="Summary of sparepart stock condition and usage for the current month"
      />

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total SKU", value: inventory.length },
          { label: "Critical Stock", value: `${critical} items` },
          { label: "Low Stock", value: `${low} items` },
          { label: "Transactions This Month", value: totalTrx },
        ].map((s) => (
          <div key={s.label} className="card-surface p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="mt-2 font-display text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Stock by Category">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stockByCategory}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="category" fontSize={12} stroke="var(--color-muted-foreground)" />
                <YAxis fontSize={12} stroke="var(--color-muted-foreground)" />
                <Tooltip />
                <Bar dataKey="stock" name="Stock" fill="var(--color-chart-2)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Availability Status">
          <div className="space-y-4 py-4">
            {[
              { label: "Safe", value: inventory.filter((i) => i.status === "Safe").length, tone: "var(--color-success)" },
              { label: "Low", value: low, tone: "var(--color-warning)" },
              { label: "Critical", value: critical, tone: "var(--color-destructive)" },
            ].map((r) => (
              <div key={r.label}>
                <div className="flex justify-between text-sm">
                  <span>{r.label}</span>
                  <span className="font-semibold">{r.value} SKUs</span>
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

      <Panel title="Recent Part Usage">
        <DataTable
          columns={["Date", "WO No.", "Part Name", "Qty", "Equipment", "Technician"]}
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
