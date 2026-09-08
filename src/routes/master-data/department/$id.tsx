import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { departments } from "@/lib/mock-data";

export const Route = createFileRoute("/master-data/department/$id")({
  component: EditDepartment,
});

function EditDepartment() {
  const navigate = useNavigate();
  const { id } = Route.useParams();
  
  // Find department or use default
  const dept = departments.find(d => d.id === id) || departments[0] || {
    id: "1",
    name: "General",
    type: "Production",
    areas: [{ name: "Area 1", lines: ["Line 1"] }]
  };

  // Initialize state from mock data
  const [name, setName] = useState(dept.name);
  const [type, setType] = useState(dept.type.toLowerCase());
  
  // Transform mock areas into a manageable state structure with unique IDs
  const initialAreas = dept.areas.map((a, i) => ({
    id: i + 1,
    name: a.name,
    lines: a.lines.map((l, j) => ({ id: j + 1, name: l }))
  }));
  
  const [areas, setAreas] = useState(initialAreas.length > 0 ? initialAreas : [{ id: 1, name: "", lines: [{ id: 1, name: "" }] }]);

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
    <div className="space-y-6 pb-20 animate-in fade-in-50 duration-500 w-full">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate({ to: "/master-data/department" })}>
            <ArrowLeft className="size-4 mr-1" /> Back
          </Button>
          <h2 className="text-xl font-bold">Edit Department</h2>
        </div>
        <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8">
          Update
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
              <Input 
                value={name} 
                onChange={e => setName(e.target.value)} 
                placeholder="Department A" 
                className="mt-8" 
              />
            </div>

            {/* Column 2: Type */}
            <div className="col-span-3">
              <div className="border rounded-xl p-4 mt-8">
                <RadioGroup value={type} onValueChange={setType} className="space-y-3">
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
                  {index > 0 && <div className="absolute -top-4 left-0 right-0 border-t border-dashed border-slate-300"></div>}
                  <div className="grid grid-cols-2 gap-6">
                    {/* Area Input */}
                    <div className="flex items-start gap-2 pt-2">
                      <Input 
                        value={area.name} 
                        onChange={e => {
                          const newName = e.target.value;
                          setAreas(areas.map(a => a.id === area.id ? { ...a, name: newName } : a));
                        }}
                        placeholder="Building A" 
                        className="flex-1" 
                      />
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
                          <Input 
                            value={line.name} 
                            onChange={e => {
                              const newName = e.target.value;
                              setAreas(areas.map(a => a.id === area.id ? { ...a, lines: a.lines.map(l => l.id === line.id ? { ...l, name: newName } : l) } : a));
                            }}
                            placeholder="Progressive Medium" 
                            className="flex-1" 
                          />
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
