import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/master-data/sparepart/warehouse/new")({
  head: () => ({
    meta: [{ title: "Add Location" }],
  }),
  component: () => <WarehouseFormPage mode="create" />,
});

export function WarehouseFormPage({ mode }: { mode: "create" | "edit" }) {
  const isEdit = mode === "edit";

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <Link to="/master-data/sparepart">
            <Button variant="outline" className="text-slate-700 bg-white">
              <ArrowLeft className="size-4 mr-2" /> Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-slate-800">{isEdit ? "Edit Location" : "Add Location"}</h1>
        </div>
        <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 h-10 rounded-md font-semibold">
          {isEdit ? "Update" : "Save"}
        </Button>
      </div>

      <div className="bg-white rounded-xl border shadow-sm p-6 space-y-6 w-full">
        <div className="space-y-2">
          <Label className="text-slate-600 font-medium">Department</Label>
          <Select defaultValue="dept_a">
            <SelectTrigger className="bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dept_a">Department A</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label className="text-slate-600 font-medium">Area</Label>
          <Select defaultValue="bldg_a">
            <SelectTrigger className="bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bldg_a">Building A</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label className="text-slate-600 font-medium">Location</Label>
          <Input defaultValue="A01" className="bg-white" />
        </div>

      </div>
    </div>
  );
}
