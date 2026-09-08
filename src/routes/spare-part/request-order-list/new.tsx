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

        {/* List Sparepart Table */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg">List Sparepart</h3>
          
          <div className="border rounded-lg overflow-x-auto w-full bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-100 border-b text-xs font-bold text-slate-500 uppercase tracking-wider text-left">
                  <th className="py-3 px-4 w-12 text-left">Action</th>
                  <th className="py-3 px-4 min-w-[180px]">Application Area <span className="text-destructive">*</span></th>
                  <th className="py-3 px-4 min-w-[180px]">Choose Item <span className="text-destructive">*</span></th>
                  <th className="py-3 px-4 min-w-[200px]">Item Name <span className="text-destructive">*</span></th>
                  <th className="py-3 px-4 min-w-[180px]">Specification <span className="text-destructive">*</span></th>
                  <th className="py-3 px-4 min-w-[160px]">Drawing No</th>
                  <th className="py-3 px-4 min-w-[160px]">Maker <span className="text-destructive">*</span></th>
                  <th className="py-3 px-4 min-w-[110px]">In Use <span className="text-destructive">*</span></th>
                  <th className="py-3 px-4 min-w-[110px]">Current Stock</th>
                  <th className="py-3 px-4 min-w-[110px]">Min Qty <span className="text-destructive">*</span></th>
                  <th className="py-3 px-4 min-w-[110px]">Max Qty <span className="text-destructive">*</span></th>
                  <th className="py-3 px-4 min-w-[110px]">Order Qty <span className="text-destructive">*</span></th>
                  <th className="py-3 px-4 min-w-[260px]">Upload Document <span className="text-destructive">*</span></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-3 px-4 text-center">
                    <Button variant="outline" size="icon" className="size-8 text-destructive hover:bg-destructive/10 border-border">
                      <Trash2 className="size-4" />
                    </Button>
                  </td>
                  <td className="py-3 px-4">
                    <Input placeholder="Input application a..." className="h-10 bg-white" />
                  </td>
                  <td className="py-3 px-4">
                    <RadioGroup defaultValue="new" className="flex items-center gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="new" id="r1" />
                        <Label htmlFor="r1" className="font-normal cursor-pointer">New</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="master" id="r2" />
                        <Label htmlFor="r2" className="font-normal cursor-pointer">Master</Label>
                      </div>
                    </RadioGroup>
                  </td>
                  <td className="py-3 px-4">
                    <Input placeholder="Input sparepart na..." className="h-10 bg-white" />
                  </td>
                  <td className="py-3 px-4">
                    <Input placeholder="Input specification" className="h-10 bg-white" />
                  </td>
                  <td className="py-3 px-4">
                    <Input placeholder="Input drawing" className="h-10 bg-white" />
                  </td>
                  <td className="py-3 px-4">
                    <Input placeholder="Input maker" className="h-10 bg-white" />
                  </td>
                  <td className="py-3 px-4">
                    <Input placeholder="ex. 2" className="h-10 bg-white" />
                  </td>
                  <td className="py-3 px-4">
                    <Input placeholder="ex. 2" className="h-10 bg-white" />
                  </td>
                  <td className="py-3 px-4">
                    <Input placeholder="ex. 2" className="h-10 bg-white" />
                  </td>
                  <td className="py-3 px-4">
                    <Input placeholder="ex. 2" className="h-10 bg-white" />
                  </td>
                  <td className="py-3 px-4">
                    <Input placeholder="ex. 2" className="h-10 bg-white" />
                  </td>
                  <td className="py-3 px-4">
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
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <Button className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white mt-4">
            <Plus className="size-4 mr-2" /> Add New Item
          </Button>
        </div>
      </div>
    </div>
  );
}
