import { createFileRoute } from "@tanstack/react-router";
import { Activity, ClipboardList, Users, type LucideIcon } from "lucide-react";
import { DataTable, Panel, PageHeader, StatusPill } from "@/components/ui-kit/page";
import { manpowerKpis, technicians } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/manpower")({
  component: ManpowerDashboard,
});

const icons: Record<string, LucideIcon> = {
  users: Users,
  clipboard: ClipboardList,
  activity: Activity,
};

function KpiCards({ data }: { data: any[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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

function ManpowerDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <PageHeader
        title="Manpower Dashboard"
        description="Fokus ke performa dan beban kerja teknisi"
      />

      <KpiCards data={manpowerKpis} />

      <Panel title="Technician Workload & Performance">
        <DataTable
          columns={["Name", "Role", "Active WOs", "Capacity Utilization", "Avg Completion Time", "First-Time Fix Rate"]}
          rows={technicians.map((t) => [
            <span className="font-medium">{t.name}</span>,
            t.role,
            t.activeWO,
            t.capacity,
            t.avgTime,
            <StatusPill label={t.ftf} tone="success" />,
          ])}
        />
      </Panel>
    </div>
  );
}
