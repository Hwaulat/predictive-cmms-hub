import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const Route = createFileRoute("/master-data/department/new")({
  component: AddDepartment,
});

function AddDepartment() {
  const navigate = useNavigate();
  const [areas, setAreas] = useState([
    { id: 1, name: "", lines: [{ id: 1, name: "" }] }
  ]);

  const addArea = () => {
    setAreas([...areas, { id: Date.now(), name: "", lines: [{ id: Date.now() + 1, name: "" }] }]);
  };

  const removeArea = (areaId: number) => {
    setAreas(areas.filter(a => a.id !== areaId));
  };

  const addLine = (areaId: number) => {
    setAreas(areas.map(a => {
      if (a.id === areaId) {
        return { ...a, lines: [...a.lines, { id: Date.now(), name: "" }] };
      }
      return a;
    }));
  };

  const removeLine = (areaId: number, lineId: number) => {
    setAreas(areas.map(a => {
      if (a.id === areaId) {
        return { ...a, lines: a.lines.filter(l => l.id !== lineId) };
      }
      return a;
    }));
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in-50 duration-500 max-w-5xl">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate({ to: "/master-data/department" })}>
            <ArrowLeft className="size-4 mr-1" /> Back
          </Button>
          <h2 className="text-xl font-bold">Add Department</h2>
        </div>
        <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8">
          Submit
        </Button>
      </div>

      <div className="bg-white rounded-xl border shadow-sm flex flex-col min-h-[500px]">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-6 p-4 border-b text-sm font-semibold text-slate-500">
          <div className="col-span-3">Department</div>
          <div className="col-span-3">Type</div>
          <div className="col-span-3">Area</div>
          <div className="col-span-3">Line</div>
        </div>

        {/* Form Body */}
        <div className="p-4 flex-1">
          <div className="grid grid-cols-12 gap-6 relative">
            
            {/* Column 1: Department Name */}
            <div className="col-span-3">
              <Input placeholder="Department A" className="mt-8" />
            </div>

            {/* Column 2: Type */}
            <div className="col-span-3">
              <div className="border rounded-xl p-4 mt-8">
                <RadioGroup defaultValue="production" className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="production" id="t-prod" />
                    <Label htmlFor="t-prod" className="font-normal cursor-pointer text-slate-700">Production</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="maintenance" id="t-maint" />
                    <Label htmlFor="t-maint" className="font-normal cursor-pointer text-slate-700">Maintenance</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="warehouse" id="t-ware" />
                    <Label htmlFor="t-ware" className="font-normal cursor-pointer text-slate-700">Warehouse</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="other" id="t-other" />
                    <Label htmlFor="t-other" className="font-normal cursor-pointer text-slate-700">Other</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Column 3 & 4: Areas and Lines */}
            <div className="col-span-6 space-y-8 mt-8">
              {areas.map((area, index) => (
                <div key={area.id} className="relative">
                  {index > 0 && <div className="absolute -top-4 left-0 right-0 border-t border-dashed"></div>}
                  <div className="grid grid-cols-2 gap-6">
                    {/* Area Input */}
                    <div className="flex items-start gap-2 pt-2">
                      <Input placeholder="Building A" className="flex-1" />
                      <Button 
                        variant="destructive" 
                        size="icon" 
                        className="shrink-0 size-10 rounded-lg bg-red-500 hover:bg-red-600"
                        onClick={() => removeArea(area.id)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>

                    {/* Lines Inputs */}
                    <div className="space-y-3">
                      {area.lines.map(line => (
                        <div key={line.id} className="flex items-center gap-2">
                          <Input placeholder="Progressive Medium" className="flex-1" />
                          <Button 
                            variant="destructive" 
                            size="icon" 
                            className="shrink-0 size-10 rounded-lg bg-red-500 hover:bg-red-600"
                            onClick={() => removeLine(area.id, line.id)}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      ))}
                      <Button 
                        variant="outline" 
                        className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                        onClick={() => addLine(area.id)}
                      >
                        <Plus className="size-4 mr-2" /> Add New Line
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Bottom Action */}
        <div className="p-4 border-t">
          <Button 
            className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
            onClick={addArea}
          >
            <Plus className="size-4 mr-2" /> Add Area
          </Button>
        </div>
      </div>
    </div>
  );
}
