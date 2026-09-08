import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, AlertTriangle, TrendingDown, TrendingUp, Info, Activity, AlertCircle, ArrowRight, Users } from "lucide-react";
import { PageHeader, Panel } from "@/components/ui-kit/page";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart,
  ComposedChart
} from "recharts";
import { 
  aiKpiForecast, 
  aiKpiAnomalies, 
  aiKpiRecommendations,
  aiManpowerForecast,
  aiManpowerAnomalies,
  aiManpowerRecommendations
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ai/kpi")({
  component: AIKpiDashboard,
});

function AIKpiDashboard() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-20 animate-in fade-in-50 duration-500">
      <PageHeader
        title="AI for KPI"
        description="Analisis prediktif, deteksi anomali, dan wawasan operasional berbasis AI di atas KPI standar."
      />

      <Tabs defaultValue="machine" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md h-12 bg-white border shadow-sm mb-6">
          <TabsTrigger value="machine" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:font-bold text-muted-foreground h-full">
            <Activity className="size-4 mr-2" />
            Machine & Production
          </TabsTrigger>
          <TabsTrigger value="manpower" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:font-bold text-muted-foreground h-full">
            <Users className="size-4 mr-2" />
            Manpower & Resource
          </TabsTrigger>
        </TabsList>

        <TabsContent value="machine" className="space-y-6 outline-none focus:outline-none">
          <MachineKpiTab />
        </TabsContent>

        <TabsContent value="manpower" className="space-y-6 outline-none focus:outline-none">
          <ManpowerKpiTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function MachineKpiTab() {
  const [department, setDepartment] = useState("ALL");
  const [machine, setMachine] = useState("ALL");
  const [shift, setShift] = useState("ALL");
  const [forecastMetric, setForecastMetric] = useState<"mtbf" | "oee" | "mttr">("mtbf");

  const getMetricColor = (metric: string) => {
    switch (metric) {
      case "mtbf": return "#10b981"; // success
      case "oee": return "#3b82f6"; // primary
      case "mttr": return "#f59e0b"; // warning
      default: return "#64748b";
    }
  };

  const getMetricName = (metric: string) => {
    switch (metric) {
      case "mtbf": return "MTBF (Hours)";
      case "oee": return "OEE (%)";
      case "mttr": return "MTTR (Hours)";
      default: return "";
    }
  };

  return (
    <>
      {/* Global Filters */}
      <div className="bg-white p-4 rounded-xl border border-border/50 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mr-4">
          <Activity className="size-4" />
          Filter Data:
        </div>
        <Select value={department} onValueChange={setDepartment}>
          <SelectTrigger className="w-[180px] bg-muted/20 border-border/50">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Departments</SelectItem>
            <SelectItem value="MTC">Maintenance</SelectItem>
            <SelectItem value="PRD">Production</SelectItem>
          </SelectContent>
        </Select>

        <Select value={machine} onValueChange={setMachine}>
          <SelectTrigger className="w-[180px] bg-muted/20 border-border/50">
            <SelectValue placeholder="Machine" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Machines</SelectItem>
            <SelectItem value="EQ-001">Boiler 01</SelectItem>
            <SelectItem value="EQ-014">Compressor A</SelectItem>
            <SelectItem value="EQ-022">Conveyor L2</SelectItem>
          </SelectContent>
        </Select>

        <Select value={shift} onValueChange={setShift}>
          <SelectTrigger className="w-[180px] bg-muted/20 border-border/50">
            <SelectValue placeholder="Shift" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Shifts</SelectItem>
            <SelectItem value="1">Shift 1</SelectItem>
            <SelectItem value="2">Shift 2</SelectItem>
            <SelectItem value="3">Shift 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Narrative Panel */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Sparkles className="size-32 text-primary" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="size-5 text-primary" />
            <h2 className="font-semibold text-primary text-lg">AI Executive Summary (Machine)</h2>
          </div>
          <p className="text-foreground/90 leading-relaxed text-sm max-w-4xl">
            <strong>Ringkasan Bulan Ini: </strong>
            MTTR bulan ini membaik 8% dibanding bulan lalu, didorong terutama oleh perbaikan lebih cepat di Line 2. 
            Namun, MTBF Line 3 memburuk 15%, kemungkinan terkait 2 breakdown berturutan pada equipment yang sama (Mesin M-3).
            Secara keseluruhan OEE stabil di angka 89%, namun diproyeksikan akan ada tantangan di bulan depan jika isu pada Line 3 tidak segera dimitigasi.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Anomalies & Recommendations */}
        <div className="lg:col-span-1 space-y-6">
          <Panel title="Anomaly Detection" description="Deteksi penyimpangan di luar pola normal.">
            <div className="space-y-4 mt-4">
              {aiKpiAnomalies.map((anom, i) => (
                <div key={i} className={cn(
                  "p-3 rounded-lg border",
                  anom.severity === "high" ? "bg-destructive/5 border-destructive/20 text-foreground" : "bg-warning/10 border-warning/20 text-foreground"
                )}>
                  <div className="flex items-start gap-3">
                    {anom.severity === "high" ? <AlertTriangle className="size-5 shrink-0 text-destructive mt-0.5" /> : <AlertCircle className="size-5 shrink-0 text-warning mt-0.5" />}
                    <div>
                      <div className="font-semibold text-sm flex items-center gap-1.5">
                        {anom.metric} {anom.type}
                      </div>
                      <p className="text-xs mt-1.5 leading-relaxed opacity-90">{anom.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Recommended Actions" description="Saran perbaikan berbasis AI.">
            <div className="space-y-4 mt-4">
              {aiKpiRecommendations.map((rec, i) => (
                <div key={i} className="p-3 rounded-lg border border-border/60 bg-muted/10 group hover:bg-muted/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-1.5 rounded-full text-primary shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Sparkles className="size-3.5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{rec.action}</h4>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{rec.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* Right Column: Forecast Chart */}
        <div className="lg:col-span-2">
          <Panel 
            title="KPI Forecast" 
            description="Proyeksi tren ke depan berdasarkan pola historis."
            actions={
              <Select value={forecastMetric} onValueChange={(val: any) => setForecastMetric(val)}>
                <SelectTrigger className="w-[150px] h-8 bg-white text-xs">
                  <SelectValue placeholder="Metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oee">OEE (%)</SelectItem>
                  <SelectItem value="mtbf">MTBF (Hours)</SelectItem>
                  <SelectItem value="mttr">MTTR (Hours)</SelectItem>
                </SelectContent>
              </Select>
            }
            className="h-full"
          >
            <div className="h-[450px] mt-6 relative">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={aiKpiForecast}>
                  <defs>
                    <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={getMetricColor(forecastMetric)} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={getMetricColor(forecastMetric)} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                  <XAxis dataKey="month" fontSize={12} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} />
                  <YAxis fontSize={12} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} domain={['auto', 'auto']} />
                  
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid var(--color-border)' }}
                    labelStyle={{ fontWeight: 'bold', color: 'var(--color-foreground)' }}
                  />
                  
                  {/* Historical Line */}
                  <Line 
                    type="monotone" 
                    dataKey={(data) => data.predicted ? null : data[forecastMetric]} 
                    name={`Actual ${getMetricName(forecastMetric)}`}
                    stroke={getMetricColor(forecastMetric)} 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: getMetricColor(forecastMetric) }} 
                  />
                  
                  {/* Forecast Line */}
                  <Line 
                    type="monotone" 
                    dataKey={(data) => {
                      const prevIdx = aiKpiForecast.indexOf(data) - 1;
                      if (!data.predicted && prevIdx >= 0 && aiKpiForecast[prevIdx + 1].predicted) {
                        return data[forecastMetric];
                      }
                      return data.predicted ? data[forecastMetric] : null;
                    }} 
                    name={`Predicted ${getMetricName(forecastMetric)}`}
                    stroke={getMetricColor(forecastMetric)} 
                    strokeWidth={3} 
                    strokeDasharray="5 5"
                    dot={{ r: 4, fill: getMetricColor(forecastMetric), strokeDasharray: "0" }} 
                  />
                  
                  {/* Background for forecasted area */}
                  <Area 
                    type="monotone" 
                    dataKey={(data) => data.predicted ? data[forecastMetric] : null} 
                    fill="url(#colorPredicted)" 
                    stroke="none" 
                  />

                  <ReferenceLine x="Jun" stroke="var(--color-muted-foreground)" strokeDasharray="3 3" label={{ position: 'top', value: 'Forecast Starts', fill: 'var(--color-muted-foreground)', fontSize: 10 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 p-4 bg-muted/20 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-3 rounded-full" style={{ backgroundColor: getMetricColor(forecastMetric) }} />
                <span className="text-sm font-semibold">{getMetricName(forecastMetric)} Forecast</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Confidence level: <span className="font-bold text-foreground">87%</span>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </>
  );
}


function ManpowerKpiTab() {
  const [department, setDepartment] = useState("ALL");
  const [technician, setTechnician] = useState("ALL");
  const [shift, setShift] = useState("ALL");
  const [forecastMetric, setForecastMetric] = useState<"capacity" | "avgTime" | "ftf">("ftf");

  const getMetricColor = (metric: string) => {
    switch (metric) {
      case "capacity": return "#8b5cf6"; // purple
      case "avgTime": return "#f97316"; // orange
      case "ftf": return "#14b8a6"; // teal
      default: return "#64748b";
    }
  };

  const getMetricName = (metric: string) => {
    switch (metric) {
      case "capacity": return "Capacity (%)";
      case "avgTime": return "Avg Completion (Hrs)";
      case "ftf": return "First-Time Fix Rate (%)";
      default: return "";
    }
  };

  return (
    <>
      {/* Global Filters */}
      <div className="bg-white p-4 rounded-xl border border-border/50 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mr-4">
          <Users className="size-4" />
          Filter Manpower:
        </div>
        <Select value={department} onValueChange={setDepartment}>
          <SelectTrigger className="w-[180px] bg-muted/20 border-border/50">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Departments</SelectItem>
            <SelectItem value="MTC">Maintenance</SelectItem>
            <SelectItem value="PRD">Production</SelectItem>
          </SelectContent>
        </Select>

        <Select value={technician} onValueChange={setTechnician}>
          <SelectTrigger className="w-[180px] bg-muted/20 border-border/50">
            <SelectValue placeholder="Technician" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Technicians</SelectItem>
            <SelectItem value="andi">Andi P.</SelectItem>
            <SelectItem value="budi">Budi S.</SelectItem>
            <SelectItem value="cahyo">Cahyo N.</SelectItem>
            <SelectItem value="dedi">Dedi K.</SelectItem>
          </SelectContent>
        </Select>

        <Select value={shift} onValueChange={setShift}>
          <SelectTrigger className="w-[180px] bg-muted/20 border-border/50">
            <SelectValue placeholder="Shift" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Shifts</SelectItem>
            <SelectItem value="1">Shift 1</SelectItem>
            <SelectItem value="2">Shift 2</SelectItem>
            <SelectItem value="3">Shift 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Narrative Panel */}
      <div className="bg-violet-500/5 border border-violet-500/20 rounded-xl p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Sparkles className="size-32 text-violet-500" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="size-5 text-violet-600" />
            <h2 className="font-semibold text-violet-700 text-lg">AI Executive Summary (Manpower)</h2>
          </div>
          <p className="text-foreground/90 leading-relaxed text-sm max-w-4xl">
            <strong>Ringkasan Tenaga Kerja: </strong>
            Kapasitas tim mekanik berada di ambang batas 92%, berisiko menyebabkan burnout dan penurunan kualitas. 
            Budi S. tercatat memegang rekor *First-Time Fix Rate* tertinggi (95%) namun beban kerjanya tidak proporsional dibandingkan mekanik lain.
            Tanpa intervensi silang-pelatihan (*cross-training*), diproyeksikan rasio FTF akan turun menembus batas 80% dalam 2 bulan ke depan akibat kelelahan kumulatif.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Anomalies & Recommendations */}
        <div className="lg:col-span-1 space-y-6">
          <Panel title="Manpower Anomalies" description="Deteksi isu beban kerja dan performa tim.">
            <div className="space-y-4 mt-4">
              {aiManpowerAnomalies.map((anom, i) => (
                <div key={i} className={cn(
                  "p-3 rounded-lg border",
                  anom.severity === "high" ? "bg-destructive/5 border-destructive/20 text-foreground" : "bg-warning/10 border-warning/20 text-foreground"
                )}>
                  <div className="flex items-start gap-3">
                    {anom.severity === "high" ? <AlertTriangle className="size-5 shrink-0 text-destructive mt-0.5" /> : <AlertCircle className="size-5 shrink-0 text-warning mt-0.5" />}
                    <div>
                      <div className="font-semibold text-sm flex items-center gap-1.5">
                        {anom.metric} {anom.type}
                      </div>
                      <p className="text-xs mt-1.5 leading-relaxed opacity-90">{anom.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="HR & Ops Recommendations" description="Saran operasional berbasis AI.">
            <div className="space-y-4 mt-4">
              {aiManpowerRecommendations.map((rec, i) => (
                <div key={i} className="p-3 rounded-lg border border-border/60 bg-muted/10 group hover:bg-muted/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="bg-violet-500/10 p-1.5 rounded-full text-violet-600 shrink-0 mt-0.5 group-hover:bg-violet-500 group-hover:text-white transition-colors">
                      <Sparkles className="size-3.5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{rec.action}</h4>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{rec.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* Right Column: Forecast Chart */}
        <div className="lg:col-span-2">
          <Panel 
            title="Manpower KPI Forecast" 
            description="Proyeksi tren kapasitas & kualitas kerja teknisi."
            actions={
              <Select value={forecastMetric} onValueChange={(val: any) => setForecastMetric(val)}>
                <SelectTrigger className="w-[180px] h-8 bg-white text-xs">
                  <SelectValue placeholder="Metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ftf">First-Time Fix Rate (%)</SelectItem>
                  <SelectItem value="capacity">Team Capacity (%)</SelectItem>
                  <SelectItem value="avgTime">Avg Completion (Hrs)</SelectItem>
                </SelectContent>
              </Select>
            }
            className="h-full"
          >
            <div className="h-[450px] mt-6 relative">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={aiManpowerForecast}>
                  <defs>
                    <linearGradient id="colorPredictedManpower" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={getMetricColor(forecastMetric)} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={getMetricColor(forecastMetric)} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                  <XAxis dataKey="month" fontSize={12} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} />
                  <YAxis fontSize={12} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} domain={['auto', 'auto']} />
                  
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid var(--color-border)' }}
                    labelStyle={{ fontWeight: 'bold', color: 'var(--color-foreground)' }}
                  />
                  
                  {/* Historical Line */}
                  <Line 
                    type="monotone" 
                    dataKey={(data) => data.predicted ? null : data[forecastMetric]} 
                    name={`Actual ${getMetricName(forecastMetric)}`}
                    stroke={getMetricColor(forecastMetric)} 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: getMetricColor(forecastMetric) }} 
                  />
                  
                  {/* Forecast Line */}
                  <Line 
                    type="monotone" 
                    dataKey={(data) => {
                      const prevIdx = aiManpowerForecast.indexOf(data) - 1;
                      if (!data.predicted && prevIdx >= 0 && aiManpowerForecast[prevIdx + 1].predicted) {
                        return data[forecastMetric];
                      }
                      return data.predicted ? data[forecastMetric] : null;
                    }} 
                    name={`Predicted ${getMetricName(forecastMetric)}`}
                    stroke={getMetricColor(forecastMetric)} 
                    strokeWidth={3} 
                    strokeDasharray="5 5"
                    dot={{ r: 4, fill: getMetricColor(forecastMetric), strokeDasharray: "0" }} 
                  />
                  
                  {/* Background for forecasted area */}
                  <Area 
                    type="monotone" 
                    dataKey={(data) => data.predicted ? data[forecastMetric] : null} 
                    fill="url(#colorPredictedManpower)" 
                    stroke="none" 
                  />

                  <ReferenceLine x="Jun" stroke="var(--color-muted-foreground)" strokeDasharray="3 3" label={{ position: 'top', value: 'Forecast Starts', fill: 'var(--color-muted-foreground)', fontSize: 10 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 p-4 bg-muted/20 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-3 rounded-full" style={{ backgroundColor: getMetricColor(forecastMetric) }} />
                <span className="text-sm font-semibold">{getMetricName(forecastMetric)} Forecast</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Confidence level: <span className="font-bold text-foreground">84%</span>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </>
  );
}
