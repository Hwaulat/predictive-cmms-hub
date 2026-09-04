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
      { title: "Maintenance Report — Maintenance Monitoring System" },
      {
        name: "description",
        content:
          "Maintenance report summary: work order trends, breakdown by type, and technician performance.",
      },
      { property: "og:title", content: "Maintenance Report — CMMS" },
      {
        property: "og:description",
        content: "Monthly maintenance activity report dashboard.",
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
  const done = workOrders.filter((w) => w.status === "Completed").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Maintenance Report"
        description="Summary of current month's maintenance activities"
      />

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total WO", value: total },
          { label: "Completed", value: done },
          { label: "In Progress", value: total - done },
          { label: "Completion Rate", value: `${Math.round((done / total) * 100)}%` },
        ].map((s) => (
          <div key={s.label} className="card-surface p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="mt-2 font-display text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Weekly Work Order Trend" description="Opened vs Completed per week">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={woTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="period" fontSize={12} stroke="var(--color-muted-foreground)" />
                <YAxis fontSize={12} stroke="var(--color-muted-foreground)" />
                <Tooltip />
                <Legend />
                <Bar dataKey="open" name="Opened" fill="var(--color-chart-5)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="closed" name="Closed" fill="var(--color-chart-4)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="WO Distribution by Type">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={woByType} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis type="number" fontSize={12} stroke="var(--color-muted-foreground)" />
                <YAxis dataKey="type" type="category" fontSize={12} width={90} stroke="var(--color-muted-foreground)" />
                <Tooltip />
                <Bar dataKey="count" name="Count" fill="var(--color-chart-1)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <Panel title="Work Order Details">
        <DataTable
          columns={["WO No.", "Equipment", "Type", "Priority", "Technician", "Status"]}
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
                w.status === "Completed"
                  ? "success"
                  : w.status === "Open"
                    ? "info"
                    : w.status === "Awaiting Sparepart"
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
