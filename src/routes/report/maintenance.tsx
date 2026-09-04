import { createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DataTable, PageHeader, Panel, StatusPill } from "@/components/ui-kit/page";
import { workOrders, woTrend } from "@/lib/mock-data";

export const Route = createFileRoute("/report/maintenance")({
  head: () => ({
    meta: [
      { title: "Laporan Maintenance — Maintenance Monitoring System" },
      {
        name: "description",
        content:
          "Ringkasan laporan maintenance: tren work order, breakdown per tipe, dan performa teknisi.",
      },
      { property: "og:title", content: "Laporan Maintenance — CMMS" },
      {
        property: "og:description",
        content: "Dashboard laporan aktivitas maintenance bulanan.",
      },
    ],
  }),
  component: MaintenanceReportPage,
});

const woByType = [
  { type: "Corrective", count: workOrders.filter((w) => w.type === "Corrective").length },
  { type: "Preventive", count: workOrders.filter((w) => w.type === "Preventive").length },
  { type: "Predictive", count: workOrders.filter((w) => w.type === "Predictive").length },
  { type: "Emergency", count: workOrders.filter((w) => w.type === "Emergency").length },
];

function MaintenanceReportPage() {
  const total = workOrders.length;
  const done = workOrders.filter((w) => w.status === "Selesai").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Laporan Maintenance"
        description="Ringkasan aktivitas maintenance bulan berjalan"
      />

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total WO", value: total },
          { label: "Selesai", value: done },
          { label: "Dalam Proses", value: total - done },
          { label: "Completion Rate", value: `${Math.round((done / total) * 100)}%` },
        ].map((s) => (
          <div key={s.label} className="card-surface p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="mt-2 font-display text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Tren Work Order Mingguan" description="Dibuka vs selesai per minggu">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={woTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="period" fontSize={12} stroke="var(--color-muted-foreground)" />
                <YAxis fontSize={12} stroke="var(--color-muted-foreground)" />
                <Tooltip />
                <Legend />
                <Bar dataKey="open" name="Dibuka" fill="var(--color-chart-5)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="closed" name="Ditutup" fill="var(--color-chart-4)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Distribusi WO per Tipe">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={woByType} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis type="number" fontSize={12} stroke="var(--color-muted-foreground)" />
                <YAxis dataKey="type" type="category" fontSize={12} width={90} stroke="var(--color-muted-foreground)" />
                <Tooltip />
                <Bar dataKey="count" name="Jumlah" fill="var(--color-chart-1)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <Panel title="Detail Work Order">
        <DataTable
          columns={["No. WO", "Equipment", "Tipe", "Prioritas", "Teknisi", "Status"]}
          rows={workOrders.map((w) => [
            <span className="font-medium">{w.no}</span>,
            w.equipment,
            <StatusPill label={w.type} tone={w.type === "Predictive" ? "primary" : "muted"} />,
            <StatusPill
              label={w.prio}
              tone={
                w.prio === "Critical"
                  ? "destructive"
                  : w.prio === "High"
                    ? "warning"
                    : w.prio === "Low"
                      ? "muted"
                      : "info"
              }
            />,
            w.tech,
            <StatusPill
              label={w.status}
              tone={
                w.status === "Selesai"
                  ? "success"
                  : w.status === "Open"
                    ? "info"
                    : w.status === "Menunggu Sparepart"
                      ? "warning"
                      : "primary"
              }
            />,
          ])}
        />
      </Panel>
    </div>
  );
}
