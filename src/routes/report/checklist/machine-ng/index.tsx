import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TablePagination } from "@/components/ui-kit/page";

export const Route = createFileRoute("/report/checklist/machine-ng/")({
  component: ListMachineNgPage,
});

const machineNgRows = [
  ["CID9870", "CRN-01", "Crane", "Department A", "Building A", "Progresive Medium", "8"],
  ["CID9870", "CRN-02", "Crane", "Department B", "Building A", "Progresive Medium", "36"],
  ["CID9870", "CRN-03", "Crane", "Department C", "Building A", "Progresive Medium", "7"],
  ["CID9870", "CRN-04", "Hoist", "Department D", "Building A", "Progresive Medium", "20"],
  ["CID9870", "CRN-05", "Hoist", "Department E", "Building A", "Progresive Medium", "29"],
  ["CID9870", "CRN-06", "Hoist", "Department E", "Building A", "Progresive Medium", "27"],
  ["CID9870", "CRN-07", "Hoist", "Department E", "Building A", "Progresive Medium", "8"],
  ["CID9870", "CRN-08", "Hoist", "Department E", "Building A", "Progresive Medium", "30"],
  ["CID9870", "CRN-09", "Hoist", "Department E", "Building A", "Progresive Medium", "38"],
  ["CID9870", "CRN-10", "Crane", "Department E", "Building A", "Manual Assembly", "10"],
];

function ListMachineNgPage() {
  return (
    <div className="space-y-6 pb-20 w-full animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-2xl font-bold text-slate-800">List Machine NG</h1>
        <Button variant="outline" asChild>
          <Link to="/report/checklist">
            <ArrowLeft className="size-4 mr-2" /> Back
          </Link>
        </Button>
      </div>

      <div className="mb-4">
        <Select defaultValue="shift1">
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="Choose shift" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="shift1">Shift 1</SelectItem>
            <SelectItem value="shift2">Shift 2</SelectItem>
            <SelectItem value="shift3">Shift 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-xl border shadow-sm flex flex-col overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-semibold border-b text-left whitespace-nowrap">
                {["Checklist ID", "Machine Code", "Machine Name", "Department", "Area", "Line", "Total NG", "Preview"].map((header) => (
                  <th key={header} className="py-4 px-4 font-semibold">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {machineNgRows.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-slate-50/50 whitespace-nowrap">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="py-3 px-4 text-slate-600">{cell}</td>
                  ))}
                  <td className="py-3 px-4">
                    <Button variant="outline" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary" asChild>
                      <Link to={`/report/checklist/machine-ng/${row[1]}`}>
                        <Eye className="size-4" />
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end p-4 border-t">
          <TablePagination />
        </div>
      </div>
    </div>
  );
}
