import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { TablePagination } from "@/components/ui-kit/page";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { docHistoricalData } from "@/lib/mock-data";

export const Route = createFileRoute("/documentation/$machineId/history/")({
  component: HistoricalDataPage,
});

function StatusBadge({ status }: { status: any }) {
  if (!status) return <span>-</span>;
  if (status.type === "ok") return <span className="bg-[#22c55e] text-white px-3 py-1 rounded-md text-xs font-semibold">{status.label}</span>;
  if (status.type === "ng") return <span className="bg-[#ef4444] text-white px-3 py-1 rounded-md text-xs font-semibold">{status.label}</span>;
  
  if (status.a !== undefined) {
    return (
      <div className="flex gap-1">
        <span className="bg-[#86efac] text-slate-800 px-2 py-1 rounded-md text-xs font-semibold">A : {status.a}</span>
        <span className="bg-[#fde047] text-slate-800 px-2 py-1 rounded-md text-xs font-semibold">B : {status.b}</span>
        <span className="bg-[#fca5a5] text-slate-800 px-2 py-1 rounded-md text-xs font-semibold">C : {status.c}</span>
      </div>
    );
  }
  return <span>-</span>;
}

function HistoricalDataPage() {
  const { machineId } = useParams({ from: "/documentation/$machineId/history/" });
  const navigate = useNavigate();

  return (
    <div className="space-y-6 w-full pb-20 animate-in fade-in-50 duration-500">
      {/* Header */}
      <div className="flex items-center gap-4 pb-2 border-b">
        <Button 
          variant="outline" 
          className="text-slate-600 bg-white"
          onClick={() => navigate({ to: `/documentation/${machineId}` })}
        >
          <ArrowLeft className="size-4 mr-2" /> Back
        </Button>
        <h1 className="text-2xl font-bold text-slate-800">Historical Data</h1>
      </div>

      <div className="bg-white rounded-xl border shadow-sm flex flex-col min-h-[500px]">
        {/* Top Control Bar */}
        <div className="p-4 border-b bg-slate-50/50 rounded-t-xl">
          <Select defaultValue="all">
            <SelectTrigger className="w-[300px] bg-white text-muted-foreground">
              <SelectValue placeholder="Choose type maintenance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Choose type maintenance</SelectItem>
              <SelectItem value="Checklist">Checklist</SelectItem>
              <SelectItem value="Preventive">Preventive</SelectItem>
              <SelectItem value="Corrective">Corrective</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-100/50 text-slate-500 uppercase text-xs font-bold tracking-wider border-b">
                <th className="py-4 px-6 text-left">Action</th>
                <th className="py-4 px-6 text-left">ID</th>
                <th className="py-4 px-6 text-left">Type MTC</th>
                <th className="py-4 px-6 text-left">Submit Form</th>
                <th className="py-4 px-6 text-left">Document Number</th>
                <th className="py-4 px-6 text-left">Machine</th>
                <th className="py-4 px-6 text-left">Department</th>
                <th className="py-4 px-6 text-left">Area</th>
                <th className="py-4 px-6 text-left">Line</th>
                <th className="py-4 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {docHistoricalData.map((data, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 group">
                  <td className="py-3 px-6">
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 text-slate-400 hover:text-primary"
                        onClick={() => navigate({ to: `/documentation/${machineId}/history/${data.id}` })}
                      >
                        <Eye className="size-4" />
                      </Button>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-600 font-medium">{data.id}</td>
                  <td className="py-4 px-6 text-slate-600">{data.typeMTC}</td>
                  <td className="py-4 px-6 text-slate-600 whitespace-nowrap">{data.submitForm}</td>
                  <td className="py-4 px-6 text-slate-600 whitespace-nowrap">{data.docNum}</td>
                  <td className="py-4 px-6 text-slate-600 whitespace-nowrap">{data.machine}</td>
                  <td className="py-4 px-6 text-slate-600">{data.department}</td>
                  <td className="py-4 px-6 text-slate-600 whitespace-nowrap">{data.area}</td>
                  <td className="py-4 px-6 text-slate-600 whitespace-nowrap">{data.line}</td>
                  <td className="py-4 px-6"><StatusBadge status={data.status} /></td>
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
