import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Eye, FileText, Pen, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/master-data/sparepart/new")({
  head: () => ({
    meta: [{ title: "Add Spare Part" }],
  }),
  component: AddSparePartPage,
});

function AddSparePartPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-2xl font-bold text-slate-800">Add Spare Part</h1>
        <Link to="/master-data/sparepart">
          <Button variant="outline" className="text-slate-700 bg-white">
            <ArrowLeft className="size-4 mr-2" /> Back
          </Button>
        </Link>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl border shadow-sm p-6 space-y-6">
        
        <div className="space-y-2">
          <Label className="text-slate-600 font-medium">Item Code</Label>
          <Input defaultValue="M14579" className="bg-white" />
        </div>
        
        <div className="space-y-2">
          <Label className="text-slate-600 font-medium">Location</Label>
          <Select defaultValue="a01">
            <SelectTrigger className="bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a01">A01</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label className="text-slate-600 font-medium">Part No</Label>
          <Input defaultValue="PBB1345" className="bg-white" />
        </div>
        
        <div className="space-y-2">
          <Label className="text-slate-600 font-medium">Part Name</Label>
          <Input defaultValue="Pillow Block Bearing" className="bg-white" />
        </div>
        
        <div className="space-y-2">
          <Label className="text-slate-600 font-medium">Brand</Label>
          <Input defaultValue="Firrox" className="bg-white" />
        </div>
        
        <div className="space-y-2">
          <Label className="text-slate-600 font-medium">Spesification</Label>
          <Input defaultValue="45" className="bg-white" />
        </div>
        
        <div className="space-y-2">
          <Label className="text-slate-600 font-medium">Unit of Measurement</Label>
          <Select defaultValue="mm">
            <SelectTrigger className="bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mm">Mm</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label className="text-slate-600 font-medium">Category</Label>
          <Select defaultValue="mech">
            <SelectTrigger className="bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mech">Mechanical</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label className="text-slate-600 font-medium">Vendor</Label>
          <Input defaultValue="PT. Ragdalion Revolusi Industri" className="bg-white" />
        </div>
        
        <div className="space-y-2">
          <Label className="text-slate-600 font-medium">Cost</Label>
          <div className="flex border rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
            <div className="bg-slate-200/60 border-r px-4 flex items-center justify-center text-slate-600 text-sm font-medium">
              Rp
            </div>
            <Input defaultValue="100.000" className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none flex-1 bg-white" />
            <div className="flex flex-col justify-center px-2 text-slate-400">
               <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
               <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-slate-600 font-medium">Description</Label>
          <Textarea defaultValue="Filter Element" className="min-h-[120px] bg-white resize-y" />
        </div>

        <div className="grid sm:grid-cols-2 gap-6 pt-2">
          <div className="space-y-2">
            <Label className="text-slate-600 font-medium">Part Image</Label>
            <div className="flex items-center justify-between border rounded-md bg-white p-2 h-11">
              <div className="flex items-center gap-2 overflow-hidden px-2">
                <FileText className="size-4 text-slate-400 shrink-0" />
                <span className="text-sm text-slate-600 truncate">Detail_Pillow_Block_Bearing.jpeg</span>
              </div>
              <div className="flex items-center gap-2 pr-2 shrink-0">
                <button type="button" className="text-slate-400 hover:text-[#2563eb]"><Eye className="size-4" /></button>
                <button type="button" className="text-slate-400 hover:text-slate-700"><Pen className="size-4" /></button>
                <button type="button" className="text-destructive hover:text-red-700"><X className="size-4" /></button>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-slate-600 font-medium">Drawing</Label>
            <div className="flex items-center justify-between border rounded-md bg-white p-2 h-11">
              <div className="flex items-center gap-2 overflow-hidden px-2">
                <FileText className="size-4 text-slate-400 shrink-0" />
                <span className="text-sm text-slate-600 truncate">Drawing_Pillow_Block_Bearing.jpeg</span>
              </div>
              <div className="flex items-center gap-2 pr-2 shrink-0">
                <button type="button" className="text-slate-400 hover:text-[#2563eb]"><Eye className="size-4" /></button>
                <button type="button" className="text-slate-400 hover:text-slate-700"><Pen className="size-4" /></button>
                <button type="button" className="text-destructive hover:text-red-700"><X className="size-4" /></button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <Label className="text-slate-600 font-medium">Remark</Label>
          <Input defaultValue="Available" className="bg-white" />
        </div>
        
        <div className="space-y-2">
          <Label className="text-slate-600 font-medium">Minimum Stock</Label>
          <div className="flex border rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
            <Input defaultValue="15" className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none flex-1 bg-white" />
            <div className="flex flex-col justify-center px-2 text-slate-400 bg-white">
               <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
               <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-slate-600 font-medium">Maintenance Rate (Month)</Label>
          <Input defaultValue="3" className="bg-white" />
        </div>

        <div className="flex justify-end pt-6">
          <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 h-10 rounded-md font-semibold w-full sm:w-auto">
            Save
          </Button>
        </div>

      </div>
    </div>
  );
}
