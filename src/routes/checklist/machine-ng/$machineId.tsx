import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Download, Image } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/checklist/machine-ng/$machineId")({
  head: () => ({ meta: [{ title: "Detail Machine NG" }] }),
  component: MachineNgDetailPage,
});

const details = [
  ["A. Safety Factor", "1. Pressure", "Open-Close Check", "Works", "NG", "-", "Stronger pressure..."],
  ["", "2. 5 5", "Visual Check", "According to Level", "NG", "-", "Weighing less than ..."],
  ["", "3. Emergency Stop", "Check Manual", "According to Level", "NG", "23 N/m2", "Stronger pressure..."],
  ["B. Lubrication", "1. Lubrication Oil Level", "Visual Check", "No Leaks", "NG", "-", "Weighing less than ..."],
  ["", "2. Breaker", "Visual Check", "No Leaks", "NG", "23 N/m2", "Stronger pressure..."],
  ["C. Hidrolic Oil", "1. Temperature oli", "Visual Check", "Complete", "NG", "10 Gram", "Weighing less than ..."],
  ["", "2. Magnet Conveyor", "Visual Check", "Works", "NG", "23 N/m2", "Stronger pressure..."],
  ["D. Sensor", "1. Material Sensor", "Check sensor manual", "Clean Machine", "NG", "10 Gram", "Weighing less than ..."],
];

export function MachineNgDetailPage() {
  const { machineId } = Route.useParams();
  return <div className="space-y-6 pb-20"><div className="flex items-center justify-between border-b pb-4"><h1 className="text-xl font-bold text-slate-800">Detail Machine ({machineId} - Crane)</h1><Link to="/checklist/machine-ng"><Button variant="outline" className="text-slate-700 bg-white"><ArrowLeft className="size-4 mr-2" /> Back</Button></Link></div><div className="flex items-center justify-between"><Button variant="secondary" size="sm">Shift 1</Button><span className="text-sm">Summary: <b className="text-red-500">NG (8)</b></span></div><div className="bg-white rounded-xl border shadow-sm overflow-x-auto"><table className="w-full text-sm"><thead><tr className="bg-slate-100/50 border-b text-left text-slate-500 text-xs font-bold whitespace-nowrap">{["Item Check", "Inspection Items", "Inspection Method", "Standard", "Status", "Variable", "Description of Damage", "Doc. SOP", "Preview"].map((h) => <th key={h} className="py-3 px-4">{h}</th>)}</tr></thead><tbody className="divide-y">{details.map((row, index) => <tr key={index} className="whitespace-nowrap"><td className="py-3 px-4">{row[0]}</td><td className="py-3 px-4">{row[1]}</td><td className="py-3 px-4">{row[2]}</td><td className="py-3 px-4">{row[3]}</td><td className="py-3 px-4"><span className="px-2 py-1 rounded bg-red-500 text-white text-xs font-bold">{row[4]}</span></td><td className="py-3 px-4">{row[5]}</td><td className="py-3 px-4">{row[6]}</td><td className="py-3 px-4"><Button size="icon" className="size-8 bg-emerald-500 hover:bg-emerald-600"><Download className="size-4" /></Button></td><td className="py-3 px-4"><Button size="icon" className="size-8 bg-blue-600 hover:bg-blue-700"><Image className="size-4" /></Button></td></tr>)}</tbody></table></div></div>;
}
