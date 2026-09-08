import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Plus, Search, Eye, Edit2, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/ui-kit/page";
import { departments } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/master-data/department/")({
  head: () => ({
    meta: [
      { title: "Master Department — Maintenance Monitoring System" },
      { name: "description", content: "Manage department data and their area/line hierarchies." },
    ],
  }),
  component: DepartmentList,
});

function DepartmentList() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 pb-20 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-xl font-bold font-display flex items-center gap-2">
          Department
        </h2>
        <Button 
          className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
          onClick={() => navigate({ to: "/master-data/department/new" })}
        >
          <Plus className="size-4 mr-2" /> Add New Department
        </Button>
      </div>

      <div className="bg-white rounded-xl border shadow-sm flex flex-col">
        {/* Filters */}
        <div className="p-4 border-b">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-9 bg-slate-50/50" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm font-medium">
                <th className="py-4 px-6 text-left w-1/4">Department</th>
                <th className="py-4 px-6 text-left w-1/4">Type</th>
                <th className="py-4 px-6 text-left w-1/6">Area</th>
                <th className="py-4 px-6 text-left w-1/6">Line</th>
                <th className="py-4 px-6 text-center w-32">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {departments.map((dept) => {
                const totalAreas = dept.areas.length;
                const totalLines = dept.areas.reduce((sum, area) => sum + area.lines.length, 0);
                
                return (
                  <tr key={dept.id} className="hover:bg-slate-50/50">
                    <td className="py-4 px-6 text-slate-700">{dept.name}</td>
                    <td className="py-4 px-6 text-slate-700">{dept.type}</td>
                    <td className="py-4 px-6 text-slate-700">{totalAreas}</td>
                    <td className="py-4 px-6 text-slate-700">{totalLines}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-9 w-9 rounded-xl bg-slate-50/50 border-slate-200 text-slate-500 hover:text-primary hover:bg-slate-100 shadow-sm transition-all"
                          onClick={() => navigate({ to: `/master-data/department/${dept.id}` })}
                        >
                          <Eye className="size-[18px]" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-9 w-9 rounded-xl bg-slate-50/50 border-slate-200 text-slate-500 hover:text-primary hover:bg-slate-100 shadow-sm transition-all"
                          onClick={() => navigate({ to: `/master-data/department/${dept.id}` })}
                        >
                          <Edit2 className="size-[18px]" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-9 w-9 rounded-xl bg-slate-50/50 border-slate-200 text-slate-500 hover:text-destructive hover:bg-red-50 hover:border-red-200 shadow-sm transition-all"
                        >
                          <Trash2 className="size-[18px]" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
