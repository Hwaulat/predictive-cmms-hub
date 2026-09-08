import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DataTable, PageHeader, Panel, StatusPill } from "@/components/ui-kit/page";
import { aiInsights, forecast, purchaseReminders } from "@/lib/mock-data";

export const Route = createFileRoute("/ai-analytics")({
  head: () => ({
    meta: [
      { title: "AI Analytics — Sparepart Stock & Risk Prediction" },
      {
        name: "description",
        content:
          "Predict sparepart stock depletion with confidence bands, explainable reasoning, and reorder recommendations.",
      },
      { property: "og:title", content: "AI Sparepart Analytics" },
      {
        property: "og:description",
        content: "Sparepart consumption forecast and explainable AI recommendations.",
      },
    ],
  }),
  component: AiAnalytics,
});

function AiAnalytics() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Analytics — Predictive Sparepart"
        description="Sparepart demand prediction based on historical patterns, with technician-friendly explanations"
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <Panel
          className="lg:col-span-2"
          title="Stock Forecast — Bearing SKF-6205"
          description="Prediction line with 80% confidence band"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecast}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="day" fontSize={12} stroke="var(--color-muted-foreground)" />
                <YAxis fontSize={12} stroke="var(--color-muted-foreground)" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="upper"
                  stroke="none"
                  fill="var(--color-chart-1)"
                  fillOpacity={0.18}
                />
                <Area
                  type="monotone"
                  dataKey="lower"
                  stroke="none"
                  fill="var(--color-background)"
                  fillOpacity={1}
                />
                <Line
                  type="monotone"
                  dataKey="stock"
                  stroke="var(--color-chart-1)"
                  strokeWidth={2.5}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <section className="ai-surface rounded-xl p-5">
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 text-primary" />
            <h3 className="font-display text-base font-bold">Why is this recommended?</h3>
          </div>
          <ul className="mt-3 space-y-3">
            {aiInsights.map((i) => (
              <li key={i.part} className="rounded-lg bg-surface/70 p-3">
                <p className="text-sm font-semibold">{i.part}</p>
                <p className="mt-1 text-xs text-muted-foreground">{i.reason}</p>
                <div className="mt-2 flex gap-2">
                  <StatusPill label={`± ${i.days} days`} tone="destructive" />
                  <StatusPill
                    label={`accuracy ${Math.round(i.confidence * 100)}%`}
                    tone="primary"
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <Panel title="Reorder Recommendations" description="Based on consumption prediction + supplier lead time">
        <DataTable
          columns={["Sparepart", "Stock", "Min", "Lead Time", "Predicted Depletion", "Recommendation"]}
          rows={purchaseReminders.map((p) => [
            <span className="font-medium">{p.part}</span>,
            p.stock,
            p.min,
            p.leadTime,
            p.predicted,
            <StatusPill
              label={p.action}
              tone={p.action === "Monitor" ? "warning" : "destructive"}
            />,
          ])}
        />
      </Panel>
    </div>
  );
}
