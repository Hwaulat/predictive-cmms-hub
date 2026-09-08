import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, AlertTriangle, CheckCircle2, Wrench, Search, ArrowRight } from "lucide-react";
import { PageHeader, Panel } from "@/components/ui-kit/page";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/ai/breakdown-sparepart")({
  component: AIBreakdownDiagnosticPage,
});

function AIBreakdownDiagnosticPage() {
  const [machine, setMachine] = useState("");
  const [damageDesc, setDamageDesc] = useState("The machine motor died and did not rotate, causing the production process to be delayed for up to 1 minute.");
  const [aiStatus, setAiStatus] = useState<"idle" | "analyzing" | "completed">("idle");
  const [allocatedParts, setAllocatedParts] = useState<string[]>([]);

  const handleAnalyze = () => {
    if (!machine) {
      alert("Please select a machine first");
      return;
    }
    setAiStatus("analyzing");
    setTimeout(() => {
      setAiStatus("completed");
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in-50 duration-500">
      <PageHeader
        title="AI Diagnostic Assistant"
        description="Simulator fitur reaktif AI untuk menganalisis gejala kerusakan dan memberikan rekomendasi sparepart secara instan."
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Side: Input Panel */}
        <div className="md:col-span-5 h-full">
          <Panel title="Input Gejala & Mesin" description="Masukkan parameter kerusakan untuk dianalisis." className="h-full flex flex-col">
            <div className="space-y-4 mt-4 flex-1 flex flex-col">
              <div className="space-y-2">
                <Label>Machine / Equipment</Label>
                <Select value={machine} onValueChange={setMachine}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select machine..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CRN-01">CRN-01 - Crane - Progressive Medium</SelectItem>
                    <SelectItem value="MCH-01">MCH-01 - CNC Machining (Makino)</SelectItem>
                    <SelectItem value="MCH-02">MCH-02 - Hydraulic Press (Komatsu)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Description Damage (Gejala)</Label>
                <Textarea
                  rows={5}
                  value={damageDesc}
                  onChange={(e) => setDamageDesc(e.target.value)}
                  className="bg-white resize-none"
                />
              </div>

              <Button 
                onClick={handleAnalyze} 
                className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] mt-2"
                disabled={aiStatus === "analyzing"}
              >
                {aiStatus === "analyzing" ? (
                  <>
                    <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Analyzing Symptoms...
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4 mr-2" />
                    Analyze with AI
                  </>
                )}
              </Button>

              <div className="pt-4 border-t mt-auto text-xs text-muted-foreground flex items-start gap-2">
                <InfoIcon className="size-4 shrink-0 mt-0.5 text-primary" />
                <p>
                  <strong>Catatan:</strong> Pada implementasi nyatanya, fitur diagnostik cerdas ini otomatis tertanam dan reaktif saat teknisi membuat <strong>Work Order Corrective</strong> di lapangan.
                </p>
              </div>
            </div>
          </Panel>
        </div>

        {/* Right Side: AI Output Panel */}
        <div className="md:col-span-7">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 h-full relative overflow-hidden flex flex-col">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Sparkles className="size-40 text-primary" />
            </div>

            <div className="relative z-10 flex-1 flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 p-2.5 rounded-full">
                  <Sparkles className="size-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-primary text-lg">AI Recommendations</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Hasil korelasi historis breakdown dan pola gejala.
                  </p>
                </div>
              </div>

              {aiStatus === "idle" && (
                <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground/60 border-2 border-dashed border-primary/20 rounded-lg p-8">
                  <Search className="size-12 mb-4 opacity-20" />
                  <p>Isi parameter mesin dan gejala di panel kiri,<br />lalu klik <strong>Analyze with AI</strong> untuk melihat rekomendasi part.</p>
                </div>
              )}

              {aiStatus === "analyzing" && (
                <div className="flex-1 flex flex-col items-center justify-center text-center text-primary border-2 border-dashed border-primary/20 rounded-lg p-8">
                  <div className="size-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
                  <p className="font-medium animate-pulse">Scanning historical breakdowns & correlating symptoms...</p>
                </div>
              )}

              {aiStatus === "completed" && (
                <div className="bg-white border rounded-lg p-5 shadow-sm space-y-5 flex-1">
                  <div className="text-sm leading-relaxed text-foreground/90">
                    Berdasarkan histori breakdown serupa pada equipment ini, sparepart yang kemungkinan besar dibutuhkan:
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { name: "Bearing SKF-6205", stock: 4, outOfStock: false },
                      { name: "Seal Kit SK-220", stock: 2, outOfStock: false },
                      { name: "Gasket GX-15", stock: 0, outOfStock: true, leadTime: 5 }
                    ].map((part, idx) => {
                      const isAllocated = allocatedParts.includes(part.name);
                      return (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-lg border bg-muted/10 hover:bg-muted/30 transition-colors">
                          <div className="flex items-center gap-3">
                            {part.outOfStock ? (
                              <div className="bg-destructive/10 p-1.5 rounded-full">
                                <AlertTriangle className="size-4 text-destructive" />
                              </div>
                            ) : (
                              <div className="bg-success/10 p-1.5 rounded-full">
                                <CheckCircle2 className="size-4 text-success" />
                              </div>
                            )}
                            <div>
                              <div className="font-semibold text-sm">{part.name}</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {part.outOfStock ? (
                                  <span className="text-destructive font-semibold">STOK HABIS - lead time {part.leadTime} hari</span>
                                ) : (
                                  <span>Tersedia: {part.stock} pcs</span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <Button 
                            size="sm" 
                            variant={isAllocated ? "secondary" : "outline"}
                            className={isAllocated ? "text-success bg-success/10 hover:bg-success/20 border-transparent" : "bg-white"}
                            onClick={() => {
                              if (isAllocated) {
                                setAllocatedParts(prev => prev.filter(p => p !== part.name));
                              } else {
                                setAllocatedParts(prev => [...prev, part.name]);
                              }
                            }}
                          >
                            {isAllocated ? "Selected" : "Select Part"}
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="flex items-center gap-2 pt-4 border-t text-sm font-semibold text-muted-foreground">
                    <Sparkles className="size-4 text-primary" />
                    Tingkat kemiripan kasus: <span className="text-primary text-base">78%</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function InfoIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}
