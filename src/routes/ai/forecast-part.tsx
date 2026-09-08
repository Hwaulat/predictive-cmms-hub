import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Search, Play } from "lucide-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeader, Panel, TablePagination } from "@/components/ui-kit/page";
import { forecast, aiForecastKpis, aiForecastTable } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const kpiTooltips: Record<string, string> = {
  "SCOPE": "Lingkup Forecast : satu mesin atau semua fleet",
  "HORIZON": "Jangka prediksi, sebanyak horizon dibagi 30 bulan kedepan",
  "REORDER NEEDED": "Jenis sparepart yang stoknya habis sebelum lead time +7 hari penyangga, PESAN SEKARANG",
  "EST. COST": "Total biaya pengadaan sepanjang horizon yang dipilih"
};

const columnTooltips: Record<string, string> = {
  "SPAREPART": "Nama dan spesifikasi sparepart",
  "CATEGORY": "Kategori klasifikasi sparepart",
  "NEXT 30D": "Perkiraan kebutuhan bulan pertama, dihitung dari pola pemakaian 3 bulan terakhir",
  "NEXT 90D": "Total kebutuhan sepanjang horizon yang dipilih - jadi sama dengan kolom sebelumnya bila horizon 30 hari",
  "STOCK": "Sisa stok aktual di gudang",
  "STOCKOUT": "Perkiraan waktu (hari) hingga stok habis",
  "STATUS": "Rekomendasi jumlah pesanan (Reorder)",
  "EST. COST": "Estimasi biaya untuk pengadaan sejumlah yang direkomendasikan"
};

export const Route = createFileRoute("/ai/forecast-part")({
  component: AIForecastPartDashboard,
});

