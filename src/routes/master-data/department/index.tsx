import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Plus, Search, Eye, Edit2, Trash2 } from "lucide-react";
import { PageHeader, TablePagination } from "@/components/ui-kit/page";
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
              <tr className="bg-slate-100/50 text-slate-500 uppercase text-xs font-bold tracking-wider border-b">
                <th className="py-4 px-6 text-left w-32">Action</th>
                <th className="py-4 px-6 text-left w-1/4">Department</th>
                <th className="py-4 px-6 text-left w-1/4">Type</th>
                <th className="py-4 px-6 text-left w-1/6">Area</th>
                <th className="py-4 px-6 text-left w-1/6">Line</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {departments.map((dept) => {
                const totalAreas = dept.areas.length;
                const totalLines = dept.areas.reduce((sum, area) => sum + area.lines.length, 0);
                
                return (
                  <tr key={dept.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 text-slate-400 hover:text-primary"
                          onClick={() => navigate({ to: `/master-data/department/${dept.id}` })}
                        >
                          <Eye className="size-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 text-slate-400 hover:text-primary"
                          onClick={() => navigate({ to: `/master-data/department/${dept.id}` })}
                        >
                          <Edit2 className="size-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 text-slate-400 hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-700">{dept.name}</td>
                    <td className="py-4 px-6 text-slate-700">{dept.type}</td>
                    <td className="py-4 px-6 text-slate-700">{totalAreas}</td>
                    <td className="py-4 px-6 text-slate-700">{totalLines}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <TablePagination />
      </div>
    </div>
  );
}
