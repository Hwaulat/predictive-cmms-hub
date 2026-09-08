import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { docChecklistDetails } from "@/lib/mock-data";

export const Route = createFileRoute("/documentation/$machineId/history/$historyId")({
  component: ChecklistDetailsPage,
});

function ChecklistDetailsPage() {
  const { machineId } = useParams({ from: "/documentation/$machineId/history/$historyId" });
  const navigate = useNavigate();
  const details = docChecklistDetails; // using mock data

  return (
    <div className="space-y-6 w-full pb-20 animate-in fade-in-50 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b">
        <h1 className="text-2xl font-bold text-slate-800">Checklist Maintenance</h1>
        <Button 
          variant="outline" 
          className="text-slate-600 bg-white"
          onClick={() => navigate({ to: `/documentation/${machineId}/history` })}
        >
          <ArrowLeft className="size-4 mr-2" /> Back
        </Button>
      </div>

      {/* Details Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <h2 className="text-lg font-bold text-slate-800">Checklist Details</h2>
          <span className="text-sm font-semibold text-slate-500">Submit Form : {details.submitForm}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border p-0 shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 divide-y">
              <div className="grid grid-cols-2 p-4">
                <span className="text-sm font-medium text-slate-600">Checklist ID</span>
                <span className="text-sm font-medium text-slate-800">{details.id}</span>
              </div>
              <div className="grid grid-cols-2 p-4">
                <span className="text-sm font-medium text-slate-600">Document Number</span>
                <span className="text-sm font-medium text-slate-800">{details.docNum}</span>
              </div>
              <div className="grid grid-cols-2 p-4">
                <span className="text-sm font-medium text-slate-600">Machine</span>
                <span className="text-sm font-medium text-slate-800">{details.machine}</span>
              </div>
              <div className="grid grid-cols-2 p-4">
                <span className="text-sm font-medium text-slate-600">Revision No</span>
                <span className="text-sm font-medium text-slate-800">{details.revision}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border p-0 shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 divide-y">
              <div className="grid grid-cols-2 p-4">
                <span className="text-sm font-medium text-slate-600">Department</span>
                <span className="text-sm font-medium text-slate-800">{details.department}</span>
              </div>
              <div className="grid grid-cols-2 p-4">
                <span className="text-sm font-medium text-slate-600">Area</span>
                <span className="text-sm font-medium text-slate-800">{details.area}</span>
              </div>
              <div className="grid grid-cols-2 p-4">
                <span className="text-sm font-medium text-slate-600">Line</span>
                <span className="text-sm font-medium text-slate-800">{details.line}</span>
              </div>
              <div className="grid grid-cols-2 p-4">
                <span className="text-sm font-medium text-slate-600">Executor</span>
                <span className="text-sm font-medium text-slate-800">{details.executor}</span>
              </div>
              <div className="grid grid-cols-2 p-4">
                <span className="text-sm font-medium text-slate-600">Working Hours</span>
                <span className="text-sm font-medium text-slate-800">{details.workingHours}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inspection Items */}
      <div className="space-y-4 pt-6">
        <div className="flex justify-between items-end border-b pb-2">
          <h2 className="text-lg font-bold text-slate-800">Inspection Items</h2>
          <span className="text-sm font-bold text-[#ef4444]">NG : {details.ngCount}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {details.items.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl border shadow-sm overflow-hidden flex flex-col">
              <div className="p-4 border-b flex items-center gap-2">
                <span className="font-bold text-sm text-slate-800">{item.title}</span>
                <span className="font-bold text-sm text-[#ef4444]">{item.status}</span>
              </div>
              <div className="p-4 bg-slate-50 relative aspect-[4/3]">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover rounded-md"
                />
                <Button variant="secondary" size="icon" className="absolute bottom-6 right-6 rounded-md size-8 bg-white/80 hover:bg-white text-slate-700 shadow-sm border">
                  <Maximize2 className="size-4" />
                </Button>
              </div>
              <div className="grid grid-cols-2 divide-x divide-y border-t border-b">
                <div className="p-4 flex flex-col gap-2">
                  <span className="text-xs font-medium text-slate-500">Pressure</span>
                  <span className="text-sm font-semibold text-slate-800">{item.pressure}</span>
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <span className="text-xs font-medium text-slate-500">Temperature</span>
                  <span className="text-sm font-semibold text-slate-800">{item.temp}</span>
                </div>
              </div>
              <div className="p-4 flex flex-col gap-2 bg-slate-50">
                <span className="text-xs font-medium text-slate-500">Description</span>
                <span className="text-sm font-medium text-slate-800">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
