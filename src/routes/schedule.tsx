import { createFileRoute } from "@tanstack/react-router";
import { DataTable, PageHeader, Panel, StatusPill } from "@/components/ui-kit/page";
import { schedule } from "@/lib/mock-data";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Schedule Preventive Maintenance — CMMS" },
      {
        name: "description",
        content:
          "Jadwal PM berbasis waktu maupun running hours, lengkap status terjadwal, jatuh tempo, dan overdue.",
      },
      { property: "og:title", content: "Schedule Preventive Maintenance" },
      {
        property: "og:description",
        content: "Kalender dan daftar PM dengan auto-generate work order saat jatuh tempo.",
      },
    ],
  }),
  component: SchedulePage,
});

const days = Array.from({ length: 30 }, (_, i) => i + 1);
const marked: Record<number, "info" | "warning" | "destructive" | "success"> = {
  1: "destructive",
  4: "warning",
  7: "info",
  12: "info",
  18: "info",
  28: "success",
};

function SchedulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Schedule"
        description="Preventive maintenance terjadwal berdasarkan waktu atau pemakaian"
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <Panel className="lg:col-span-2" title="Kalender PM — September 2026">
          <div className="grid grid-cols-7 gap-2">
            {days.map((d) => (
              <div
                key={d}
                className="flex h-16 flex-col rounded-lg border border-border p-2 text-xs"
              >
                <span className="font-semibold text-muted-foreground">{d}</span>
                {marked[d] && (
                  <span
                    className={`mt-auto h-1.5 w-full rounded-full bg-${marked[d]}`}
                    style={{ backgroundColor: `var(--color-${marked[d]})` }}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
            <StatusPill label="Terjadwal" tone="info" />
            <StatusPill label="Jatuh Tempo" tone="warning" />
            <StatusPill label="Overdue" tone="destructive" />
            <StatusPill label="Selesai" tone="success" />
          </div>
        </Panel>

        <Panel title="PM Compliance">
          <div className="space-y-4">
            {[
              { label: "Selesai tepat waktu", value: 92, tone: "var(--color-success)" },
              { label: "Terlambat", value: 6, tone: "var(--color-warning)" },
              { label: "Terlewat", value: 2, tone: "var(--color-destructive)" },
            ].map((r) => (
              <div key={r.label}>
                <div className="flex justify-between text-sm">
                  <span>{r.label}</span>
                  <span className="font-semibold">{r.value}%</span>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full"
                    style={{ width: `${r.value}%`, backgroundColor: r.tone }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title="Daftar Jadwal PM">
        <DataTable
          columns={["No. PM", "Equipment", "Trigger", "Jatuh Tempo", "Teknisi", "Status"]}
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
                  : s.status === "Jatuh Tempo"
                    ? "warning"
                    : s.status === "Selesai"
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
