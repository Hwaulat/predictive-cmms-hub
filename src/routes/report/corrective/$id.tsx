import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Download, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/report/corrective/$id")({
  component: DetailCorrectiveReportPage,
});

function DetailCorrectiveReportPage() {
  const { id } = Route.useParams();

  return (
    <div className="space-y-6 pb-20 w-full animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-2xl font-bold text-slate-800">Detail Corrective Report</h1>
        <div className="flex items-center gap-3">
          <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white">
            <Download className="size-4 mr-2" /> Download Report
          </Button>
          <Button variant="outline" asChild>
            <Link to="/report/corrective">
              <ArrowLeft className="size-4 mr-2" /> Back
            </Link>
          </Button>
        </div>
      </div>

      <div className="mb-2 mt-6">
        <h2 className="text-lg font-bold text-slate-800">Maintenance Informations</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border p-0 shadow-sm flex flex-col">
          <div className="grid grid-cols-3 border-b">
            <div className="p-4 text-sm font-medium text-slate-600 bg-slate-50/50 rounded-tl-xl">Corrective ID</div>
            <div className="p-4 text-sm font-semibold col-span-2">{id}</div>
          </div>
          <div className="grid grid-cols-3 border-b">
            <div className="p-4 text-sm font-medium text-slate-600 bg-slate-50/50">Document Number</div>
            <div className="p-4 text-sm font-semibold col-span-2">TCF2/Form/ME/01/01</div>
          </div>
          <div className="grid grid-cols-3 border-b">
            <div className="p-4 text-sm font-medium text-slate-600 bg-slate-50/50">Work Order Type</div>
            <div className="p-4 text-sm font-semibold col-span-2">Machine</div>
          </div>
          <div className="grid grid-cols-3">
            <div className="p-4 text-sm font-medium text-slate-600 bg-slate-50/50 rounded-bl-xl">Machine</div>
            <div className="p-4 text-sm font-semibold col-span-2">CRN-01 - Crane/Hoist</div>
          </div>
        </div>

        <div className="bg-white rounded-xl border p-0 shadow-sm flex flex-col">
          <div className="grid grid-cols-3 border-b">
            <div className="p-4 text-sm font-medium text-slate-600 bg-slate-50/50 rounded-tl-xl">Department</div>
            <div className="p-4 text-sm font-semibold col-span-2">Production</div>
          </div>
          <div className="grid grid-cols-3 border-b">
            <div className="p-4 text-sm font-medium text-slate-600 bg-slate-50/50">Area</div>
            <div className="p-4 text-sm font-semibold col-span-2">Building A</div>
          </div>
          <div className="grid grid-cols-3 border-b">
            <div className="p-4 text-sm font-medium text-slate-600 bg-slate-50/50">Line</div>
            <div className="p-4 text-sm font-semibold col-span-2">Progresive Medium</div>
          </div>
          <div className="grid grid-cols-3">
            <div className="p-4 text-sm font-medium text-slate-600 bg-slate-50/50 rounded-bl-xl">Duration of Work</div>
            <div className="p-4 text-sm font-semibold col-span-2">1 Hour 23 Minute</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {/* Corrective Column */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-800">Corrective</h2>
          <div>
            <p className="text-sm font-bold text-slate-800 mb-4">Approved by:</p>
            <p className="text-sm font-medium flex items-center gap-2 mb-4">
              <span className="flex items-center justify-center size-4 rounded-full bg-[#10b981] text-white text-[10px]">✓</span>
              Nanang Karbu
            </p>
            <div className="flex items-center gap-4 text-sm font-medium mb-2">
              Status: <span className="px-3 py-1 bg-[#10b981] text-white rounded-md text-xs font-semibold">Approved</span>
            </div>
            <p className="text-xs font-medium text-slate-600">Approved Date : 09/08/2024 10:00</p>
          </div>
          
          <div className="bg-white rounded-xl border shadow-sm">
            <div className="p-4 border-b bg-slate-50/50 rounded-t-xl">
              <h3 className="font-semibold text-slate-600 text-sm">Damage Report</h3>
            </div>
            <div className="flex flex-col">
              <div className="grid grid-cols-12 border-b">
                <div className="col-span-5 p-4 text-sm font-medium text-slate-600 border-r bg-white">Wo Created Date</div>
                <div className="col-span-7 p-4 text-sm font-semibold text-slate-800">15/08/2024 02:06</div>
              </div>
              <div className="grid grid-cols-12 border-b">
                <div className="col-span-5 p-4 text-sm font-medium text-slate-600 border-r bg-white">Reported by</div>
                <div className="col-span-7 p-4 text-sm font-semibold text-slate-800">Shendy Wijaksana</div>
              </div>
              <div className="grid grid-cols-12 border-b">
                <div className="col-span-5 p-4 text-sm font-medium text-slate-600 border-r bg-white">Description Damage</div>
                <div className="col-span-7 p-4 text-sm font-semibold text-slate-800 leading-relaxed">The machine motor died and did not rotate, causing the production process to be delayed f...</div>
              </div>
              <div className="grid grid-cols-12">
                <div className="col-span-5 p-4 text-sm font-medium text-slate-600 border-r bg-white rounded-bl-xl">Damage Photo</div>
                <div className="col-span-7 p-4 text-sm font-semibold flex flex-col gap-2">
                  <a href="#" className="text-blue-600 hover:underline">Photo_Kerusakan.JPG</a>
                  <a href="#" className="text-blue-600 hover:underline">Photo_Kerusakan.JPG</a>
                  <a href="#" className="text-blue-600 hover:underline">Photo_Kerusakan.JPG</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Validate Column 1 */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-800">Validate</h2>
          <div>
            <p className="text-sm font-bold text-slate-800 mb-4">Checked by:</p>
            <p className="text-sm font-medium flex items-center gap-2 mb-4 text-amber-500">
              <span className="flex items-center justify-center size-4 rounded-full border-2 border-amber-500 text-[10px]"></span>
              -
            </p>
            <div className="flex items-center gap-4 text-sm font-medium mb-2">
              Status: <span className="px-3 py-1 bg-amber-500 text-white rounded-md text-xs font-semibold">Pending</span>
            </div>
            <p className="text-xs font-medium text-slate-600">Approved Date : -</p>
          </div>
          
          <div className="bg-white rounded-xl border shadow-sm">
            <div className="p-4 border-b bg-slate-50/50 rounded-t-xl">
              <h3 className="font-semibold text-slate-600 text-sm">Maintenance Action</h3>
            </div>
            <div className="flex flex-col">
              <div className="grid grid-cols-12 border-b">
                <div className="col-span-5 p-4 text-sm font-medium text-slate-600 border-r bg-white">Action Date</div>
                <div className="col-span-7 p-4 text-sm font-semibold text-slate-800">15/08/2024 02:06</div>
              </div>
              <div className="grid grid-cols-12 border-b">
                <div className="col-span-5 p-4 text-sm font-medium text-slate-600 border-r bg-white">Repair Action Plan</div>
                <div className="col-span-7 p-4 text-sm font-semibold text-slate-800 leading-relaxed">Replace gear with new one</div>
              </div>
              <div className="grid grid-cols-12 border-b">
                <div className="col-span-5 p-4 text-sm font-medium text-slate-600 border-r bg-white">Breakdown Type</div>
                <div className="col-span-7 p-4 text-sm font-semibold text-slate-800">Gear Damage</div>
              </div>
              <div className="grid grid-cols-12 border-b">
                <div className="col-span-5 p-4 text-sm font-medium text-slate-600 border-r bg-white">Technician by</div>
                <div className="col-span-7 p-4 text-sm font-semibold text-slate-800">Nanang Karbu</div>
              </div>
              <div className="grid grid-cols-12 border-b">
                <div className="col-span-5 p-4 text-sm font-medium text-slate-600 border-r bg-white">Action Taken</div>
                <div className="col-span-7 p-4 text-sm font-semibold text-slate-800">Change Spare Part</div>
              </div>
              <div className="grid grid-cols-12 border-b">
                <div className="col-span-5 p-4 text-sm font-medium text-slate-600 border-r bg-white">Target Completion Date</div>
                <div className="col-span-7 p-4 text-sm font-semibold text-slate-800">12/08/2024</div>
              </div>
              <div className="grid grid-cols-12 border-b">
                <div className="col-span-5 p-4 text-sm font-medium text-slate-600 border-r bg-white">Notes on Target Completion</div>
                <div className="col-span-7 p-4 text-sm font-semibold text-slate-800 leading-relaxed">3 days, because this part was purchased on pre-order, Boss.</div>
              </div>
              <div className="grid grid-cols-12">
                <div className="col-span-5 p-4 text-sm font-medium text-slate-600 border-r bg-white rounded-bl-xl">Repair Action Photo</div>
                <div className="col-span-7 p-4 text-sm font-semibold">
                  <a href="#" className="text-blue-600 hover:underline">Photo_Kerusakan.JPG</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Validate Column 2 */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-800">Validate</h2>
          <div>
            <p className="text-sm font-bold text-slate-800 mb-4">Approved by:</p>
            <p className="text-sm font-medium flex items-center gap-2 mb-4 text-amber-500">
              <span className="flex items-center justify-center size-4 rounded-full border-2 border-amber-500 text-[10px]"></span>
              -
            </p>
            <div className="flex items-center gap-4 text-sm font-medium mb-2">
              Status: <span className="px-3 py-1 bg-amber-500 text-white rounded-md text-xs font-semibold">Pending</span>
            </div>
            <p className="text-xs font-medium text-slate-600">Approved Date : -</p>
          </div>
          
          <div className="bg-white rounded-xl border shadow-sm">
            <div className="p-4 border-b bg-slate-50/50 rounded-t-xl">
              <h3 className="font-semibold text-slate-600 text-sm">Work Validation</h3>
            </div>
            <div className="flex flex-col">
              <div className="grid grid-cols-12 border-b">
                <div className="col-span-5 p-4 text-sm font-medium text-slate-600 border-r bg-white">Validation Date</div>
                <div className="col-span-7 p-4 text-sm font-semibold text-slate-800">-</div>
              </div>
              <div className="grid grid-cols-12 border-b">
                <div className="col-span-5 p-4 text-sm font-medium text-slate-600 border-r bg-white">Validation by</div>
                <div className="col-span-7 p-4 text-sm font-semibold text-slate-800">-</div>
              </div>
              <div className="grid grid-cols-12 border-b h-32">
                <div className="col-span-5 p-4 text-sm font-medium text-slate-600 border-r bg-white">Comment</div>
                <div className="col-span-7 p-4 text-sm font-semibold text-slate-800">-</div>
              </div>
              <div className="grid grid-cols-12 border-b">
                <div className="col-span-5 p-4 text-sm font-medium text-slate-600 border-r bg-white">Final Conclusion</div>
                <div className="col-span-7 p-4 text-sm font-semibold text-slate-800">-</div>
              </div>
              <div className="grid grid-cols-12">
                <div className="col-span-5 p-4 text-sm font-medium text-slate-600 border-r bg-white rounded-bl-xl">Validate Photo</div>
                <div className="col-span-7 p-4 text-sm font-semibold">
                  <span className="text-blue-600">-</span>
                </div>
              </div>
            </div>
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
                  <th className="py-4 px-4 font-semibold">Part Name</th>
                  <th className="py-4 px-4 font-semibold">Item Code</th>
                  <th className="py-4 px-4 font-semibold">Quantity</th>
                  <th className="py-4 px-4 font-semibold">Status</th>
                  <th className="py-4 px-4 font-semibold text-center w-24">Picture</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-4 px-4 text-slate-600">Electric Motor Gear</td>
                  <td className="py-4 px-4 text-slate-600">86342</td>
                  <td className="py-4 px-4 text-slate-600">1x</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 rounded-md text-xs font-semibold text-white bg-[#2563eb]">Done</span>
                  </td>
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
