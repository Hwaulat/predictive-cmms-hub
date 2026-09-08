import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Expand, Pen } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/master-data/sparepart/$id")({
  head: () => ({
    meta: [{ title: "Detail Part" }],
  }),
  component: DetailPartPage,
});

function DetailPartPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-2xl font-bold text-slate-800">Detail Part</h1>
        <div className="flex items-center gap-2">
          <Link to="/master-data/sparepart">
            <Button variant="outline" className="text-slate-700 bg-white">
              <ArrowLeft className="size-4 mr-2" /> Back
            </Button>
          </Link>
          <Button className="bg-[#f59e0b] hover:bg-[#d97706] text-white font-semibold">
            <Pen className="size-4 mr-2" /> Edit
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">
        {/* Left Side: Table */}
        <div className="border rounded-lg bg-white overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-white">
              <tr className="border-b text-left text-slate-500 font-semibold text-xs tracking-wider">
                <th className="py-4 px-6 w-1/3">Name</th>
                <th className="py-4 px-6 w-2/3">Information</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              {[
                { label: "Item Code", value: "0001214" },
                { label: "Location", value: "A01" },
                { label: "Part No", value: "0834" },
                { label: "Part Name", value: "Filter Udara Original" },
                { label: "Brand", value: "Ferrox" },
                { label: "Specification", value: "44 mm" },
                { label: "Unit of Measurement (UoM)", value: "Pcs" },
                { label: "Category", value: "Mechanical" },
                { label: "Vendor", value: "PT Ragdelion Technology" },
                { label: "Cost", value: "Rp. 100.000,-" },
                { label: "Remark", value: "Discontinue" },
                { label: "Minimun Stock", value: "15" },
                { label: "Maintenance Rate", value: "1 Year" },
                { label: "Description", value: "Filter Element" },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="py-4 px-6 text-slate-700 font-semibold">{item.label}</td>
                  <td className="py-4 px-6 text-slate-800 font-medium">{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Side: Images */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-800">Part Image</h3>
            <div className="relative aspect-square rounded-lg border bg-blue-100 overflow-hidden group shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1632731526466-d4fbb1b93f77?q=80&w=600&auto=format&fit=crop" 
                alt="Part" 
                className="w-full h-full object-cover mix-blend-multiply"
              />
              <Button variant="secondary" size="icon" className="absolute bottom-3 right-3 h-8 w-8 rounded-full shadow-sm bg-white/80 hover:bg-white text-slate-700">
                <Expand className="size-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-800">Drawing</h3>
            <div className="relative aspect-[3/4] rounded-lg border bg-white overflow-hidden group shadow-sm p-4">
              <img 
                src="https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=600&auto=format&fit=crop" 
                alt="Drawing Blueprint" 
                className="w-full h-full object-contain grayscale opacity-80"
              />
              <Button variant="secondary" size="icon" className="absolute bottom-3 right-3 h-8 w-8 rounded-full shadow-sm bg-white border text-slate-700">
                <Expand className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
