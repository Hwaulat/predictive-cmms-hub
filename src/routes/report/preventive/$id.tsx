import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Download, ImageIcon, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/report/preventive/$id")({
  component: DetailPreventiveReportPage,
});

const reportItems = [
  {
    category: "A. Cleanliness",
    items: [
      { id: 1, name: "1. Control Panel Cabinet", method: "Visual", standard: "Clean from oil, dust, scatt...", action: "Cleaning", result: "A", preview: false },
      { id: 2, name: "2. Breaker /ELCB Panel", method: "Visual", standard: "Clean from oil, dust, scatt...", action: "Cleaning", result: "B", preview: true },
      { id: 3, name: "3. Body Machine", method: "Visual", standard: "Clean from oil, dust, scatt...", action: "Cleaning", result: "A", preview: false },
      { id: 4, name: "4. Exhaust /ejector area", method: "Visual", standard: "Clean from oil, dust, scatt...", action: "Cleaning", result: "C", preview: true },
      { id: 5, name: "5. Touch panel/display", method: "Visual", standard: "Clean from oil, dust, scatt...", action: "Cleaning", result: "A", preview: false },
      { id: 6, name: "6. Motor Fan / Cooling Cabinet", method: "Visual", standard: "Clean from oil, dust, scatt...", action: "Cleaning", result: "B", preview: true },
    ]
  },
  {
    category: "B. Lubrication",
    items: [
      { id: 1, name: "1. Main motor Chain", method: "Visual", standard: "Clean from oil, dust, scatt...", action: "Greasing No.2", result: "C", preview: true },
      { id: 2, name: "2. Ejector Ball Screw", method: "Visual", standard: "Ball screw is not dry & hard", action: "Greasing No.2", result: "A", preview: false },
      { id: 3, name: "3. Mold Clamping Piston", method: "Visual", standard: "Coated with thin slide oil", action: "Oil slide 68", result: "C", preview: true },
      { id: 4, name: "4. Feeder slide Bearing", method: "Visual", standard: "The bearing rotates and d...", action: "Greasing No.2", result: "A", preview: false },
      { id: 5, name: "5. Sliding Surface", method: "Visual", standard: "Flat and non-dry surface", action: "Greasing No.2", result: "C", preview: true },
    ]
  }
];

