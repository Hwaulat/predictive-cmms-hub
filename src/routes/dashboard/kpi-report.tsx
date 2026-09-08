import { createFileRoute } from "@tanstack/react-router";
import { DataTable, PageHeader, Panel, StatusPill, SearchBar } from "@/components/ui-kit/page";
import { kpiReportData } from "@/lib/mock-data";
import { Calendar } from "lucide-react";

export const Route = createFileRoute("/dashboard/kpi-report")({
  component: KpiReportPage,
});

function KpiReportPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="KPI Report (Predictive Maintenance)"
        description="Monthly performance metrics tracking OEE, MTBF, MTTR, and Prediction Accuracy"
      />

      <Panel
        actions={
          <div className="flex flex-wrap items-center gap-4 w-full">
            <SearchBar placeholder="Search month..." />
            <div className="h-10 rounded-lg border border-input bg-surface px-3 text-sm flex items-center justify-center text-muted-foreground ml-auto">
               <Calendar className="mr-2 size-4" /> dd/mm/yyyy - dd/mm/yyyy
            </div>
          </div>
        }
      >
        <DataTable
          columns={["Month", "OEE (%)", "MTBF (Hrs)", "MTTR (Hrs)", "Prediction Accuracy (%)"]}
          rows={kpiReportData.map((k) => [
            <span className="font-medium">{k.month}</span>,
            <StatusPill label={k.oee + "%"} tone={k.oee >= 85 ? "success" : "warning"} />,
            k.mtbf,
            k.mttr,
            <StatusPill label={k.accuracy + "%"} tone={k.accuracy > 90 ? "success" : "primary"} />
          ])}
        />
      </Panel>
    </div>
  );
}
