import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { DataTable, PageHeader, Panel, SearchBar } from "@/components/ui-kit/page";
import { departments } from "@/lib/mock-data";

export const Route = createFileRoute("/master-data/department")({
  head: () => ({
    meta: [
      { title: "Master Department — Maintenance Monitoring System" },
      {
        name: "description",
        content: "Kelola data departemen: kode, nama, kepala, dan jumlah anggota.",
      },
      { property: "og:title", content: "Master Department — CMMS" },
      {
        property: "og:description",
        content: "Data master departemen yang terintegrasi dengan work order dan approval.",
      },
    ],
  }),
  component: DepartmentPage,
});

function DepartmentPage() {
  const totalMembers = departments.reduce((sum, d) => sum + d.members, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Master Department"
        description="Data departemen yang terintegrasi dengan modul work order dan approval"
        actions={
          <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90">
            <Plus className="size-4" /> Tambah Departemen
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total Departemen", value: departments.length },
          { label: "Total Karyawan", value: `${totalMembers} orang` },
          { label: "Rata-rata per Dept", value: `${Math.round(totalMembers / departments.length)} orang` },
        ].map((s) => (
          <div key={s.label} className="card-surface p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="mt-2 font-display text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <Panel
        title="Daftar Departemen"
        actions={<SearchBar placeholder="Cari departemen..." />}
      >
        <DataTable
          columns={["Kode", "Nama Departemen", "Kepala", "Jumlah Anggota"]}
          rows={departments.map((d) => [
            <span className="font-medium">{d.code}</span>,
            d.name,
            d.head,
            `${d.members} orang`,
          ])}
        />
      </Panel>
    </div>
  );
}
