import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TablePagination } from "@/components/ui-kit/page";

export const Route = createFileRoute("/checklist/machine-ng/")({
  head: () => ({ meta: [{ title: "List Machine NG" }] }),
  component: MachineNgListPage,
});

const machines = [
  ["CID9870", "CRN-01", "Crane", "Department A", "Building A", "Progresive Medium", "8"],
  ["CID9870", "CRN-02", "Crane", "Department B", "Building A", "Progresive Medium", "36"],
  ["CID9870", "CRN-03", "Crane", "Department C", "Building A", "Progresive Medium", "7"],
  ["CID9870", "CRN-04", "Hoist", "Department D", "Building A", "Progresive Medium", "20"],
  ["CID9870", "CRN-05", "Hoist", "Department E", "Building A", "Progresive Medium", "29"],
  ["CID9870", "CRN-06", "Hoist", "Department E", "Building A", "Progresive Medium", "27"],
  ["CID9870", "CRN-07", "Hoist", "Department E", "Building A", "Progresive Medium", "8"],
  ["CID9870", "CRN-08", "Hoist", "Department E", "Building A", "Progresive Medium", "30"],
  ["CID9870", "CRN-09", "Hoist", "Department E", "Building A", "Progresive Medium", "38"],
  ["CID9870", "CRN-10", "Crane", "Department E", "Building A", "Manual Assembly", ""] ,
];

export function MachineNgListPage() {
  return <div className="space-y-6 pb-20"><div className="flex items-center justify-between border-b pb-4"><h1 className="text-xl font-bold text-slate-800">List Machine NG</h1><Link to="/checklist"><Button variant="outline" className="text-slate-700 bg-white"><ArrowLeft className="size-4 mr-2" /> Back</Button></Link></div><div className="bg-white rounded-xl border shadow-sm flex flex-col overflow-hidden"><div className="p-4 border-b bg-slate-50"><Select defaultValue="all"><SelectTrigger className="w-[140px] bg-white"><SelectValue placeholder="Choose shift" /></SelectTrigger><SelectContent><SelectItem value="all">Choose shift</SelectItem><SelectItem value="shift-1">Shift 1</SelectItem><SelectItem value="shift-2">Shift 2</SelectItem></SelectContent></Select></div><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="bg-slate-100/50 text-slate-500 text-xs font-bold tracking-wider border-b text-left">{["Checklist ID", "Machine Code", "Machine Name", "Department", "Area", "Line", "Total NG", "Preview"].map((h) => <th key={h} className="py-4 px-4">{h}</th>)}</tr></thead><tbody className="divide-y">{machines.map((row, index) => <tr key={index} className="hover:bg-slate-50/50 whitespace-nowrap">{row.map((value, cellIndex) => <td key={cellIndex} className="py-3 px-4 text-slate-600">{value}</td>)}<td className="py-3 px-4"><Link to={`/checklist/machine-ng/${row[1]}`}><Button size="icon" className="size-9 bg-[#2563eb] hover:bg-[#1d4ed8] text-white"><Eye className="size-4" /></Button></Link></td></tr>)}</tbody></table></div><TablePagination /></div></div>;
}
