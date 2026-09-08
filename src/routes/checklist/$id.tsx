import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/checklist/$id")({
  head: () => ({ meta: [{ title: "Detail Checklist Report" }] }),
  component: ChecklistDetailPage,
});

const rows = [
  ["A. Safety Factor", "1. Pressure", "Open-Close Check", "Action a", "OK", "-", "-"],
  ["", "2. 5 5", "Visual Check", "Action a", "OK", "-", "-"],
  ["", "3. Emergency Stop", "Check Manual", "Action a", "NG", "23 N/m2", "Stronger pressure..."],
  ["B. Lubrication", "1. Lubrication Oil Level", "Visual Check", "No Leaks", "OK", "-", "-"],
  ["", "2. Breaker", "Visual Check", "No Leaks", "NG", "23 N/m2", "Weighing less than ..."],
  ["C. Hidrolic Oil", "1. Temperature oli", "Visual Check", "Complete", "OK", "10 Gram", "-"],
  ["D. Sensor", "1. Material Sensor", "Check sensor manual", "Clean Machine", "OK", "10 Gram", "-"],
];

export function ChecklistDetailPage() {
  const { id } = Route.useParams();
  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between border-b pb-4"><h1 className="text-xl font-bold text-slate-800">Detail Checklist Report</h1><div className="flex items-center gap-2"><Button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white"><Download className="size-4 mr-2" /> Download Report</Button><Link to="/checklist"><Button variant="outline" className="text-slate-700 bg-white"><ArrowLeft className="size-4 mr-2" /> Back</Button></Link></div></div>
  <section className="bg-white rounded-xl border shadow-sm p-6 space-y-5"><div className="flex items-center justify-between border-b pb-3"><h2 className="text-lg font-bold text-slate-800">Maintenance Informations</h2><span className="text-xs text-slate-500">Submit Form : <b className="text-slate-800">12/12/2022 12:02</b></span></div><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><InfoTable items={[["Checklist ID", id], ["Document Number", "TCF2/Form/ME/01/01"], ["Machine", "CRN-01 - Crane"], ["Revision", "1"]]} /><InfoTable items={[["Department", "Production"], ["Area", "Building A"], ["Line", "Progresive Medium"], ["Executor", "Andre Wifi"], ["Working Hours", "1 hours 23 minute"]]} /></div><div className="flex gap-16 text-xs"><div><b>Checked by:</b><p className="text-amber-500 mt-3">Pending</p></div><div><b>Approved by:</b><p className="text-amber-500 mt-3">Pending</p></div></div></section>
  <section className="bg-white rounded-xl border shadow-sm p-6 space-y-4"><div className="flex items-center justify-between border-b pb-3"><h2 className="text-lg font-bold text-slate-800">Checklist Report</h2><span className="text-xs font-semibold">Summary: <b className="text-red-500">NG 2</b> <b className="text-green-600 ml-2">OK 5</b></span></div><div className="overflow-x-auto border rounded-lg"><table className="w-full text-sm"><thead><tr className="bg-slate-100/50 border-b text-left text-slate-500 text-xs font-bold whitespace-nowrap">{["Item Check", "Inspection Items", "Inspection Method", "Standard", "Status", "Variable", "Description of Damage", "Doc. SOP", "Preview"].map((h) => <th key={h} className="py-3 px-4">{h}</th>)}</tr></thead><tbody className="divide-y">{rows.map((row, index) => <tr key={index} className="whitespace-nowrap"><td className="py-3 px-4">{row[0]}</td><td className="py-3 px-4">{row[1]}</td><td className="py-3 px-4">{row[2]}</td><td className="py-3 px-4">{row[3]}</td><td className="py-3 px-4"><span className={`px-2 py-1 rounded text-xs font-bold text-white ${row[4] === "NG" ? "bg-red-500" : "bg-emerald-500"}`}>{row[4]}</span></td><td className="py-3 px-4">{row[5]}</td><td className="py-3 px-4">{row[6]}</td><td className="py-3 px-4">-</td><td className="py-3 px-4">-</td></tr>)}</tbody></table></div></section>
    </div>
  );
}

function InfoTable({ items }: { items: string[][] }) { return <div className="border rounded-lg overflow-hidden divide-y text-sm">{items.map(([label, value]) => <div key={label} className="flex justify-between px-4 py-3"><span className="text-slate-500">{label}</span><b className="text-slate-800">{value}</b></div>)}</div>; }
