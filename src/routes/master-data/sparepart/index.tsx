import { Link, createFileRoute } from "@tanstack/react-router";
import { CircleDot, Droplets, Eye, Pen, Plug, Plus, Search, Settings, Trash2, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TablePagination } from "@/components/ui-kit/page";

export const Route = createFileRoute("/master-data/sparepart/")({
  head: () => ({
    meta: [{ title: "Sparepart — Maintenance Monitoring System" }],
  }),
  component: SparepartPage,
});

const parts = [
  { no: "1345", name: "Filter Udara", cat: "Mechanical", code: "97327823" },
  { no: "1346", name: "Gear", cat: "Electrical", code: "97327823" },
  { no: "1356", name: "Pin Knock Out", cat: "Fasteners", code: "97327823" },
  { no: "1378", name: "Pulley", cat: "Shaft Part", code: "97327823" },
  { no: "1367", name: "Gear Box", cat: "O-Ring & Seal", code: "97327823" },
  { no: "1387", name: "Dinamo", cat: "Oil & Gerase", code: "97327823" },
  { no: "1387", name: "Dinamo", cat: "Oil & Gerase", code: "97327823" },
  { no: "1387", name: "Dinamo", cat: "Oil & Gerase", code: "97327823" },
  { no: "1387", name: "Dinamo", cat: "Oil & Gerase", code: "97327823" },
  { no: "1387", name: "Dinamo", cat: "Oil & Gerase", code: "97327823" },
];

const warehouses = [
  { dept: "Department 1", area: "Building A", loc: "A01" },
  { dept: "Department 2", area: "Building A1", loc: "B02" },
  { dept: "Department 3", area: "Building A", loc: "C03" },
  { dept: "Department 4", area: "Building B1", loc: "D04" },
  { dept: "Department 5", area: "Building C1", loc: "E05" },
  { dept: "Department 6", area: "Building A", loc: "F06" },
  { dept: "Department 7", area: "Building A1", loc: "F06" },
  { dept: "Department 8", area: "Building A", loc: "F06" },
  { dept: "Department 9", area: "Building A", loc: "F06" },
  { dept: "Department 10", area: "Building B1", loc: "F06" },
];

const categories = [
  { id: "mechanical", title: "Mechanical", icon: Settings },
  { id: "electrical", title: "Electrical", icon: Plug },
  { id: "fasteners", title: "Fasteners", icon: Wrench },
  { id: "shaft-part", title: "Shaft Part", icon: Wrench },
  { id: "o-ring-seal", title: "O-Ring & Seal", icon: CircleDot },
  { id: "oil-grease", title: "Oil and Grease", icon: Droplets },
  { id: "other", title: "Other", icon: Wrench },
];

