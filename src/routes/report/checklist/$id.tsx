import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Download, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/report/checklist/$id")({
  component: DetailChecklistReportPage,
});

const reportItems = [
  {
    group: "A. Safety Factor",
    items: [
      { no: "1. Automatic Grease Pump", method: "Viewed", standard: "Works", status: "OK", variable: "23 N/m²", description: "-" },
      { no: "2. Connect Rod Lubrication Level", method: "Viewed", standard: "According to Level", status: "NG", variable: "-", description: "Weighing less than ..." },
      { no: "3. Air Pressure", method: "Viewed", standard: "According to Level", status: "OK", variable: "-", description: "-" },
    ]
  },
  {
    group: "B. Lubrication",
    items: [
      { no: "1. Wind Leaks", method: "Viewed - Written", standard: "No Leaks", status: "NG", variable: "-", description: "Weighing less than ..." },
      { no: "2. Completness of Buttons and Their Functions", method: "Viewed", standard: "No Leaks", status: "NG", variable: "23 N/m²", description: "Stronger pressure..." },
    ]
  },
  {
    group: "C. Hidrolic Oil",
    items: [
      { no: "1. Censor Safety Device", method: "Viewed - Checked", standard: "Complete", status: "OK", variable: "10 Gram", description: "-" },
      { no: "2. Clean the Machine Body", method: "Viewed - Checked", standard: "Works", status: "NG", variable: "23 N/m²", description: "Stronger pressure..." },
    ]
  },
  {
    group: "D. Sensor",
    items: [
      { no: "1. Clean the Machine Legs", method: "In Lap With Forward", standard: "Clean Machine", status: "OK", variable: "10 Gram", description: "-" },
    ]
  }
];

