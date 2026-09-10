import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { departments } from "@/lib/mock-data";

export const Route = createFileRoute("/master-data/department/detail/$id")({
  head: () => ({
    meta: [{ title: "Detail Department — Maintenance Monitoring System" }],
  }),
  component: DepartmentDetailPage,
});

function DepartmentDetailPage() {
  const { id } = Route.useParams();
  const department = departments.find((item) => item.id === id) ?? departments[0];
  const rows = department.areas.flatMap((area) => area.lines.map((line) => ({ area: area.name, line })));

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center gap-3 border-b pb-4">
        <Link to="/master-data/department">
          <Button variant="outline" size="sm" className="text-slate-700 bg-white">
            <ArrowLeft className="size-4 mr-1" /> Back
          </Button>
        </Link>
        <h1 className="text-xl font-bold text-slate-800">Detail Department</h1>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-slate-100/70">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input placeholder="Search" className="pl-9 bg-white max-w-[170px]" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-slate-500 font-semibold text-xs">
                <th className="py-3 px-3">Department</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Area</th>
                <th className="py-3 px-3 text-left">Line</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {rows.map((item, index) => (
                <tr key={`${item.area}-${item.line}-${index}`} className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 text-slate-700">{index === 0 ? department.name : ""}</td>
                  <td className="py-3 px-3 text-slate-700">{index === 0 ? department.type : ""}</td>
                  <td className="py-3 px-3 text-slate-700">{index === 0 || item.area !== rows[index - 1]?.area ? item.area : ""}</td>
                  <td className="py-3 px-3 text-slate-700 text-left">{item.line}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}