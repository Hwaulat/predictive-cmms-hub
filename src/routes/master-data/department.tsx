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
        content: "Manage department data: code, name, head, and number of members.",
      },
      { property: "og:title", content: "Master Department — CMMS" },
      {
        property: "og:description",
        content: "Master department data integrated with work orders and approvals.",
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
        description="Department data integrated with work order and approval modules"
        actions={
          <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90">
            <Plus className="size-4" /> Add Department
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total Departments", value: departments.length },
          { label: "Total Employees", value: `${totalMembers} people` },
          { label: "Average per Dept", value: `${Math.round(totalMembers / departments.length)} people` },
        ].map((s) => (
          <div key={s.label} className="card-surface p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="mt-2 font-display text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <Panel
        title="Department List"
        actions={<SearchBar placeholder="Search department..." />}
      >
        <DataTable
          columns={["Code", "Department Name", "Head", "Members"]}
          rows={departments.map((d) => [
            <span className="font-medium">{d.code}</span>,
            d.name,
            d.head,
            `${d.members} people`,
          ])}
        />
      </Panel>
    </div>
  );
}
