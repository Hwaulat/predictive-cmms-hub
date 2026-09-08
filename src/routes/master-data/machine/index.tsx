import { Link, createFileRoute } from "@tanstack/react-router";
import { Download, Eye, Pen, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { TablePagination } from "@/components/ui-kit/page";
import { Search } from "lucide-react";

export const Route = createFileRoute("/master-data/machine/")({
  head: () => ({
    meta: [
      { title: "Machine/Equipment — Maintenance Monitoring System" },
      { name: "description", content: "Master machine and equipment data." },
    ],
  }),
  component: MachinePage,
});

// Mock Data matching screenshot
const machines = [
  { code: "STA-PROD-001", name: "Stamping Press", dept: "Department A", area: "Building A", line: "Progresive Medium" },
  { code: "STA-PROD-002", name: "Stamping Press", dept: "Department B", area: "Building A", line: "Progresive Medium" },
  { code: "STA-PROD-003", name: "Stamping Press", dept: "Department C", area: "Building A", line: "Progresive Medium" },
  { code: "STA-PROD-004", name: "Stamping Press", dept: "Department D", area: "Building A", line: "Progresive Medium" },
  { code: "STA-PROD-005", name: "Stamping Press", dept: "Department E", area: "Building A", line: "Progresive Medium" },
  { code: "NC Feeder", name: "Feeder", dept: "Department E", area: "Building A", line: "Progresive Medium" },
  { code: "DRF RHM-10", name: "Spot Welding", dept: "Department E", area: "Building A", line: "Progresive Medium" },
  { code: "Airspot Welder", name: "Spot Welding", dept: "Department E", area: "Building A", line: "Progresive Medium" },
  { code: "CRN-01", name: "Crane/Hoist", dept: "Department E", area: "Building A", line: "Progresive Medium" },
  { code: "GC-75 D1", name: "Preparation", dept: "Department E", area: "Building A", line: "Progresive Medium" },
];

function MachinePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-800">Machine/Equipment</h1>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" className="bg-slate-200 hover:bg-slate-300 text-slate-700 border-none font-semibold">
            <Download className="size-4 mr-2" /> Download
          </Button>
          <Link to="/master-data/machine/new">
            <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold">
              <Plus className="size-4 mr-2" /> Add Machine/Equipment
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-xl border shadow-sm flex flex-col overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b flex flex-col sm:flex-row gap-4 bg-slate-50 justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input placeholder="Search" className="pl-9 bg-white" />
          </div>
          
          <Select defaultValue="section">
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Filter by section" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="section">Filter by section</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-100/50 text-slate-500 uppercase text-xs font-bold tracking-wider border-b">
                <th className="py-4 px-6 w-12"><Checkbox /></th>
                <th className="py-4 px-4 whitespace-nowrap">Machine Code</th>
                <th className="py-4 px-4 whitespace-nowrap">Machine Name</th>
                <th className="py-4 px-4 whitespace-nowrap">Department</th>
                <th className="py-4 px-4 whitespace-nowrap">Area</th>
                <th className="py-4 px-4 whitespace-nowrap">Line</th>
                <th className="py-4 px-4 whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {machines.map((m, i) => (
                <tr key={i} className="hover:bg-slate-50/50">
                  <td className="py-3 px-6"><Checkbox /></td>
                  <td className="py-3 px-4 text-slate-600">{m.code}</td>
                  <td className="py-3 px-4 text-slate-600">{m.name}</td>
                  <td className="py-3 px-4 text-slate-600">{m.dept}</td>
                  <td className="py-3 px-4 text-slate-600">{m.area}</td>
                  <td className="py-3 px-4 text-slate-600">{m.line}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      <Button variant="outline" size="icon" className="size-8 bg-[#22c55e] hover:bg-[#16a34a] text-white border-none shrink-0">
                        <Download className="size-4" />
                      </Button>
                      <Link to="/master-data/machine/$id" params={{ id: m.code.toLowerCase().replace(/[^a-z0-9]+/g, '-') }}>
                        <Button variant="outline" size="icon" className="size-8 bg-[#2563eb] hover:bg-[#1d4ed8] text-white border-none shrink-0">
                          <Eye className="size-4" />
                        </Button>
                      </Link>
                      <Button variant="outline" size="icon" className="size-8 bg-[#f59e0b] hover:bg-[#d97706] text-white border-none shrink-0">
                        <Pen className="size-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="size-8 bg-[#ef4444] hover:bg-[#dc2626] text-white border-none shrink-0">
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <TablePagination />
      </div>
    </div>
  );
}
