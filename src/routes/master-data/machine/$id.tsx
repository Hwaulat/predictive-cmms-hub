import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Expand, Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/master-data/machine/$id")({
  head: () => ({
    meta: [{ title: "Machine/Equipment Detail" }],
  }),
  component: MachineDetailPage,
});

function MachineDetailPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/master-data/machine">
            <Button variant="outline" className="text-slate-700 bg-white">
              <ArrowLeft className="size-4 mr-2" /> Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-slate-800">Machine/Equipment Detail</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/master-data/machine/edit">
            <Button className="bg-[#f59e0b] hover:bg-[#d97706] text-white font-semibold">
              <Pen className="size-4 mr-2" /> Edit Machine/Equipment
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Info Card */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Column: Image */}
          <div className="col-span-1">
            <div className="relative aspect-square rounded-lg border bg-slate-100 overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1565515266858-a53c15f4038a?q=80&w=600&auto=format&fit=crop" 
                alt="Machine" 
                className="w-full h-full object-cover"
              />
              <Button variant="secondary" size="icon" className="absolute bottom-3 right-3 h-8 w-8 rounded-full shadow-sm">
                <Expand className="size-4" />
              </Button>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="col-span-1 lg:col-span-3 flex flex-col sm:flex-row gap-6">
            <div className="flex-1 bg-white border rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-[120px_10px_1fr] text-sm gap-y-4">
                <div className="text-slate-500 font-medium">Machine Code</div>
                <div>:</div>
                <div className="text-slate-800 font-medium">CRN-01</div>
                
                <div className="text-slate-500 font-medium">Machine Name</div>
                <div>:</div>
                <div className="text-slate-800 font-medium">Crane</div>
                
                <div className="text-slate-500 font-medium">Department</div>
                <div>:</div>
                <div className="text-slate-800 font-medium">Department A</div>
                
                <div className="text-slate-500 font-medium">Area</div>
                <div>:</div>
                <div className="text-slate-800 font-medium">Building A</div>
                
                <div className="text-slate-500 font-medium">Line</div>
                <div>:</div>
                <div className="text-slate-800 font-medium">Progresive Medium</div>
              </div>
            </div>
            
            <div className="flex-1 bg-white border rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-[140px_10px_1fr] text-sm gap-y-4">
                <div className="text-slate-500 font-medium">Manual Book</div>
                <div>:</div>
                <div><a href="#" className="text-[#2563eb] hover:underline font-medium">Manual-Book.pdf</a></div>
                
                <div className="text-slate-500 font-medium">SOP</div>
                <div>:</div>
                <div><a href="#" className="text-[#2563eb] hover:underline font-medium">SOP1-Book.pdf</a></div>
                
                <div className="text-slate-500 font-medium">Other Document</div>
                <div>:</div>
                <div className="text-slate-800 font-medium">-</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="machine" className="w-full">
        <TabsList className="bg-slate-100 p-1 rounded-xl border flex max-w-max items-center gap-1 shadow-inner mb-6">
          <TabsTrigger value="machine" className="px-5 py-2 text-xs font-semibold rounded-lg transition-all text-slate-500 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm">
            Machine/Equipment
          </TabsTrigger>
          <TabsTrigger value="spare" className="px-5 py-2 text-xs font-semibold rounded-lg transition-all text-slate-500 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm">
            Spare Part
          </TabsTrigger>
        </TabsList>

        <div className="bg-white border rounded-lg rounded-tl-none shadow-sm p-6 w-full">
          <TabsContent value="machine" className="mt-0 outline-none">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Machine/Equipment Information</h2>
            
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-white">
                  <tr className="border-b text-left text-slate-500 font-semibold text-xs tracking-wider">
                    <th className="py-4 px-6 w-1/3">Item</th>
                    <th className="py-4 px-6 w-2/3">Information</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-sm">
                  {[
                    { label: "Machine Item", value: "Injection" },
                    { label: "Brand", value: "HAITAN" },
                    { label: "Type / Model", value: "MA 200011" },
                    { label: "Serial Number", value: "201307020031893" },
                    { label: "Manufacturing Date", value: "04/06/2013" },
                    { label: "Fix Asset MW", value: "MW001043" },
                  ].map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="py-4 px-6 text-slate-700 font-semibold">{item.label}</td>
                      <td className="py-4 px-6 text-slate-800 font-bold">{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="spare" className="mt-0 outline-none w-full">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Spare Part Information</h2>
            
            <div className="border rounded-lg overflow-x-auto w-full">
              <table className="w-full text-sm">
                <thead className="bg-white">
                  <tr className="border-b text-left text-slate-500 font-semibold text-xs tracking-wider">
                    <th className="py-4 px-6 w-16">No</th>
                    <th className="py-4 px-6 w-1/2">Part</th>
                    <th className="py-4 px-6 w-1/2">Category</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-sm">
                  {[
                    { no: 1, part: "0834 - Origin Air Filter", cat: "Mechanical" },
                    { no: 2, part: "0824 - Origin Air Filter", cat: "Electric" },
                    { no: 3, part: "0814 - Origin Air Filter", cat: "Mechanical" },
                    { no: 4, part: "0824 - Origin Air Filter", cat: "TCF2/Form/ME/01/01" },
                  ].map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="py-4 px-6 text-slate-600 font-medium">{item.no}</td>
                      <td className="py-4 px-6 text-slate-600">{item.part}</td>
                      <td className="py-4 px-6 text-slate-600">{item.cat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