function DetailPreventiveReportPage() {
  const { id } = Route.useParams();

  return (
    <div className="space-y-6 pb-20 w-full animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-2xl font-bold text-slate-800">Detail Preventive Report</h1>
        <div className="flex items-center gap-3">
          <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white">
            <Download className="size-4 mr-2" /> Download Report
          </Button>
          <Button variant="outline" asChild>
            <Link to="/report/preventive">
              <ArrowLeft className="size-4 mr-2" /> Back
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-2 mt-6">
        <h2 className="text-lg font-bold text-slate-800">Maintenance Informations</h2>
        <span className="text-sm font-semibold text-slate-600">Submit Form : 12/12/2023 12:02</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border p-0 shadow-sm flex flex-col">
          <div className="grid grid-cols-3 border-b">
            <div className="p-4 text-sm font-medium text-slate-600 bg-slate-50/50 rounded-tl-xl">Preventive ID</div>
            <div className="p-4 text-sm font-semibold col-span-2">{id}</div>
          </div>
          <div className="grid grid-cols-3 border-b">
            <div className="p-4 text-sm font-medium text-slate-600 bg-slate-50/50">Document Number</div>
            <div className="p-4 text-sm font-semibold col-span-2">TCF2/Form/ME/01/01</div>
          </div>
          <div className="grid grid-cols-3 border-b">
            <div className="p-4 text-sm font-medium text-slate-600 bg-slate-50/50">Description</div>
            <div className="p-4 text-sm font-semibold col-span-2">Monthly</div>
          </div>
          <div className="grid grid-cols-3">
            <div className="p-4 text-sm font-medium text-slate-600 bg-slate-50/50 rounded-bl-xl">Machine</div>
            <div className="p-4 text-sm font-semibold col-span-2">DRF RHM-10 - Spot Welding</div>
          </div>
        </div>

        <div className="bg-white rounded-xl border p-0 shadow-sm flex flex-col">
          <div className="grid grid-cols-3 border-b">
            <div className="p-4 text-sm font-medium text-slate-600 bg-slate-50/50 rounded-tl-xl">Department</div>
            <div className="p-4 text-sm font-semibold col-span-2">Production</div>
          </div>
          <div className="grid grid-cols-3 border-b">
            <div className="p-4 text-sm font-medium text-slate-600 bg-slate-50/50">Area</div>
            <div className="p-4 text-sm font-semibold col-span-2">Building B</div>
          </div>
          <div className="grid grid-cols-3 border-b">
            <div className="p-4 text-sm font-medium text-slate-600 bg-slate-50/50">Line</div>
            <div className="p-4 text-sm font-semibold col-span-2">Progresive Medium</div>
          </div>
          <div className="grid grid-cols-3 border-b">
            <div className="p-4 text-sm font-medium text-slate-600 bg-slate-50/50">Executor</div>
            <div className="p-4 text-sm font-semibold col-span-2">Andre Wifi</div>
          </div>
          <div className="grid grid-cols-3">
            <div className="p-4 text-sm font-medium text-slate-600 bg-slate-50/50 rounded-bl-xl">Working Hours</div>
            <div className="p-4 text-sm font-semibold col-span-2">1 hours 23 minute</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div>
          <p className="text-sm font-bold text-slate-800 mb-4">Checked by:</p>
          <p className="text-sm font-medium flex items-center gap-2 mb-4">
            <span className="flex items-center justify-center size-4 rounded-full bg-[#10b981] text-white text-[10px]">✓</span>
            Andrian
          </p>
          <div className="flex items-center gap-4 text-sm font-medium mb-2">
            Status: <span className="px-3 py-1 bg-[#10b981] text-white rounded-md text-xs font-semibold">Approved</span>
          </div>
          <p className="text-xs font-medium text-slate-600">Approved Date : 09/08/2024 10:00</p>
        </div>
        <div>
          <p className="text-sm font-bold text-slate-800 mb-4">Approved by:</p>
          <p className="text-sm font-medium flex items-center gap-2 mb-4">
            <span className="flex items-center justify-center size-4 rounded-full bg-[#10b981] text-white text-[10px]">✓</span>
            Hasan
          </p>
          <div className="flex items-center gap-4 text-sm font-medium mb-2">
            Status: <span className="px-3 py-1 bg-[#10b981] text-white rounded-md text-xs font-semibold">Approved</span>
          </div>
          <p className="text-xs font-medium text-slate-600">Approved Date : 09/08/2024 10:00</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t mt-6 mb-4">
        <h2 className="text-xl font-bold text-slate-800">Preventive Report</h2>
        <div className="flex items-center gap-4 text-sm font-semibold">
          <span className="text-slate-600 font-bold">Indicator :</span>
          <span className="text-[#10b981]">A: Check</span>
          <span className="text-amber-500">B: Repair</span>
          <span className="text-red-400">C: Change</span>
        </div>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-semibold border-b text-left">
                <th className="py-4 px-4 font-semibold">Item Check</th>
                <th className="py-4 px-4 font-semibold">Inspection Items</th>
                <th className="py-4 px-4 font-semibold">Inspection Method</th>
                <th className="py-4 px-4 font-semibold">Standard</th>
                <th className="py-4 px-4 font-semibold">Action</th>
                <th className="py-4 px-4 font-semibold text-center">Doc. SOP</th>
                <th className="py-4 px-4 font-semibold text-center">Result</th>
                <th className="py-4 px-4 font-semibold text-center">Preview</th>
              </tr>
            </thead>
            <tbody>
              {reportItems.map((category, catIdx) => (
                <>
                  {category.items.map((item, itemIdx) => (
                    <tr key={`${catIdx}-${itemIdx}`} className="border-b last:border-0 hover:bg-slate-50/50">
                      {itemIdx === 0 && (
                        <td className="py-4 px-4 align-top text-slate-700 w-48 border-r bg-white font-medium" rowSpan={category.items.length}>
                          {category.category}
                        </td>
                      )}
                      <td className="py-4 px-4 text-slate-600">{item.name}</td>
                      <td className="py-4 px-4 text-slate-600">{item.method}</td>
                      <td className="py-4 px-4 text-slate-600">{item.standard}</td>
                      <td className="py-4 px-4 text-slate-600">{item.action}</td>
                      <td className="py-4 px-4 text-center">
                        <Button variant="default" size="icon" className="size-8 bg-[#10b981] hover:bg-[#059669]">
                          <FileDown className="size-4" />
                        </Button>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`inline-flex items-center justify-center size-8 rounded-md text-sm font-bold text-white ${
                          item.result === "A" ? "bg-[#10b981]/50 text-[#10b981] bg-opacity-20" : 
                          item.result === "B" ? "bg-amber-100 text-amber-500" : 
                          "bg-red-100 text-red-400"
                        }`}>
                          {item.result}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        {item.preview && (
                          <Button variant="default" size="icon" className="size-8 bg-[#2563eb] hover:bg-[#1d4ed8]" asChild>
                            <Link to={`/report/preventive/preview/${item.id}`}>
                              <ImageIcon className="size-4" />
                            </Link>
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