function AIForecastPartDashboard() {
  const [simulationPart, setSimulationPart] = useState("Bearing SKF-6205");

  // Table states
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  
  // Top filters
  const [scope, setScope] = useState("ALL FLEET");
  const [horizon, setHorizon] = useState("30 DAYS");

  // Filter Data
  const filteredData = useMemo(() => {
    return aiForecastTable.filter(row => {
      const matchSearch = row.part.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "ALL" || row.status === statusFilter;
      const matchCategory = categoryFilter === "ALL" || row.cat === categoryFilter;
      return matchSearch && matchStatus && matchCategory;
    });
  }, [search, statusFilter, categoryFilter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const totalItems = filteredData.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const paginatedData = useMemo(() => {
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, startIndex, itemsPerPage]);

  return (
    <TooltipProvider>
      <div className="space-y-4 animate-in fade-in-50 duration-500 pb-10">
        <PageHeader
          title="AI Forecast Part"
          description="Predictive inventory intelligence forecasting part consumption and critical alerts."
        />

        {/* Global Controls & KPIs matching the image */}
        <div className="bg-surface border rounded-lg p-4 shadow-sm space-y-6">
          {/* Top Controls */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 border-b pb-4">
            <div className="w-full sm:w-64 space-y-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase ml-1">Scope</label>
              <Select value={scope} onValueChange={setScope}>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL FLEET">ALL FLEET</SelectItem>
                  <SelectItem value="MCH-01">MCH-01 — CNC Machining (Makino)</SelectItem>
                  <SelectItem value="MCH-02">MCH-02 — Hydraulic Press (Komatsu)</SelectItem>
                  <SelectItem value="MCH-03">MCH-03 — Robotic Welder (Fanuc)</SelectItem>
                  <SelectItem value="MCH-04">MCH-04 — Compressor (Atlas Copco)</SelectItem>
                  <SelectItem value="MCH-05">MCH-05 — Conveyor (SEW Eurodrive)</SelectItem>
                  <SelectItem value="MCH-06">MCH-06 — Pump (Sulzer KSB)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full sm:w-48 space-y-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase ml-1">Horizon</label>
              <Select value={horizon} onValueChange={setHorizon}>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30 DAYS">30 DAYS</SelectItem>
                  <SelectItem value="90 DAYS">90 DAYS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold ml-auto px-6 h-10">
              <Play className="size-3 mr-2 fill-white" />
              FORECAST
            </Button>
          </div>

          {/* KPI Cards */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {aiForecastKpis.map((kpi, i) => (
              <div 
                key={i} 
                className={cn(
                  "bg-white rounded-lg border shadow-sm p-4",
                  kpi.tone === "orange" ? "border-l-4 border-l-warning" : "border-l-4 border-l-[#2563eb]"
                )}
              >
                <div className="text-[11px] font-semibold text-muted-foreground uppercase flex items-center gap-1">
                  {kpi.label} 
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="flex items-center justify-center size-3.5 rounded-full bg-muted/60 text-[9px] font-bold cursor-help hover:bg-muted">?</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{kpiTooltips[kpi.label] || kpi.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className={cn(
                  "mt-2 text-2xl font-bold",
                  kpi.tone === "orange" ? "text-warning" : "text-[#2563eb]"
                )}>
                  {kpi.value}
                </div>
              </div>
            ))}
          </div>

          {/* New Forecast Table */}
          <div className="mt-4 border rounded-lg overflow-hidden bg-white">
            <div className="p-4 border-b flex flex-col sm:flex-row sm:items-center gap-4">
              <h2 className="font-semibold text-base text-foreground/90 whitespace-nowrap">
                Forecast Data
              </h2>
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full flex-1">
                <div className="relative w-full flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search sparepart..." 
                    className="w-full pl-9 bg-white"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                  />
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
                  <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}>
                    <SelectTrigger className="w-full sm:w-[160px] bg-white">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All Status</SelectItem>
                      <SelectItem value="REORDER 1u">Reorder 1u</SelectItem>
                      <SelectItem value="REORDER 2u">Reorder 2u</SelectItem>
                      <SelectItem value="REORDER 3u">Reorder 3u</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={categoryFilter} onValueChange={(v) => { setCategoryFilter(v); setCurrentPage(1); }}>
                    <SelectTrigger className="w-full sm:w-[160px] bg-white">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All Categories</SelectItem>
                      <SelectItem value="MECHANICAL">Mechanical</SelectItem>
                      <SelectItem value="ELECTRICAL">Electrical</SelectItem>
                      <SelectItem value="MOTOR">Motor</SelectItem>
                      <SelectItem value="THERMAL">Thermal</SelectItem>
                      <SelectItem value="BEARING">Bearing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-100/50 border-b">
                    {["SPAREPART", "CATEGORY", "NEXT 30D", "NEXT 90D", "STOCK", "STOCKOUT", "STATUS", "EST. COST"].map((h) => (
                      <th key={h} className="py-4 px-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          {h}
                          {(h === "NEXT 30D" || h === "NEXT 90D") && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="flex items-center justify-center size-3.5 rounded-full bg-muted/60 text-[9px] font-bold cursor-help hover:bg-muted">?</span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs leading-relaxed">{columnTooltips[h] || `Data untuk ${h}`}</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {paginatedData.map((row, i) => (
                    <tr key={i} className="hover:bg-muted/20">
                      <td className="px-4 py-4 text-muted-foreground font-medium min-w-[350px]">{row.part}</td>
                      <td className="px-4 py-4 text-[12px] font-bold text-foreground/70">{row.cat}</td>
                      <td className="px-4 py-4 font-bold text-[#2563eb]">{row.next30.toFixed(2)}</td>
                      <td className="px-4 py-4 font-bold text-[#2563eb]">{row.next90.toFixed(2)}</td>
                      <td className="px-4 py-4 font-semibold text-foreground/70">{row.stock}</td>
                      <td className="px-4 py-4 font-medium text-foreground/70">{row.stockout}</td>
                      <td className="px-4 py-4 font-bold text-destructive">{row.status}</td>
                      <td className="px-4 py-4 font-bold text-[#c18635] whitespace-nowrap">
                        Rp {row.cost.toLocaleString("id-ID")}
                      </td>
                    </tr>
                  ))}
                  {paginatedData.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                        No data found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <TablePagination />
          </div>
        </div>

        {/* Forecast Simulation Section */}
        <Panel 
          title="Forecast Simulation" 
          description="Proyeksi konsumsi vs stok untuk part spesifik"
          actions={
            <Select value={simulationPart} onValueChange={setSimulationPart}>
              <SelectTrigger className="w-[200px] h-8 bg-white text-xs">
                <SelectValue placeholder="Select part..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bearing SKF-6205">Bearing SKF-6205</SelectItem>
                <SelectItem value="V-Belt A-45">V-Belt A-45</SelectItem>
                <SelectItem value="Oil Filter HF-6017">Oil Filter HF-6017</SelectItem>
              </SelectContent>
            </Select>
          }
        >
          <div className="h-72 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecast}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="day" fontSize={12} stroke="var(--color-muted-foreground)" />
                <YAxis fontSize={12} stroke="var(--color-muted-foreground)" />
                <RechartsTooltip />
                <Legend />
                <Line type="monotone" dataKey="stock" name="Predicted Stock" stroke="var(--color-primary)" strokeWidth={3} />
                <Line type="monotone" dataKey="lower" name="Lower Bound (95%)" stroke="var(--color-destructive)" strokeDasharray="4 4" />
                <Line type="monotone" dataKey="upper" name="Upper Bound (95%)" stroke="var(--color-success)" strokeDasharray="4 4" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-xs text-muted-foreground bg-primary/5 p-3 rounded-md border border-primary/20">
            <strong>LLM Insight untuk {simulationPart}:</strong> Tren menunjukkan konsumsi {simulationPart} akan meningkat tajam di D+6 akibat jadwal PM beruntun pada 3 mesin. Jika tidak direorder hari ini, diproyeksikan stok menyentuh angka 0 pada D+15 dengan kemungkinan 91%.
          </p>
        </Panel>
      </div>
    </TooltipProvider>
  );
}
