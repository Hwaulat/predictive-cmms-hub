import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { Download, Eye, Plus, ArrowLeft, Maximize2 } from "lucide-react";
import { PageHeader, TablePagination } from "@/components/ui-kit/page";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { docMachineDetails } from "@/lib/mock-data";

export const Route = createFileRoute("/documentation/$machineId/")({
  component: MachineDetailPage,
});

function MachineDetailPage() {
  const { machineId } = useParams({ from: "/documentation/$machineId/" });
  const navigate = useNavigate();
  const machine = docMachineDetails[machineId] || docMachineDetails["CRN-01"]; // fallback

  const [activeTab, setActiveTab] = useState("info");

  return (
    <div className="space-y-6 w-full pb-20 animate-in fade-in-50 duration-500">
      {/* Header */}
      <div className="flex items-center gap-4 pb-2 border-b">
        <Button 
          variant="outline" 
          className="text-slate-600 bg-white"
          onClick={() => navigate({ to: "/documentation" })}
        >
          <ArrowLeft className="size-4 mr-2" /> Back
        </Button>
        <h1 className="text-2xl font-bold text-slate-800">Machine/Equipment Detail</h1>
      </div>

      {/* Top Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-3">
          <div className="rounded-xl overflow-hidden border shadow-sm relative h-48 group">
            <img 
              src={machine.image} 
              alt={machine.name} 
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <Button variant="secondary" size="icon" className="absolute bottom-2 right-2 rounded-full size-8 bg-white/80 hover:bg-white text-slate-700 shadow-sm">
              <Maximize2 className="size-4" />
            </Button>
          </div>
        </div>
        
        <div className="md:col-span-5 bg-white rounded-xl border p-6 shadow-sm">
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-[140px_auto] text-slate-600">
              <span className="font-medium text-slate-500">Machine Code</span>
              <span className="font-medium text-slate-800 flex gap-2"><span className="text-slate-400">:</span> {machine.code}</span>
            </div>
            <div className="grid grid-cols-[140px_auto] text-slate-600">
              <span className="font-medium text-slate-500">Machine Name</span>
              <span className="font-medium text-slate-800 flex gap-2"><span className="text-slate-400">:</span> {machine.name}</span>
            </div>
            <div className="grid grid-cols-[140px_auto] text-slate-600">
              <span className="font-medium text-slate-500">Department</span>
              <span className="font-medium text-slate-800 flex gap-2"><span className="text-slate-400">:</span> {machine.department}</span>
            </div>
            <div className="grid grid-cols-[140px_auto] text-slate-600">
              <span className="font-medium text-slate-500">Area</span>
              <span className="font-medium text-slate-800 flex gap-2"><span className="text-slate-400">:</span> {machine.area}</span>
            </div>
            <div className="grid grid-cols-[140px_auto] text-slate-600">
              <span className="font-medium text-slate-500">Line</span>
              <span className="font-medium text-slate-800 flex gap-2"><span className="text-slate-400">:</span> {machine.line}</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-4 bg-white rounded-xl border p-6 shadow-sm">
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-[140px_auto] text-slate-600">
              <span className="font-medium text-slate-500">Manual Book</span>
              <span className="font-medium text-blue-600 flex gap-2 cursor-pointer hover:underline"><span className="text-slate-400">:</span> {machine.manualBook}</span>
            </div>
            <div className="grid grid-cols-[140px_auto] text-slate-600">
              <span className="font-medium text-slate-500">SOP</span>
              <span className="font-medium text-blue-600 flex gap-2 cursor-pointer hover:underline"><span className="text-slate-400">:</span> {machine.sop}</span>
            </div>
            <div className="grid grid-cols-[140px_auto] text-slate-600">
              <span className="font-medium text-slate-500">Other Document</span>
              <span className="font-medium text-slate-800 flex gap-2"><span className="text-slate-400">:</span> {machine.otherDoc}</span>
            </div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="pt-2 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="bg-white p-1 rounded-xl border w-max">
            <TabsList className="bg-transparent h-10">
              <TabsTrigger 
                value="info" 
                className="data-[state=active]:bg-slate-100 data-[state=active]:text-primary rounded-lg px-6"
              >
                Machine/Equipment Information
              </TabsTrigger>
              <TabsTrigger 
                value="spare"
                className="data-[state=active]:bg-slate-100 data-[state=active]:text-primary rounded-lg px-6"
              >
                Spare part
              </TabsTrigger>
            </TabsList>
          </div>

          <Button 
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
            onClick={() => navigate({ to: `/documentation/${machineId}/history` })}
          >
            Historical Data
          </Button>
        </div>

        <TabsContent value="info" className="space-y-4 animate-in fade-in-50 mt-0">
          <h2 className="text-xl font-bold text-slate-800">Machine/Equipment Informations</h2>
          <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-white">
                <tr className="text-slate-500 text-left border-b font-medium">
                  <th className="py-4 px-6 w-1/2">Name</th>
                  <th className="py-4 px-6 w-1/2">Information</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {machine.info.map((item: any, idx: number) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-4 px-6 font-semibold text-slate-700">{item.name}</td>
                    <td className="py-4 px-6 text-slate-800 font-medium">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="spare" className="space-y-4 animate-in fade-in-50 mt-0">
          <h2 className="text-xl font-bold text-slate-800">Spare Part</h2>
          <div className="bg-white rounded-xl border shadow-sm overflow-hidden flex flex-col">
            <table className="w-full text-sm">
              <thead className="bg-white">
                <tr className="text-slate-500 text-left border-b font-medium">
                  <th className="py-4 px-6">Part No</th>
                  <th className="py-4 px-6">Part Name</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Work Hours</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {machine.spareparts.map((sp: any, idx: number) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-4 px-6 text-slate-600">{sp.no}</td>
                    <td className="py-4 px-6 text-slate-600">{sp.name}</td>
                    <td className="py-4 px-6 text-slate-600">{sp.category}</td>
                    <td className="py-4 px-6 text-slate-600">{sp.hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <TablePagination />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
