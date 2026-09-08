import { Link, createFileRoute } from "@tanstack/react-router";
import { Eye, Pen, Plus, Search, Trash2 } from "lucide-react";
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

function SparepartPage() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="part" className="w-full">
        {/* Dynamic Header based on active tab would need state, but for simple UI we can just render the button differently if we want, or keep it inside the TabsContent. Let's put header inside TabsContent for different titles/buttons. */}
        
        <TabsList className="bg-slate-100 rounded-md h-10 p-1 flex max-w-max mb-6">
          <TabsTrigger value="part" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-sm px-6 py-1.5 text-sm font-semibold">
            Part
          </TabsTrigger>
          <TabsTrigger value="warehouse" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-sm px-6 py-1.5 text-sm font-semibold">
            Warehouse
          </TabsTrigger>
          <TabsTrigger value="category" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-sm px-6 py-1.5 text-sm font-semibold">
            Category Inventory
          </TabsTrigger>
        </TabsList>

        <TabsContent value="part" className="mt-0 outline-none space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-800">Part</h1>
            <div className="flex items-center gap-2">
              <Link to="/master-data/sparepart/new">
                <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold">
                  <Plus className="size-4 mr-2" /> Add Spare Part
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl border shadow-sm flex flex-col overflow-hidden">
            <div className="p-4 border-b flex flex-col sm:flex-row gap-4 bg-slate-50 justify-between">
              <div className="relative w-full max-w-sm">
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
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-white">
                  <tr className="border-b text-left text-slate-500 font-semibold">
                    <th className="py-4 px-6 whitespace-nowrap">Part No</th>
                    <th className="py-4 px-4 whitespace-nowrap">Part Name</th>
                    <th className="py-4 px-4 whitespace-nowrap">Category</th>
                    <th className="py-4 px-4 whitespace-nowrap">Item Code</th>
                    <th className="py-4 px-4 whitespace-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {parts.map((p, i) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="py-3 px-6 text-slate-600 font-medium">{p.no}</td>
                      <td className="py-3 px-4 text-slate-600">{p.name}</td>
                      <td className="py-3 px-4 text-slate-600">{p.cat}</td>
                      <td className="py-3 px-4 text-slate-600">{p.code}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          <Link to="/master-data/sparepart/$id" params={{ id: p.no }}>
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
        </TabsContent>

        <TabsContent value="warehouse" className="mt-0 outline-none space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-800">Warehouse</h1>
            <div className="flex items-center gap-2">
              <Link to="/master-data/sparepart/warehouse/new">
                <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold">
                  <Plus className="size-4 mr-2" /> Add Location
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl border shadow-sm flex flex-col overflow-hidden">
            <div className="p-4 border-b flex bg-slate-50">
              <div className="relative w-full max-w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <Input placeholder="Search" className="pl-9 bg-white" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-white">
                  <tr className="border-b text-left text-slate-500 font-semibold">
                    <th className="py-4 px-6 whitespace-nowrap">Department</th>
                    <th className="py-4 px-4 whitespace-nowrap">Area</th>
                    <th className="py-4 px-4 whitespace-nowrap">Location</th>
                    <th className="py-4 px-4 whitespace-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {warehouses.map((w, i) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="py-3 px-6 text-slate-600 font-medium">{w.dept}</td>
                      <td className="py-3 px-4 text-slate-600">{w.area}</td>
                      <td className="py-3 px-4 text-slate-600">{w.loc}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
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
        </TabsContent>
        
        <TabsContent value="category" className="mt-0 outline-none">
          <div className="bg-white rounded-xl border shadow-sm p-6 text-center text-slate-500">
            Category Inventory feature coming soon.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
