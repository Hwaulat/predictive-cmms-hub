import { createFileRoute } from "@tanstack/react-router";
import { DataTable, PageHeader, Panel, SearchBar, StatusPill } from "@/components/ui-kit/page";
import { approvalsSparepart } from "@/lib/mock-data";

export const Route = createFileRoute("/approval/spare-part")({
  head: () => ({
    meta: [
      { title: "Approval Spare Part — Maintenance Monitoring System" },
      {
        name: "description",
        content: "Persetujuan permintaan pembelian sparepart sebelum PO diterbitkan.",
      },
      { property: "og:title", content: "Approval Spare Part — CMMS" },
      {
        property: "og:description",
        content: "Review dan approve permintaan sparepart dari berbagai departemen.",
      },
    ],
  }),
  component: ApprovalSparePartPage,
});

const statusTone = (s: string) =>
  s === "Disetujui" ? "success" : s === "Ditolak" ? "destructive" : "warning";

function ApprovalSparePartPage() {
  const pending = approvalsSparepart.filter((a) => a.status === "Menunggu").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Approval Spare Part"
        description="Persetujuan permintaan pembelian sparepart dari departemen terkait"
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total Pengajuan", value: approvalsSparepart.length },
          { label: "Menunggu Approval", value: `${pending} item` },
          { label: "Sudah Diproses", value: `${approvalsSparepart.length - pending} item` },
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
          columns={["No. Approval", "Ref. Request", "Nama Part", "Qty", "Estimasi Biaya", "Status"]}
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
