import { createFileRoute } from "@tanstack/react-router";
import { Activity, AlertTriangle, Wallet, Wrench, type LucideIcon } from "lucide-react";
import { DataTable, Panel, PageHeader, StatusPill } from "@/components/ui-kit/page";
import { sparepartKpis, partUsage, aiInsights } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/sparepart")({
  component: SparepartDashboard,
});

const icons: Record<string, LucideIcon> = {
  wallet: Wallet,
  alert: AlertTriangle,
  activity: Activity,
  wrench: Wrench,
};

function KpiCards({ data }: { data: any[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {data.map((k) => {
        const Icon = icons[k.icon] || Activity;
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
  );
}

function SparepartDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <PageHeader
        title="Sparepart Dashboard"
        description="Fokus ke kondisi stok dan pergerakan sparepart"
      />

      <KpiCards data={sparepartKpis} />

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Top Used Parts" description="Highest consumption this month">
          <DataTable
            columns={["Part Name", "Quantity Used", "Total Cost"]}
            rows={partUsage.map((p) => [
              <span className="font-medium">{p.part}</span>,
              p.qty,
              p.cost,
            ])}
          />
        </Panel>

        <Panel title="Critical Part Alerts" description="Predicted to deplete soon">
          <ul className="space-y-3">
            {aiInsights.map((i) => (
              <li key={i.part} className="rounded-lg bg-destructive/10 p-4 border border-destructive/20">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-destructive">{i.part}</span>
                  <StatusPill label={`± ${i.days} days left`} tone="destructive" />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{i.reason}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
