import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ImageIcon, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/report/preventive/preview/$itemId")({
  component: PreventiveItemPreviewPage,
});

function PreventiveItemPreviewPage() {
  const { itemId } = Route.useParams();

  return (
    <div className="space-y-6 pb-20 w-full animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-2xl font-bold text-slate-800">Detail Preventive Report</h1>
        <Button variant="outline" asChild>
          <Link to="/report/preventive/$id" params={{ id: "PID9870" }}>
            <ArrowLeft className="size-4 mr-2" /> Back
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-xl border shadow-sm flex flex-col">
        <div className="grid grid-cols-12 border-b last:border-0">
          <div className="col-span-3 p-4 text-sm font-medium text-slate-600 bg-white border-r">Result</div>
          <div className="col-span-9 p-4 text-sm font-semibold text-red-500">C: Change</div>
        </div>
        <div className="grid grid-cols-12 border-b last:border-0">
          <div className="col-span-3 p-4 text-sm font-medium text-slate-600 bg-white border-r">Machine</div>
          <div className="col-span-9 p-4 text-sm font-semibold text-slate-800">CRN-01 - Crane</div>
        </div>
        <div className="grid grid-cols-12 border-b last:border-0">
          <div className="col-span-3 p-4 text-sm font-medium text-slate-600 bg-white border-r">Item Check</div>
          <div className="col-span-9 p-4 text-sm font-semibold text-slate-800">Lubrication</div>
        </div>
        <div className="grid grid-cols-12 border-b last:border-0">
          <div className="col-span-3 p-4 text-sm font-medium text-slate-600 bg-white border-r">Inspection Item</div>
          <div className="col-span-9 p-4 text-sm font-semibold text-slate-800">Cabinet Control Panel</div>
        </div>
        <div className="grid grid-cols-12 border-b last:border-0">
          <div className="col-span-3 p-4 text-sm font-medium text-slate-600 bg-white border-r">Damage Description</div>
          <div className="col-span-9 p-4 text-sm font-semibold text-slate-800">Breaker is a bit dirty, cleaning in some parts.</div>
        </div>
        <div className="grid grid-cols-12 border-b last:border-0">
          <div className="col-span-3 p-4 text-sm font-medium text-slate-600 bg-white border-r">Repair Description</div>
          <div className="col-span-9 p-4 text-sm font-semibold text-slate-800">The scratched body has been patched with the remaining iron glue so that the scratches from the grinding machine are not clearly visible.</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800">Before</h3>
          <div className="relative aspect-square md:aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border-2">
            <div className="absolute inset-0 flex items-center justify-center text-slate-400">
              <ImageIcon className="size-16" />
            </div>
            <img src="https://placehold.co/600x400/f8fafc/94a3b8?text=Before+Image" alt="Before" className="w-full h-full object-cover" />
            <Button size="icon" variant="outline" className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white">
              <Maximize2 className="size-4" />
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800">After</h3>
          <div className="relative aspect-square md:aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border-2">
            <div className="absolute inset-0 flex items-center justify-center text-slate-400">
              <ImageIcon className="size-16" />
            </div>
            <img src="https://placehold.co/600x400/f8fafc/94a3b8?text=After+Image" alt="After" className="w-full h-full object-cover" />
            <Button size="icon" variant="outline" className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white">
              <Maximize2 className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="pt-6">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Inventory</h3>
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs font-semibold border-b text-left">
                  <th className="py-4 px-4 font-semibold">Item Code</th>
                  <th className="py-4 px-4 font-semibold">Inspection Item</th>
                  <th className="py-4 px-4 font-semibold">Part Name</th>
                  <th className="py-4 px-4 font-semibold">Quantity</th>
                  <th className="py-4 px-4 font-semibold text-center w-24">Picture</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-4 px-4 text-slate-600">123</td>
                  <td className="py-4 px-4 text-slate-600">Automatic Grease Pump</td>
                  <td className="py-4 px-4 text-slate-600">Lem Dexton</td>
                  <td className="py-4 px-4 text-slate-600">2</td>
                  <td className="py-4 px-4 flex justify-center">
                    <Button variant="default" size="icon" className="size-8 bg-[#2563eb] hover:bg-[#1d4ed8]">
                      <ImageIcon className="size-4" />
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