function SparepartPage() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="part" className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Sparepart</h1>
            <p className="mt-1 text-sm text-slate-500">Manage sparepart master data and inventory locations.</p>
          </div>
          <TabsList className="bg-slate-100 p-1 rounded-xl border flex max-w-max items-center gap-1 shadow-inner">
            <TabsTrigger value="part" className="px-5 py-2 text-xs font-semibold rounded-lg transition-all text-slate-500 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm">
              Part
            </TabsTrigger>
            <TabsTrigger value="warehouse" className="px-5 py-2 text-xs font-semibold rounded-lg transition-all text-slate-500 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm">
              Warehouse
            </TabsTrigger>
            <TabsTrigger value="category" className="px-5 py-2 text-xs font-semibold rounded-lg transition-all text-slate-500 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm">
              Category Inventory
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="part" className="mt-0 outline-none space-y-6">
          <div className="bg-white rounded-xl border shadow-sm flex flex-col overflow-hidden">
            <div className="p-4 border-b flex flex-col sm:flex-row gap-4 bg-slate-50 justify-between">
              <div className="relative w-full flex-1 min-w-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <Input placeholder="Search" className="pl-9 bg-white" />
              </div>
              <Select defaultValue="category">
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="category">Filter by category</SelectItem>
                </SelectContent>
              </Select>
              <Link to="/master-data/sparepart/new" className="shrink-0">
                <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold w-full">
                  <Plus className="size-4 mr-2" /> Add Spare Part
                </Button>
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-100/50 text-slate-500 uppercase text-xs font-bold tracking-wider border-b">
                    <th className="py-4 px-4 text-left font-semibold w-32">Action</th>
                    <th className="py-4 px-6 whitespace-nowrap">Part No</th>
                    <th className="py-4 px-4 whitespace-nowrap">Part Name</th>
                    <th className="py-4 px-4 whitespace-nowrap">Category</th>
                    <th className="py-4 px-4 whitespace-nowrap">Item Code</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {parts.map((p, i) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Link to="/master-data/sparepart/$id" params={{ id: p.no }}>
                            <Button variant="outline" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary">
                              <Eye className="size-4" />
                            </Button>
                          </Link>
                          <Link to="/master-data/sparepart/edit">
                            <Button variant="outline" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary">
                              <Pen className="size-4" />
                            </Button>
                          </Link>
                          <Button variant="outline" size="icon" className="h-8 w-8 text-slate-400 hover:text-destructive">
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-slate-600 font-medium">{p.no}</td>
                      <td className="py-3 px-4 text-slate-600">{p.name}</td>
                      <td className="py-3 px-4 text-slate-600">{p.cat}</td>
                      <td className="py-3 px-4 text-slate-600">{p.code}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <TablePagination />
          </div>
        </TabsContent>

        <TabsContent value="warehouse" className="mt-0 outline-none space-y-6">
          <div className="bg-white rounded-xl border shadow-sm flex flex-col overflow-hidden">
            <div className="p-4 border-b flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-slate-50">
              <div className="relative w-full flex-1 min-w-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <Input placeholder="Search" className="pl-9 bg-white" />
              </div>
              <Link to="/master-data/sparepart/warehouse/new" className="shrink-0">
                <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold w-full">
                  <Plus className="size-4 mr-2" /> Add Location
                </Button>
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-100/50 text-slate-500 uppercase text-xs font-bold tracking-wider border-b">
                    <th className="py-4 px-4 text-left font-semibold w-32">Action</th>
                    <th className="py-4 px-6 whitespace-nowrap">Department</th>
                    <th className="py-4 px-4 whitespace-nowrap">Area</th>
                    <th className="py-4 px-4 whitespace-nowrap">Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {warehouses.map((w, i) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Link to="/master-data/sparepart/warehouse/edit">
                            <Button variant="outline" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary">
                              <Pen className="size-4" />
                            </Button>
                          </Link>
                          <Button variant="outline" size="icon" className="h-8 w-8 text-slate-400 hover:text-destructive">
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-slate-600 font-medium">{w.dept}</td>
                      <td className="py-3 px-4 text-slate-600">{w.area}</td>
                      <td className="py-3 px-4 text-slate-600">{w.loc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <TablePagination />
          </div>
        </TabsContent>
        
        <TabsContent value="category" className="mt-0 outline-none">
          <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-100/50 text-slate-500 text-xs font-semibold tracking-wider border-b">
                    <th className="py-4 px-4 text-left">Category Title</th>
                    <th className="py-4 px-4 text-left">Category Image</th>
                    <th className="py-4 px-4 text-left w-32">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {categories.map(({ id, title, icon: Icon }) => (
                    <tr key={id} className="hover:bg-slate-50/50">
                      <td className="py-4 px-4 text-slate-700">{title}</td>
                      <td className="py-3 px-4">
                        <Icon className="size-8 text-sky-400" strokeWidth={1.5} />
                      </td>
                      <td className="py-3 px-4">
                        <Link to="/master-data/sparepart/category/edit" search={{ category: id }}>
                          <Button size="icon" className="size-9 bg-amber-500 text-white hover:bg-amber-600">
                            <Pen className="size-4" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
