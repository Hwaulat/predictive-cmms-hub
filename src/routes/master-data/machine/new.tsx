import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Calendar as CalendarIcon, Expand, Plus, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/master-data/machine/new")({
  head: () => ({
    meta: [{ title: "Add Machine/Equipment" }],
  }),
  component: AddMachinePage,
});

function AddMachinePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Add Machine/Equipment</h1>
        <Link to="/master-data/machine">
          <Button variant="outline" className="text-slate-700 bg-white">
            <ArrowLeft className="size-4 mr-2" /> Back
          </Button>
        </Link>
      </div>

      {/* Main Info Card */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Column: Image */}
          <div className="col-span-1">
            <div className="relative aspect-square rounded-lg border bg-slate-100 overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1565515266858-a53c15f4038a?q=80&w=600&auto=format&fit=crop" 
                alt="Machine" 
                className="w-full h-full object-cover"
              />
              <Button variant="secondary" size="icon" className="absolute bottom-3 right-3 h-8 w-8 rounded-full shadow-sm">
                <Expand className="size-4" />
              </Button>
            </div>
          </div>

          {/* Right Column: Fields */}
          <div className="col-span-1 lg:col-span-3 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Machine Code<span className="text-destructive">*</span></Label>
                <Input defaultValue="CRN-01" className="bg-white" />
              </div>
              <div className="space-y-2">
                <Label>Machine Name<span className="text-destructive">*</span></Label>
                <Input defaultValue="Crane" className="bg-white" />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>Department<span className="text-destructive">*</span></Label>
                <Select defaultValue="dept_a">
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dept_a">Department A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Area<span className="text-destructive">*</span></Label>
                <Select defaultValue="bldg_a">
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select Area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bldg_a">Building A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Line<span className="text-destructive">*</span></Label>
                <Select defaultValue="prog_med">
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select Line" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prog_med">Progresive Medium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <h3 className="font-bold text-sm">Photo</h3>
              <div className="space-y-2">
                <Label className="font-normal text-muted-foreground">Machine Photo</Label>
                <div className="flex border rounded-md bg-white overflow-hidden max-w-2xl h-10">
                  <Button variant="secondary" className="rounded-none border-0 border-r bg-slate-200/50 hover:bg-slate-200 px-4 h-full text-slate-700">
                    <Upload className="size-4 mr-2" /> Upload File
                  </Button>
                  <div className="px-3 flex items-center text-sm text-slate-600 flex-1">
                    Machine Picture.jpg
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Format JPG, PNG</p>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <h3 className="font-bold text-sm">Documents</h3>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label className="font-normal text-muted-foreground">Upload Manual Book File</Label>
                  <div className="flex border rounded-md bg-white overflow-hidden h-10">
                    <Button variant="secondary" className="rounded-none border-0 border-r bg-slate-200/50 hover:bg-slate-200 px-4 h-full text-slate-700">
                      <Upload className="size-4 mr-2" /> Upload File
                    </Button>
                    <div className="px-3 flex items-center text-sm text-slate-600 truncate flex-1">
                      Manual Book.pdf
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Format PDF</p>
                </div>
                
                <div className="space-y-2">
                  <Label className="font-normal text-muted-foreground">Upload SOP File</Label>
                  <div className="flex border rounded-md bg-white overflow-hidden h-10">
                    <Button variant="secondary" className="rounded-none border-0 border-r bg-slate-200/50 hover:bg-slate-200 px-4 h-full text-slate-700">
                      <Upload className="size-4 mr-2" /> Upload File
                    </Button>
                    <div className="px-3 flex items-center text-sm text-slate-600 truncate flex-1">
                      SOP.pdf
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Format PDF</p>
                </div>
                
                <div className="space-y-2">
                  <Label className="font-normal text-muted-foreground">Datasheet or other</Label>
                  <div className="flex border rounded-md bg-white overflow-hidden h-10">
                    <Button variant="secondary" className="rounded-none border-0 border-r bg-slate-200/50 hover:bg-slate-200 px-4 h-full text-slate-700">
                      <Upload className="size-4 mr-2" /> Upload File
                    </Button>
                    <div className="px-3 flex items-center text-sm text-slate-600 truncate flex-1">
                      Datasheet.pdf
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Format PDF</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="machine" className="w-full">
        <TabsList className="bg-white border rounded-t-lg h-auto p-0 flex max-w-max border-b-0 overflow-hidden relative top-[1px]">
          <TabsTrigger value="machine" className="data-[state=active]:bg-white data-[state=active]:border-b-0 border border-transparent data-[state=active]:border-border data-[state=active]:border-t-primary data-[state=active]:border-t-2 rounded-none px-6 py-2.5 text-sm font-semibold">
            Machine/Equipment
          </TabsTrigger>
          <TabsTrigger value="spare" className="data-[state=active]:bg-white data-[state=active]:border-b-0 border border-transparent data-[state=active]:border-border data-[state=active]:border-t-primary data-[state=active]:border-t-2 rounded-none px-6 py-2.5 text-sm font-semibold bg-slate-50/50">
            Spare Part
          </TabsTrigger>
        </TabsList>

        <div className="bg-white border rounded-lg rounded-tl-none shadow-sm p-6">
          <TabsContent value="machine" className="mt-0 outline-none">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Add Machine/Equipment Information</h2>
            
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6 max-w-4xl">
              <div className="space-y-2">
                <Label>Machine item</Label>
                <Input defaultValue="Injection" className="bg-white h-11" />
              </div>
              <div className="space-y-2">
                <Label>Brand</Label>
                <Input defaultValue="Haitan" className="bg-white h-11" />
              </div>
              
              <div className="space-y-2">
                <Label>Type/Model</Label>
                <Input defaultValue="MA 200011" className="bg-white h-11" />
              </div>
              <div className="space-y-2">
                <Label>Serial Number</Label>
                <Input defaultValue="201307020031893" className="bg-white h-11" />
              </div>
              
              <div className="space-y-2">
                <Label>Manufacturing Date</Label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
                  <Input defaultValue="04/06/a2013" className="pl-9 bg-white h-11" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Fix Asset</Label>
                <Input defaultValue="MW001043" className="bg-white h-11" />
              </div>
            </div>

            <div className="flex justify-end mt-10">
              <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 h-10 rounded-md font-semibold">
                Save
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="spare" className="mt-0 outline-none">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Add Spare Part</h2>
            
            <div className="border rounded-lg overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-white">
                  <tr className="border-b text-left text-slate-500 font-semibold text-xs uppercase tracking-wider">
                    <th className="py-4 px-4 w-12">No</th>
                    <th className="py-4 px-4 w-[400px]">Part</th>
                    <th className="py-4 px-4">Category</th>
                    <th className="py-4 px-4 w-16"></th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-4 px-4 font-medium">1</td>
                    <td className="py-4 px-4">
                      <Select defaultValue="filter">
                        <SelectTrigger className="bg-white h-10 w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="filter">0834 - Origin Air Filter</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="py-4 px-4">
                      <Input defaultValue="Mechanical" readOnly className="bg-slate-200/60 h-10 text-slate-600 focus-visible:ring-0 focus-visible:ring-offset-0 border-transparent shadow-none" />
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Button variant="destructive" size="icon" className="size-9 shrink-0">
                        <Trash2 className="size-4" />
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-4">
              <Button variant="outline" className="text-[#2563eb] border-[#2563eb] bg-white hover:bg-blue-50 font-semibold h-10">
                <Plus className="size-4 mr-2" /> Add Spare Part
              </Button>
            </div>

            <div className="flex justify-end mt-10">
              <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 h-10 rounded-md font-semibold">
                Save
              </Button>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
