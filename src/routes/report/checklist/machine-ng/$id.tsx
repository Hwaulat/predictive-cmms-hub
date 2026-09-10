import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Download, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/report/checklist/machine-ng/$id")({
  component: DetailMachineNgPage,
});

const reportItems = [
  {
    group: "A. Safety Factor",
    items: [
      { no: "1. Pressure", method: "Open-Close Check", standard: "Works", status: "NG", variable: "-", description: "Stronger pressure..." },
      { no: "2. 5 S", method: "Visual Check", standard: "According to Level", status: "NG", variable: "-", description: "Weighing less than ..." },
      { no: "3. Emergency Stop", method: "Check Manual", standard: "According to Level", status: "NG", variable: "23 N/m²", description: "Stronger pressure..." },
    ]
  },
  {
    group: "B. Lubrication",
    items: [
      { no: "1. Lubrication Oil Level", method: "Visual Check", standard: "No Leaks", status: "NG", variable: "-", description: "Weighing less than ..." },
      { no: "2. Breaker", method: "Visual Check", standard: "No Leaks", status: "NG", variable: "23 N/m²", description: "Stronger pressure..." },
    ]
  },
  {
    group: "C. Hidrolic Oil",
    items: [
      { no: "1. Temperature oli", method: "Visual Check", standard: "Complete", status: "NG", variable: "10 Gram", description: "Weighing less than ..." },
      { no: "2. Magnet Conveyor", method: "Visual Check", standard: "Works", status: "NG", variable: "23 N/m²", description: "Stronger pressure..." },
    ]
  },
  {
    group: "D. Sensor",
    items: [
      { no: "1. Material Sensor", method: "Check sensor manual", standard: "Clean Machine", status: "NG", variable: "10 Gram", description: "Weighing less than ..." },
    ]
  }
];

function DetailMachineNgPage() {
  const { id } = Route.useParams();

  return (
    <div className="space-y-6 pb-20 max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-2xl font-bold text-slate-800">Detail Machine ({id} - Crane)</h1>
        <Button variant="outline" className="border-slate-300" asChild>
          <Link to="/report/checklist/machine-ng">
            <ArrowLeft className="size-4 mr-2" /> Back
          </Link>
        </Button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="px-4 py-2 bg-slate-200 rounded-md text-sm font-medium text-slate-600">
          Shift 1
        </div>
        <p className="text-sm font-semibold text-slate-700">
          Summary : <span className="text-red-500 ml-1">NG (8)</span>
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
                      <span className={`inline-block px-2 py-1 rounded text-xs font-bold text-white w-10 text-center bg-[#ef4444]`}>
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
  );
}
