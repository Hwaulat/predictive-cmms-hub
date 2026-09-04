import { createFileRoute } from "@tanstack/react-router";
import { DataTable, PageHeader, Panel, SearchBar, StatusPill } from "@/components/ui-kit/page";
import { approvalsMaintenance } from "@/lib/mock-data";

export const Route = createFileRoute("/approval/maintenance")({
  head: () => ({
    meta: [
      { title: "Approval Maintenance — Maintenance Monitoring System" },
      {
        name: "description",
        content: "Daftar work order yang memerlukan persetujuan biaya dari manajemen.",
      },
      { property: "og:title", content: "Approval Maintenance — CMMS" },
      {
        property: "og:description",
        content: "Proses approval biaya work order sebelum eksekusi perbaikan.",
      },
    ],
  }),
  component: ApprovalMaintenancePage,
});

const statusTone = (s: string) =>
  s === "Disetujui" ? "success" : s === "Ditolak" ? "destructive" : "warning";

function ApprovalMaintenancePage() {
  const pending = approvalsMaintenance.filter((a) => a.status === "Menunggu").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Approval Maintenance"
        description="Persetujuan biaya work order — hanya WO di atas batas parameter yang butuh approval"
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total Pengajuan", value: approvalsMaintenance.length },
          { label: "Menunggu Approval", value: `${pending} item` },
          { label: "Sudah Diproses", value: `${approvalsMaintenance.length - pending} item` },
        ].map((s) => (
          <div key={s.label} className="card-surface p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="mt-2 font-display text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <Panel
        title="Daftar Approval"
        actions={<SearchBar placeholder="Cari approval..." />}
      >
        <DataTable
          columns={["No. Approval", "Ref. WO", "Equipment", "Estimasi Biaya", "Pemohon", "Status"]}
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
