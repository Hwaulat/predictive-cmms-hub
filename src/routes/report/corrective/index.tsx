import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Eye, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TablePagination } from "@/components/ui-kit/page";

export const Route = createFileRoute("/report/corrective/")({
  head: () => ({ meta: [{ title: "Corrective Report — Maintenance Monitoring System" }] }),
  component: CorrectiveReportPage,
});

const correctiveRows = [
  ["CWID12345", "RDL2/Form/ME/01/03", "15/12/2022 14:00", "-", "-", "CRN-01 - Crane", "Department A", "Building A", "Progresive Medium", "Done"],
  ["CWID12344", "RDL2/Form/ME/01/03", "15/12/2022 14:00", "-", "-", "CRN-01 - Crane", "Department B", "Building A", "Progresive Medium", "Done"],
  ["CWID12343", "RDL2/Form/ME/01/03", "15/12/2022 14:00", "09/08/2024 10:00", "-", "CRN-01 - Crane", "Department C", "Building A", "Progresive Medium", "Done"],
  ["CWID12342", "RDL2/Form/ME/01/03", "15/12/2022 14:00", "19/12/2022 14:00", "19/12/2022 14:00", "CRN-01 - Crane", "Department D", "Building A", "Progresive Medium", "Approved"],
  ["CWID12341", "RDL2/Form/ME/01/03", "15/12/2022 14:00", "-", "-", "CRN-01 - Crane", "Department E", "Building A", "Progresive Medium", "Done"],
  ["CWID12340", "RDL2/Form/ME/01/03", "15/12/2022 14:00", "19/12/2022 14:00", "19/12/2022 14:00", "CRN-01 - Crane", "Department B", "Building A", "Progresive Medium", "Approved"],
  ["CWID12339", "RDL2/Form/ME/01/03", "15/12/2022 14:00", "-", "-", "CRN-01 - Crane", "Department A", "Building A", "Progresive Medium", "Done"],
  ["CWID12338", "RDL2/Form/ME/01/03", "15/12/2022 14:00", "19/12/2022 14:00", "19/12/2022 14:00", "CRN-01 - Crane", "Department A", "Building A", "Progresive Medium", "Approved"],
];

function CorrectiveReportPage() {
  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between border-b pb-4"><h1 className="text-xl font-bold text-slate-800">Corrective Report</h1><Button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white"><Download className="size-4 mr-2" /> Download Report</Button></div>
      <div className="bg-white rounded-xl border shadow-sm flex flex-col overflow-hidden">
        <div className="p-4 border-b bg-slate-50 flex flex-wrap items-center gap-3"><div className="relative flex-1 min-w-[240px]"><Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" /><Input placeholder="Search" className="pl-9 bg-white w-full" /></div><Select defaultValue="all"><SelectTrigger className="w-[140px] bg-white"><SelectValue placeholder="Filter by status" /></SelectTrigger><SelectContent><SelectItem value="all">Filter by status</SelectItem><SelectItem value="done">Done</SelectItem><SelectItem value="approved">Approved</SelectItem></SelectContent></Select></div>
        <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="bg-slate-100/50 text-slate-500 uppercase text-xs font-bold tracking-wider border-b text-left whitespace-nowrap">{["Action", "Status", "Corrective ID", "Document Number", "Submit Form", "Approved WO", "Approved Validate", "Machine", "Department", "Area", "Line"].map((header) => <th key={header} className="py-4 px-4 font-semibold">{header}</th>)}</tr></thead><tbody className="divide-y">{correctiveRows.map((row, rowIndex) => <tr key={`${row[0]}-${rowIndex}`} className="hover:bg-slate-50/50 whitespace-nowrap"><td className="py-3 px-4"><Button variant="outline" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary" asChild><Link to={`/report/corrective/${row[0]}`}><Eye className="size-4" /></Link></Button></td><td className="py-3 px-4"><span className={`px-3 py-1 rounded-md text-xs font-semibold text-white ${row[9] === "Approved" ? "bg-emerald-500" : "bg-blue-600"}`}>{row[9]}</span></td>{row.slice(0, 9).map((value, index) => <td key={index} className="py-3 px-4 text-slate-600">{value}</td>)}</tr>)}</tbody></table></div>
        <TablePagination />
      </div>
    </div>
  );
}