import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CalendarCheck,
  ClipboardList,
  RefreshCcw,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DataTable, Panel, PageHeader, StatusPill } from "@/components/ui-kit/page";
import { aiInsights, downtimePareto, kpis, schedule, woTrend } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maintenance Dashboard — CMMS AI Predictive" },
      {
        name: "description",
        content:
          "Monitor MTTR, MTBF, PM compliance, open work orders, and at-risk sparepart predictions in one dashboard.",
      },
      { property: "og:title", content: "Maintenance Dashboard — CMMS AI Predictive" },
      {
        property: "og:description",
        content: "Maintenance KPIs, work order trends, downtime pareto, and AI sparepart insights.",
      },
    ],
  }),
  component: Dashboard,
});

const icons: Record<string, LucideIcon> = {
  wrench: Wrench,
  refresh: RefreshCcw,
  calendar: CalendarCheck,
  clipboard: ClipboardList,
  activity: Activity,
  alert: AlertTriangle,
};

function Dashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard Overview"
        description="Today's plant maintenance performance summary"
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {kpis.map((k) => {
          const Icon = icons[k.icon];
          return (
            <div key={k.label} className="card-surface p-4">
              <div className="flex items-start justify-between">
                <p className="text-xs font-medium text-muted-foreground">{k.label}</p>
                <Icon className="size-4 text-primary" />
              </div>
              <p className="mt-3 font-display text-2xl font-bold">{k.value}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">{k.delta}</p>
            </div>
          );
        })}
      </div>

      <section className="ai-surface rounded-xl p-5">
        <div className="flex items-center gap-2">
          <Sparkles className="size-5 text-primary" />
          <h3 className="font-display text-base font-bold">Today's AI Insight</h3>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          3 spareparts predicted to deplete within the next 7 days:
        </p>
        <ul className="mt-3 space-y-2">
          {aiInsights.map((i) => (
            <li key={i.part} className="rounded-lg bg-surface/70 p-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold">{i.part}</span>
                <StatusPill label={`depletes in ± ${i.days} days`} tone="destructive" />
                <StatusPill
                  label={`confidence ${Math.round(i.confidence * 100)}%`}
                  tone="primary"
                />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{i.reason}</p>
            </li>
          ))}
        </ul>
        <Link
          to="/ai-analytics"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
        >
          View AI Analytics Details <ArrowRight className="size-4" />
        </Link>
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Work Order Trend" description="Opened vs completed per week">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={woTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="period" fontSize={12} stroke="var(--color-muted-foreground)" />
                <YAxis fontSize={12} stroke="var(--color-muted-foreground)" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="open" stroke="var(--color-chart-5)" strokeWidth={2} />
                <Line type="monotone" dataKey="closed" stroke="var(--color-chart-4)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Downtime Pareto by Equipment" description="Total downtime hours this month">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={downtimePareto}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="equipment" fontSize={11} stroke="var(--color-muted-foreground)" />
                <YAxis fontSize={12} stroke="var(--color-muted-foreground)" />
                <Tooltip />
                <Bar dataKey="downtime" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <Panel title="PM Schedule — Next 7 Days" description="Click Schedule module for details">
        <DataTable
          columns={["PM No.", "Equipment", "Trigger", "Due Date", "Technician", "Status"]}
          rows={schedule.map((s) => [
            <span className="font-medium">{s.id}</span>,
            s.equipment,
            s.trigger,
            s.due,
            s.tech,
            <StatusPill
              label={s.status}
              tone={
                s.status === "Overdue"
                  ? "destructive"
                  : s.status === "Due Today"
                    ? "warning"
                    : s.status === "Completed"
                      ? "success"
                      : "info"
              }
            />,
          ])}
        />
      </Panel>
    </div>
  );
}
