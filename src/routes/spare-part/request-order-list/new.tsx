import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const Route = createFileRoute("/spare-part/request-order-list/new")({
  component: CreateRequestOrder,
});

function CreateRequestOrder() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 pb-20 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate({ to: "/spare-part/request-order-list" })}>
            <ArrowLeft className="size-4 mr-1" /> Back
          </Button>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Plus className="size-5" /> Create New Order List
          </h2>
        </div>
        <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8">
          Submit
        </Button>
      </div>

      <div className="bg-white rounded-xl border shadow-sm p-6 space-y-8">
        
        {/* Top Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <Label>Group In Charge<span className="text-destructive">*</span></Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choose group in charge" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mech-entry">MECHANICAL - ENTRY</SelectItem>
                <SelectItem value="mech-delivery">MECHANICAL - DELIVERY</SelectItem>
                <SelectItem value="mech-furnace">MECHANICAL - FURNACE</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Delivery Plan<span className="text-destructive">*</span></Label>
            <Input type="date" className="text-muted-foreground" />
          </div>
        </div>

        {/* List Sparepart Horizontal Table */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg">List Sparepart</h3>
          
          <div className="bg-slate-100 rounded-t-lg border-x border-t flex items-center px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider overflow-x-auto whitespace-nowrap min-w-full">
            <div className="w-12 shrink-0">Action</div>
            <div className="w-48 shrink-0">Application Area <span className="text-destructive">*</span></div>
            <div className="w-48 shrink-0">Choose Item <span className="text-destructive">*</span></div>
            <div className="w-48 shrink-0">Item Name <span className="text-destructive">*</span></div>
            <div className="w-48 shrink-0">Specification <span className="text-destructive">*</span></div>
            <div className="w-48 shrink-0">Drawing No</div>
            <div className="w-40 shrink-0">Maker <span className="text-destructive">*</span></div>
            <div className="w-32 shrink-0">In Use <span className="text-destructive">*</span></div>
            <div className="w-32 shrink-0">Current Stock</div>
            <div className="w-32 shrink-0">Min Qty <span className="text-destructive">*</span></div>
            <div className="w-32 shrink-0">Max Qty <span className="text-destructive">*</span></div>
            <div className="w-32 shrink-0">Order Qty <span className="text-destructive">*</span></div>
            <div className="w-64 shrink-0">Upload Document <span className="text-destructive">*</span></div>
          </div>
          
          <div className="border-x border-b rounded-b-lg overflow-x-auto min-w-full">
            <div className="flex items-center px-4 py-4 gap-4 whitespace-nowrap min-w-max">
              <div className="w-12 shrink-0 flex justify-center">
                <Button variant="outline" size="icon" className="size-8 text-destructive border-border">
                  <Trash2 className="size-4" />
                </Button>
              </div>
              <div className="w-48 shrink-0">
                <Input placeholder="Input application a..." className="h-10" />
              </div>
              <div className="w-48 shrink-0">
                <RadioGroup defaultValue="new" className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="new" id="r1" />
                    <Label htmlFor="r1" className="font-normal">New</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="master" id="r2" />
                    <Label htmlFor="r2" className="font-normal">Master</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="w-48 shrink-0">
                <Input placeholder="Input sparepart na..." className="h-10" />
              </div>
              <div className="w-48 shrink-0">
                <Input placeholder="Input specification" className="h-10" />
              </div>
              <div className="w-48 shrink-0">
                <Input placeholder="Input drawing" className="h-10" />
              </div>
              <div className="w-40 shrink-0">
                <Input placeholder="Input maker" className="h-10" />
              </div>
              <div className="w-32 shrink-0">
                <Input placeholder="ex. 2" className="h-10" />
              </div>
              <div className="w-32 shrink-0">
                <Input placeholder="ex. 2" className="h-10" />
              </div>
              <div className="w-32 shrink-0">
                <Input placeholder="ex. 2" className="h-10" />
              </div>
              <div className="w-32 shrink-0">
                <Input placeholder="ex. 2" className="h-10" />
              </div>
              <div className="w-32 shrink-0">
                <Input placeholder="ex. 2" className="h-10" />
              </div>
              <div className="w-64 shrink-0">
                <div className="flex">
                  <div className="flex items-center justify-center border border-r-0 border-border bg-slate-50 px-3 rounded-l-md text-muted-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                  </div>
                  <div className="flex-1 border-y border-border px-3 py-2 text-sm text-muted-foreground bg-white truncate">
                    No document selected
                  </div>
                  <Button variant="outline" className="rounded-l-none border-l-0 text-slate-700 bg-white">
                    Browse
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="px-4 pb-4 w-full">
              {/* Custom scrollbar track visual based on screenshot */}
              <div className="h-2 w-full bg-slate-200 rounded-full mt-2 relative overflow-hidden">
                <div className="absolute left-0 top-0 h-full w-1/3 bg-slate-500 rounded-full"></div>
              </div>
            </div>
          </div>
          
          <Button className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white mt-4">
            <Plus className="size-4 mr-2" /> Add New Item
          </Button>

        </div>
      </div>
    </div>
  );
}