function DetailChecklistReportPage() {
  const { id } = Route.useParams();

  return (
    <div className="space-y-6 pb-20 w-full animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-2xl font-bold text-slate-800">Detail Checklist Report</h1>
        <div className="flex items-center gap-3">
          <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white">
            <Download className="size-4 mr-2" /> Download Report
          </Button>
          <Button variant="outline" asChild>
            <Link to="/report/checklist">
              <ArrowLeft className="size-4 mr-2" /> Back
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-end">
        <h2 className="text-lg font-bold text-slate-800">Maintenance Informations</h2>
        <p className="text-sm text-slate-500">Submit Form: <span className="font-semibold text-slate-800">01/08/2024 01:31</span></p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border p-0 overflow-hidden shadow-sm">
          <div className="grid grid-cols-[140px_1fr] divide-x border-b">
            <div className="p-4 text-sm text-slate-500 bg-slate-50">Checklist ID</div>
            <div className="p-4 text-sm font-medium">{id === "machine-ng" ? "CID12345" : id}</div>
          </div>
          <div className="grid grid-cols-[140px_1fr] divide-x border-b">
            <div className="p-4 text-sm text-slate-500 bg-slate-50">Document Number</div>
            <div className="p-4 text-sm font-medium">TCF2/Form/ME/01/01</div>
          </div>
          <div className="grid grid-cols-[140px_1fr] divide-x border-b">
            <div className="p-4 text-sm text-slate-500 bg-slate-50">Machine</div>
            <div className="p-4 text-sm font-medium">STA-PROD-001 - Stamping Press</div>
          </div>
          <div className="grid grid-cols-[140px_1fr] divide-x">
            <div className="p-4 text-sm text-slate-500 bg-slate-50">Revision No</div>
            <div className="p-4 text-sm font-medium">1</div>
          </div>
        </div>

        <div className="bg-white rounded-xl border p-0 overflow-hidden shadow-sm">
          <div className="grid grid-cols-[140px_1fr] divide-x border-b">
            <div className="p-4 text-sm text-slate-500 bg-slate-50">Department</div>
            <div className="p-4 text-sm font-medium">Production</div>
          </div>
          <div className="grid grid-cols-[140px_1fr] divide-x border-b">
            <div className="p-4 text-sm text-slate-500 bg-slate-50">Area</div>
            <div className="p-4 text-sm font-medium">Building A</div>
          </div>
          <div className="grid grid-cols-[140px_1fr] divide-x border-b">
            <div className="p-4 text-sm text-slate-500 bg-slate-50">Line</div>
            <div className="p-4 text-sm font-medium">Progresive Medium</div>
          </div>
          <div className="grid grid-cols-[140px_1fr] divide-x border-b">
            <div className="p-4 text-sm text-slate-500 bg-slate-50">Executor</div>
            <div className="p-4 text-sm font-medium">Andre Wifi</div>
          </div>
          <div className="grid grid-cols-[140px_1fr] divide-x">
            <div className="p-4 text-sm text-slate-500 bg-slate-50">Working Hours</div>
            <div className="p-4 text-sm font-medium">1 Hour 23 Minute</div>
          </div>
        </div>
      </div>

      <div className="flex gap-16 pt-4">
        <div>
          <p className="text-sm font-semibold mb-3">Checked by:</p>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="size-5 text-[#10b981]" />
            <span className="text-sm font-medium">Suprayitno</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-slate-500">Status:</span>
            <span className="bg-[#10b981] text-white px-3 py-1 rounded-md text-xs font-semibold">Approved</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Approved Date : 09/08/2024 10:00</p>
        </div>
        <div>
          <p className="text-sm font-semibold mb-3">Approved by:</p>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="size-5 text-[#10b981]" />
            <span className="text-sm font-medium">Purnomo</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-slate-500">Status:</span>
            <span className="bg-[#10b981] text-white px-3 py-1 rounded-md text-xs font-semibold">Approved</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Approved Date : 09/08/2024 10:00</p>
        </div>
      </div>

      <div className="pt-6">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-xl font-bold text-slate-800">Checklist Report</h2>
          <p className="text-sm font-semibold text-slate-700">
            Summary : <span className="text-red-500 ml-1">NG 5</span> <span className="text-[#10b981] ml-2">OK 4</span>
          </p>
        </div>

        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs font-semibold border-b text-left">
                  <th className="py-3 px-4 w-40">Item Check</th>
                  <th className="py-3 px-4 min-w-[200px]">Inspection Items</th>
                  <th className="py-3 px-4 w-40">Inspection Method</th>
                  <th className="py-3 px-4 w-32">Standard</th>
                  <th className="py-3 px-4 w-20">Status</th>
                  <th className="py-3 px-4 w-24">Variable</th>
                  <th className="py-3 px-4 min-w-[150px]">Description of Damage</th>
                  <th className="py-3 px-4 w-24 text-center">Doc. SOP</th>
                  <th className="py-3 px-4 w-24 text-center">Preview</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {reportItems.map((group, groupIndex) => (
                  group.items.map((item, itemIndex) => (
                    <tr key={`${groupIndex}-${itemIndex}`} className="hover:bg-slate-50/50">
                      {itemIndex === 0 && (
                        <td className="py-3 px-4 border-r align-top bg-white" rowSpan={group.items.length}>
                          <span className="font-medium text-slate-700">{group.group}</span>
                        </td>
                      )}
                      <td className="py-3 px-4 border-r text-slate-600">{item.no}</td>
                      <td className="py-3 px-4 border-r text-slate-600">{item.method}</td>
                      <td className="py-3 px-4 border-r text-slate-600">{item.standard}</td>
                      <td className="py-3 px-4 border-r text-center">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-bold text-white w-10 text-center ${item.status === 'OK' ? 'bg-[#10b981]' : 'bg-[#ef4444]'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 border-r text-slate-600 text-center">{item.variable}</td>
                      <td className="py-3 px-4 border-r text-slate-600">{item.description}</td>
                      <td className="py-3 px-4 border-r text-center">
                        <Button size="icon" className="h-8 w-8 bg-[#10b981] hover:bg-[#059669]">
                          <Download className="size-4 text-white" />
                        </Button>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Button size="icon" className="h-8 w-8 bg-[#2563eb] hover:bg-[#1d4ed8]">
                          <ImageIcon className="size-4 text-white" />
                        </Button>
                      </td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
