import { createFileRoute } from "@tanstack/react-router";
import { DataTable, PageHeader, Panel, StatusPill } from "@/components/ui-kit/page";
import { schedule } from "@/lib/mock-data";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Preventive Maintenance Schedule — CMMS" },
      {
        name: "description",
        content:
          "Time-based and running-hours PM schedule with scheduled, due, and overdue status tracking.",
      },
      { property: "og:title", content: "Preventive Maintenance Schedule" },
      {
        property: "og:description",
        content: "Calendar and PM list with auto-generated work orders when due.",
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
        description="Scheduled preventive maintenance based on time or usage"
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <Panel className="lg:col-span-2" title="PM Calendar — September 2026">
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
            <StatusPill label="Scheduled" tone="info" />
            <StatusPill label="Due Today" tone="warning" />
            <StatusPill label="Overdue" tone="destructive" />
            <StatusPill label="Completed" tone="success" />
          </div>
        </Panel>

        <Panel title="PM Compliance">
          <div className="space-y-4">
            {[
              { label: "Completed on time", value: 92, tone: "var(--color-success)" },
              { label: "Late", value: 6, tone: "var(--color-warning)" },
              { label: "Missed", value: 2, tone: "var(--color-destructive)" },
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

      <Panel title="PM Schedule List">
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
