import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeader, Panel, StatusPill } from "@/components/ui-kit/page";
import { aiSparepartKpis, aiSparepartTable } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const kpiTooltips: Record<string, string> = {
  "OVERDUE": "Jam pakai sudah melewati 100% umur rancangan, resiko rusak mendadak",
  "CRITICAL": "Jam pakai 85-100% umur rancangan, pesan ulang sekarang",
  "WARNING": "Jam pakai 70-85% umur rancangan, pantau lebih sering",
  "TOTAL REPLACEMENT COST": "Total harga satuan seluruh sparepart overdue + critical, tetapi status warning tidak dihitung."
};

const columnTooltips: Record<string, string> = {
  "USAGE": "Jam pakai dibanding umur rancangan, di atas 100% berarti sudah melewati",
  "EOL DATE": "Perkiraan tanggal habis umur, angka minus = sudah terlewat sekian hari",
  "URGENCY": "Skor 0-100 gabungan => Level Urgensi (55%), Jam Pakai (25%), Tekanan Lead Time (15%), Bonus Kaskade (5%)"
};

export const Route = createFileRoute("/ai/sparepart")({
  component: AISparepartDashboard,
});

function UsageBar({ value }: { value: number }) {
  // Cap visual width at 100% even if value is > 100
  const width = Math.min(value, 100);
  
  return (
    <div className="flex flex-col gap-1 w-full max-w-[100px]">
      <span className="text-[13px] font-bold text-destructive">{value}%</span>
      <div className="h-1.5 w-full bg-muted overflow-hidden rounded-full">
        <div 
          className="h-full bg-gradient-to-r from-success via-warning to-destructive"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

function AISparepartDashboard() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const costPerMachine = useMemo(() => {
    const grouped = aiSparepartTable.reduce((acc, curr) => {
      acc[curr.machine] = (acc[curr.machine] || 0) + curr.cost;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(grouped).map(([machine, totalCost]) => ({
      machine,
      totalCost
    }));
  }, []);

  const filteredData = useMemo(() => {
    return aiSparepartTable.filter(row => {
      const matchSearch = row.machine.toLowerCase().includes(search.toLowerCase()) || 
                          row.part.toLowerCase().includes(search.toLowerCase());
      const matchCat = categoryFilter === "ALL" || row.cat === categoryFilter;
      const matchStatus = statusFilter === "ALL" || row.status === statusFilter;
      return matchSearch && matchCat && matchStatus;
    });
  }, [search, categoryFilter, statusFilter]);

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
          title="AI Sparepart Analytics"
          description="Predictive maintenance insights focused on inventory risks, forecasting, and part correlation."
        />

      {/* Custom KPI Cards Layout matching image */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {aiSparepartKpis.map((kpi, i) => (
          <div 
            key={i} 
            className={cn(
              "bg-surface rounded-lg border shadow-sm p-4",
              kpi.tone === "orange" ? "border-l-4 border-l-warning" : "border-l-4 border-l-primary"
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
              kpi.tone === "orange" ? "text-warning" : "text-primary"
            )}>
              {kpi.value}
            </div>
          </div>
        ))}
      </div>

      {/* Chart added as requested based on table data */}
      <Panel title="Total Replacement Cost per Machine" description="Aggregated cost of overdue parts per equipment">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={costPerMachine}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="machine" fontSize={12} stroke="var(--color-muted-foreground)" />
              <YAxis 
                fontSize={12} 
                stroke="var(--color-muted-foreground)" 
                tickFormatter={(value) => `Rp ${value / 1000000}M`}
              />
              <RechartsTooltip formatter={(value: number) => `Rp ${value.toLocaleString("id-ID")}`} />
              <Bar dataKey="totalCost" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      {/* Detailed Table matching image */}
      <div className="bg-surface rounded-lg border shadow-sm overflow-hidden">
        
        {/* Table Header with Search and Filters matching new image layout */}
        <div className="p-4 border-b flex flex-col sm:flex-row sm:items-center gap-4">
          <h2 className="font-semibold text-base text-foreground/90 whitespace-nowrap">
            List Sparepart
          </h2>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full flex-1">
            <div className="relative w-full flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search sparepart..." 
                className="w-full pl-9"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              />
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
              <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Status</SelectItem>
                  <SelectItem value="OVERDUE">Overdue</SelectItem>
                  <SelectItem value="CRITICAL">Critical</SelectItem>
                  <SelectItem value="WARNING">Warning</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={(v) => { setCategoryFilter(v); setCurrentPage(1); }}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Categories</SelectItem>
                  <SelectItem value="THERMAL">Thermal</SelectItem>
                  <SelectItem value="MECHANICAL">Mechanical</SelectItem>
                  <SelectItem value="ELECTRICAL">Electrical</SelectItem>
                  <SelectItem value="BEARING">Bearing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                {["MACHINE", "SPAREPART", "CATEGORY", "USAGE", "EOL DATE", "URGENCY", "STATUS", "UNIT COST"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-slate-500 uppercase whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {h}
                      {columnTooltips[h] ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="flex items-center justify-center size-3.5 rounded-full bg-muted/60 text-[9px] font-bold cursor-help hover:bg-muted">?</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">{columnTooltips[h]}</p>
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <span className="flex items-center justify-center size-3.5 rounded-full bg-muted/60 text-[9px] font-bold opacity-0">?</span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {paginatedData.map((row, i) => (
                <tr key={i} className="hover:bg-muted/20">
                  <td className="px-4 py-4 font-medium text-foreground whitespace-nowrap">{row.machine}</td>
                  <td className="px-4 py-4 text-muted-foreground">{row.part}</td>
                  <td className="px-4 py-4 text-xs font-semibold">{row.cat}</td>
                  <td className="px-4 py-4 align-top">
                    <UsageBar value={row.usage} />
                  </td>
                  <td className="px-4 py-4 text-[13px]">
                    {row.eol} <span className="text-muted-foreground">({row.eolDays}d)</span>
                  </td>
                  <td className="px-4 py-4 text-primary font-bold">{row.urgency}</td>
                  <td className="px-4 py-4">
                    <StatusPill 
                      label={row.status} 
                      tone={row.status === "OVERDUE" ? "destructive" : row.status === "CRITICAL" ? "warning" : "info"} 
                    />
                  </td>
                  <td className="px-4 py-4 font-bold text-[#c18635] whitespace-nowrap">
                    Rp {row.cost.toLocaleString("id-ID")}
                  </td>
                </tr>
              ))}
              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                    No spareparts found matching the criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Custom Pagination matching image */}
        <div className="p-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-muted-foreground bg-white">
          <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span>Rows per page</span>
                <Select value={itemsPerPage.toString()} onValueChange={(v) => { setItemsPerPage(Number(v)); setCurrentPage(1); }}>
                  <SelectTrigger className="h-8 w-[70px] bg-muted/30 border-none rounded-md">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <span>
                {startIndex + 1}–{endIndex} of {totalItems}
              </span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-md text-muted-foreground border-border/50"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              {Array.from({ length: totalPages }).map((_, idx) => {
                const page = idx + 1;
                const isActive = currentPage === page;
                return (
                  <Button
                    key={page}
                    variant={isActive ? "default" : "outline"}
                    size="icon"
                    className={cn(
                      "h-8 w-8 rounded-md",
                      isActive 
                        ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                        : "border-border/50 text-muted-foreground hover:bg-muted/50"
                    )}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                );
              })}

              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-md text-muted-foreground border-border/50"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
      </div>
    </div>
    </TooltipProvider>
  );
}
