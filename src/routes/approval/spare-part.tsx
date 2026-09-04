import { createFileRoute } from "@tanstack/react-router";
import { DataTable, PageHeader, Panel, SearchBar, StatusPill } from "@/components/ui-kit/page";
import { approvalsSparepart } from "@/lib/mock-data";

export const Route = createFileRoute("/approval/spare-part")({
  head: () => ({
    meta: [
      { title: "Spare Part Approval — Maintenance Monitoring System" },
      {
        name: "description",
        content: "Spare part purchase request approval before PO issuance.",
      },
      { property: "og:title", content: "Spare Part Approval — CMMS" },
      {
        property: "og:description",
        content: "Review and approve spare part requests from various departments.",
      },
    ],
  }),
  component: ApprovalSparePartPage,
});

const statusTone = (s: string) =>
  s === "Approved" ? "success" : s === "Rejected" ? "destructive" : "warning";

function ApprovalSparePartPage() {
  const pending = approvalsSparepart.filter((a) => a.status === "Pending").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Spare Part Approval"
        description="Spare part purchase request approval from related departments"
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total Submissions", value: approvalsSparepart.length },
          { label: "Pending Approval", value: `${pending} items` },
          { label: "Processed", value: `${approvalsSparepart.length - pending} items` },
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
          columns={["Approval No.", "Ref. Request", "Part Name", "Qty", "Estimated Cost", "Status"]}
          rows={approvalsSparepart.map((a) => [
            <span className="font-medium">{a.id}</span>,
            a.ref,
            a.part,
            a.qty,
            <span className="font-semibold">{a.cost}</span>,
            <StatusPill label={a.status} tone={statusTone(a.status)} />,
          ])}
        />
      </Panel>
    </div>
  );
}
