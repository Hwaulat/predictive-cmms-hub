import { createFileRoute } from "@tanstack/react-router";
import { DataTable, PageHeader, Panel, SearchBar, StatusPill } from "@/components/ui-kit/page";
import { approvalsMaintenance } from "@/lib/mock-data";

export const Route = createFileRoute("/approval/maintenance")({
  head: () => ({
    meta: [
      { title: "Maintenance Approval — Maintenance Monitoring System" },
      {
        name: "description",
        content: "Work order cost approval list requiring management sign-off.",
      },
      { property: "og:title", content: "Maintenance Approval — CMMS" },
      {
        property: "og:description",
        content: "Work order cost approval process before repair execution.",
      },
    ],
  }),
  component: ApprovalMaintenancePage,
});

const statusTone = (s: string) =>
  s === "Approved" ? "success" : s === "Rejected" ? "destructive" : "warning";

function ApprovalMaintenancePage() {
  const pending = approvalsMaintenance.filter((a) => a.status === "Pending").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Maintenance Approval"
        description="Work order cost approval — only WOs above the parameter threshold require approval"
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total Submissions", value: approvalsMaintenance.length },
          { label: "Pending Approval", value: `${pending} items` },
          { label: "Processed", value: `${approvalsMaintenance.length - pending} items` },
        ].map((s) => (
          <div key={s.label} className="card-surface p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="mt-2 font-display text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <Panel
        title="Approval List"
        actions={<SearchBar placeholder="Search approval..." />}
      >
        <DataTable
          columns={["Approval No.", "Ref. WO", "Equipment", "Estimated Cost", "Requester", "Status"]}
          rows={approvalsMaintenance.map((a) => [
            <span className="font-medium">{a.id}</span>,
            a.ref,
            a.equipment,
            <span className="font-semibold">{a.cost}</span>,
            a.requester,
            <StatusPill label={a.status} tone={statusTone(a.status)} />,
          ])}
        />
      </Panel>
    </div>
  );
}
