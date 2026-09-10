import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Eye, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TablePagination } from "@/components/ui-kit/page";

export const Route = createFileRoute("/report/checklist/")({
  head: () => ({ meta: [{ title: "Checklist Report — Maintenance Monitoring System" }] }),
  component: ReportChecklistPage,
});

const checklistRows = [
  ["CID12345", "TCF2/Form/ME/01/01", "12/12/2022 12:04", "-", "CRN-01 - Crane", "Department A", "Building A", "Progresive Medium", "Andrian", "Done"],
  ["CID12344", "TCF2/Form/ME/01/01", "13/12/2022 12:04", "-", "CRN-01 - Crane", "Department B", "Building A", "Progresive Medium", "Dwiki", "Done"],
  ["CID12343", "TCF2/Form/ME/01/01", "14/12/2022 12:04", "14/12/2022 12:04", "CRN-01 - Crane", "Department C", "Building A", "Progresive Medium", "Dwiki", "Approved"],
  ["CID12342", "TCF2/Form/ME/01/01", "15/12/2022 12:04", "-", "CRN-01 - Crane", "Department D", "Building A", "Progresive Medium", "Ferdian", "Done"],
  ["CID12341", "TCF2/Form/ME/01/01", "16/12/2022 12:04", "-", "CRN-01 - Crane", "Department E", "Building A", "Progresive Medium", "Dion", "Done"],
  ["CID12340", "TCF2/Form/ME/01/01", "17/12/2022 12:04", "17/12/2022 12:04", "CRN-01 - Crane", "Department B", "Building A", "Progresive Medium", "Dwiki", "Approved"],
  ["CID12339", "TCF2/Form/ME/01/01", "18/12/2022 12:04", "-", "CRN-01 - Crane", "Department A", "Building A", "Progresive Medium", "Nirvana", "Done"],
  ["CID12338", "TCF2/Form/ME/01/01", "19/12/2022 12:04", "19/12/2022 12:04", "CRN-01 - Crane", "Department A", "Building A", "Progresive Medium", "Dwiki", "Approved"],
];

function ReportChecklistPage() {
  return (
    <div className="space-y-6 pb-20 w-full animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-xl font-bold text-slate-800">Checklist Report</h1>
        <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white">
          <Download className="size-4 mr-2" /> Download Report
        </Button>
      </div>

      <div className="bg-white rounded-xl border shadow-sm flex flex-col overflow-hidden">
        <div className="p-4 border-b bg-slate-50 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-9 bg-white w-full" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px] bg-white">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Filter by status</SelectItem>
              <SelectItem value="done">Done</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px] bg-white">
              <SelectValue placeholder="Filter by executor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Filter by executor</SelectItem>
              <SelectItem value="dwiki">Dwiki</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600 bg-white ml-auto" asChild>
            <Link to="/report/checklist/machine-ng">
              List Machine NG
            </Link>
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-100/50 text-slate-500 text-xs font-bold border-b text-left whitespace-nowrap">
                {["Action", "Status", "Checklist ID", "Document Number", "Submit Form", "Approved Date", "Machine", "Department", "Area", "Line", "Executor"].map((header) => (
                  <th key={header} className="py-4 px-4 font-semibold">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {checklistRows.map((row, rowIndex) => (
                <tr key={`${row[0]}-${rowIndex}`} className="hover:bg-slate-50/50 whitespace-nowrap">
                  <td className="py-3 px-4">
                    <Button variant="outline" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary" asChild>
                      <Link to={`/report/checklist/${row[0]}`}>
                        <Eye className="size-4" />
                      </Link>
                    </Button>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-md text-xs font-semibold text-white ${row[9] === "Approved" ? "bg-[#10b981]" : "bg-[#2563eb]"}`}>
                      {row[9]}
                    </span>
                  </td>
                  {row.slice(0, 9).map((value, index) => (
                    <td key={index} className="py-3 px-4 text-slate-600">{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TablePagination />
      </div>
    </div>
  );
}