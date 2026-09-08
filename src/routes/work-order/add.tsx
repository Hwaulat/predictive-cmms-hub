import { useState } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Plus, Upload, Eye, Edit2, Trash2, ArrowLeft, Sparkles, AlertTriangle, CheckCircle2, PackagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PageHeader } from "@/components/ui-kit/page";

export const Route = createFileRoute("/work-order/add")({
  component: AddWorkOrderPage,
});

function AddWorkOrderPage() {
  const [woType, setWoType] = useState<"Machine" | "General">("Machine");
  const [damageDesc, setDamageDesc] = useState("The machine motor died and did not rotate, causing the production process to be delayed for up to 1 minute.");
  const [aiStatus, setAiStatus] = useState<"idle" | "analyzing" | "completed">("idle");
  const [allocatedParts, setAllocatedParts] = useState<string[]>([]);
  
  const navigate = useNavigate();

  const handleAnalyze = () => {
    setAiStatus("analyzing");
    setTimeout(() => {
      setAiStatus("completed");
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in-50 duration-500">
      <div className="flex items-center gap-4">
        <Button variant="outline" className="text-slate-700 bg-white" onClick={() => navigate({ to: "/work-order" })}>
          <ArrowLeft className="size-4 mr-2" /> Back
        </Button>
        <PageHeader title="Add New Work Order" description="Create a new maintenance request" />
      </div>

      <div className="bg-surface border border-border rounded-lg p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="doc-number">Document Number</Label>
          <Input id="doc-number" value="TCF2/Form/ME/01/01" disabled className="bg-muted" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-3 space-y-2">
            <Label>Work Order Type</Label>
            <div className="border border-border rounded-lg p-3">
              <RadioGroup
                value={woType}
                onValueChange={(val) => setWoType(val as "Machine" | "General")}
                className="flex items-center gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Machine" id="type-machine" />
                  <Label htmlFor="type-machine" className="font-normal cursor-pointer">Machine</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="General" id="type-general" />
                  <Label htmlFor="type-general" className="font-normal cursor-pointer">General</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="md:col-span-4 space-y-2">
            <Label htmlFor="item">Item</Label>
            <Input
              id="item"
              placeholder="Input item"
              value={woType === "General" ? "Item A" : ""}
              disabled={woType === "Machine"}
              className={woType === "Machine" ? "bg-muted" : ""}
            />
          </div>

          <div className="md:col-span-5 space-y-2">
            <Label htmlFor="machine">Machine</Label>
            <Select disabled={woType === "General"}>
              <SelectTrigger id="machine" className={woType === "General" ? "bg-muted" : ""}>
                <SelectValue placeholder="Choose machine code - name - line" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="crn-01">CRN-01 - Crane - Progressive Medium</SelectItem>
                <SelectItem value="crn-02">CRN-02 - Crane - Progressive Medium</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select disabled={woType === "Machine"}>
              <SelectTrigger id="department" className={woType === "Machine" ? "bg-muted" : ""}>
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dept-a">Department A</SelectItem>
                <SelectItem value="dept-b">Department B</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="area">Area</Label>
            <Select disabled={woType === "Machine"}>
              <SelectTrigger id="area" className={woType === "Machine" ? "bg-muted" : ""}>
                <SelectValue placeholder="Select Area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bldg-a">Building A</SelectItem>
                <SelectItem value="bldg-b">Building B</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="line">Line</Label>
            <Select disabled={woType === "Machine"}>
              <SelectTrigger id="line" className={woType === "Machine" ? "bg-muted" : ""}>
                <SelectValue placeholder="Select Line" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="prog-med">Progressive Medium</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="damage">Description Damage</Label>
          <Textarea
            id="damage"
            rows={4}
            value={damageDesc}
            onChange={(e) => setDamageDesc(e.target.value)}
          />
          
          {woType === "Machine" && (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Sparkles className="size-5 text-primary" />
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <h4 className="font-semibold text-primary">AI Diagnostic & Sparepart Recommendation</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Analyze the symptom description and equipment history to instantly predict required spareparts.
                    </p>
                  </div>
                  
                  {aiStatus === "idle" && (
                    <Button onClick={handleAnalyze} className="bg-[#2563eb] hover:bg-[#1d4ed8]">
                      Analyze Symptoms
                    </Button>
                  )}
                  
                  {aiStatus === "analyzing" && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="size-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      Scanning historical breakdowns & correlating symptoms...
                    </div>
                  )}

                  {aiStatus === "completed" && (
                    <div className="bg-white border rounded-md p-4 space-y-4">
                      <div className="text-sm">
                        Berdasarkan histori breakdown serupa pada equipment ini, sparepart yang kemungkinan dibutuhkan:
                      </div>
                      <div className="space-y-2">
                        {[
                          { name: "Bearing SKF-6205", stock: 4, outOfStock: false },
                          { name: "Seal Kit SK-220", stock: 2, outOfStock: false },
                          { name: "Gasket GX-15", stock: 0, outOfStock: true, leadTime: 5 }
                        ].map((part, idx) => {
                          const isAllocated = allocatedParts.includes(part.name);
                          return (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-md border border-border/50 bg-muted/20">
                              <div className="flex items-center gap-3">
                                {part.outOfStock ? (
                                  <AlertTriangle className="size-4 text-destructive" />
                                ) : (
                                  <CheckCircle2 className="size-4 text-success" />
                                )}
                                <div>
                                  <div className="font-semibold text-sm">{part.name}</div>
                                  <div className="text-xs text-muted-foreground mt-0.5">
                                    {part.outOfStock ? (
                                      <span className="text-destructive font-medium">STOK HABIS - lead time {part.leadTime} hari</span>
                                    ) : (
                                      <span>Tersedia: {part.stock} pcs</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <Button 
                                size="sm" 
                                variant={isAllocated ? "secondary" : "outline"}
                                className={isAllocated ? "text-success bg-success/10 hover:bg-success/20" : ""}
                                onClick={() => {
                                  if (isAllocated) {
                                    setAllocatedParts(prev => prev.filter(p => p !== part.name));
                                  } else {
                                    setAllocatedParts(prev => [...prev, part.name]);
                                  }
                                }}
                              >
                                {isAllocated ? "Allocated" : (
                                  <><PackagePlus className="size-3 mr-1.5" /> Allocate</>
                                )}
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex items-center gap-2 pt-2 border-t text-sm font-semibold text-muted-foreground">
                        <Sparkles className="size-4 text-primary" />
                        Tingkat kemiripan kasus: <span className="text-primary">78%</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label>Damage Photo (Max 3 Photo)</Label>
          <div className="border border-border rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted rounded">
                <Upload className="size-4 text-muted-foreground" />
              </div>
              <span className="text-sm font-medium">Damage-Picture-Machine-01.jpg</span>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" className="p-1 hover:bg-muted rounded text-muted-foreground transition-colors">
                <Eye className="size-4" />
              </button>
              <button type="button" className="p-1 hover:bg-muted rounded text-muted-foreground transition-colors">
                <Edit2 className="size-4" />
              </button>
              <button type="button" className="p-1 hover:bg-muted rounded text-destructive transition-colors">
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
          <Button variant="outline" className="mt-2 text-primary border-primary hover:bg-primary/5">
            <Plus className="size-4 mr-2" /> Add Damage Photo
          </Button>
        </div>

        <div className="pt-6 border-t border-border flex justify-end">
          <Button onClick={() => navigate({ to: "/work-order" })} className="px-8 bg-blue-600 hover:bg-blue-700">Submit</Button>
        </div>
      </div>
    </div>
  );
}
