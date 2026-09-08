import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Sparkles, Search, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeader, StatusPill, TablePagination } from "@/components/ui-kit/page";
import { aiChecklistTrends, aiPmRecommendations, aiWoForecast } from "@/lib/mock-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ai/maintenance")({
  component: AIMaintenanceDashboard,
});

// Helper component for standardized table
function StandardTable({ 
  title, 
  columns, 
  data, 
  renderRow, 
  searchFields 
}: { 
  title: string, 
  columns: string[], 
  data: any[], 
  renderRow: (row: any, index: number) => React.ReactNode,
  searchFields: string[] 
}) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredData = useMemo(() => {
    if (!search) return data;
    const lowerSearch = search.toLowerCase();
    return data.filter(row => 
      searchFields.some(field => String(row[field] || "").toLowerCase().includes(lowerSearch))
    );
  }, [data, search, searchFields]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const totalItems = filteredData.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const paginatedData = useMemo(() => {
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, startIndex, itemsPerPage]);

  return (
    <div className="border rounded-lg overflow-hidden bg-white mt-8 shadow-sm">
      <div className="p-4 border-b flex flex-col sm:flex-row sm:items-center gap-4">
        <h2 className="font-semibold text-base text-foreground/90 whitespace-nowrap">
          {title}
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full flex-1">
          <div className="relative w-full flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search..." 
              className="w-full pl-9 bg-white"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-100/50 border-b">
              {columns.map((h) => (
                <th key={h} className="py-4 px-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {paginatedData.map((row, i) => renderRow(row, i))}
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-muted-foreground">
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

        <TablePagination />
    </div>
  );
}

function AIMaintenanceDashboard() {
  // Chart Data preparation
  const checklistChartData = aiChecklistTrends.map(t => ({
    name: t.equip,
    fails: t.failCount,
  }));

  const pmChartData = aiPmRecommendations.map(p => ({
    name: p.equip,
    confidence: parseInt(p.confidence.replace('%', '')),
  }));

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500 pb-10">
      <PageHeader
        title="AI Maintenance Analytics"
        description="Predictive insights based on Checklist trends, PM intervals, and WO forecasts."
      />

      <Tabs defaultValue="checklist" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-xl h-12 bg-white border shadow-sm">
          <TabsTrigger value="checklist" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:font-bold text-muted-foreground h-full">Checklist</TabsTrigger>
          <TabsTrigger value="preventive" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:font-bold text-muted-foreground h-full">Preventive</TabsTrigger>
          <TabsTrigger value="workorder" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:font-bold text-muted-foreground h-full">Work Order</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          {/* TAB 1: CHECKLIST */}
          <TabsContent value="checklist" className="space-y-6 outline-none focus:outline-none">
            <div className="bg-white border rounded-lg p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="size-5 text-primary" />
                <h3 className="text-base font-bold text-foreground">Fail Frequency by Equipment</h3>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={checklistChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                    <XAxis dataKey="name" fontSize={12} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} />
                    <YAxis fontSize={12} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} />
                    <RechartsTooltip cursor={{fill: 'var(--color-muted)', opacity: 0.2}} />
                    <Bar dataKey="fails" name="Fail Count" fill="#f59e0b" radius={[4, 4, 0, 0]} maxBarSize={60} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <StandardTable
              title="Checklist Analytics Data"
              columns={["Equipment", "Checklist Item", "Fail Count", "Timeframe", "Status", "AI Insight"]}
              data={aiChecklistTrends}
              searchFields={["equip", "item"]}
              renderRow={(row, i) => (
                <tr key={i} className="hover:bg-muted/20">
                  <td className="px-4 py-4 text-muted-foreground font-semibold whitespace-nowrap">{row.equip}</td>
                  <td className="px-4 py-4 font-medium text-foreground">{row.item}</td>
                  <td className="px-4 py-4 font-bold text-destructive">{row.failCount}x</td>
                  <td className="px-4 py-4 text-muted-foreground">{row.timeframe}</td>
                  <td className="px-4 py-4">
                    <StatusPill label={row.status} tone={row.status === "Critical" ? "destructive" : row.status === "Warning" ? "warning" : "info"} />
                  </td>
                  <td className="px-4 py-4 text-muted-foreground text-xs">{row.insight}</td>
                </tr>
              )}
            />
          </TabsContent>

          {/* TAB 2: PREVENTIVE */}
          <TabsContent value="preventive" className="space-y-6 outline-none focus:outline-none">
            <div className="bg-white border rounded-lg p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="size-5 text-primary" />
                <h3 className="text-base font-bold text-foreground">AI Confidence Score</h3>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={pmChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                    <XAxis dataKey="name" fontSize={12} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} />
                    <YAxis fontSize={12} stroke="var(--color-muted-foreground)" domain={[0, 100]} axisLine={false} tickLine={false} />
                    <RechartsTooltip cursor={{fill: 'var(--color-muted)', opacity: 0.2}} />
                    <Bar dataKey="confidence" name="Confidence %" fill="#2563eb" radius={[4, 4, 0, 0]} maxBarSize={60} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <StandardTable
              title="Preventive Maintenance Data"
              columns={["Equipment", "Current Interval", "AI Suggested", "Confidence", "Reasoning"]}
              data={aiPmRecommendations}
              searchFields={["equip", "reason"]}
              renderRow={(row, i) => (
                <tr key={i} className="hover:bg-muted/20">
                  <td className="px-4 py-4 text-muted-foreground font-semibold whitespace-nowrap">{row.equip}</td>
                  <td className="px-4 py-4 text-muted-foreground line-through decoration-muted-foreground/50">{row.currentInterval}</td>
                  <td className="px-4 py-4">
                    <StatusPill label={row.suggested} tone="success" />
                  </td>
                  <td className="px-4 py-4">
                    <StatusPill label={row.confidence} tone="primary" />
                  </td>
                  <td className="px-4 py-4 text-muted-foreground text-xs leading-relaxed">{row.reason}</td>
                </tr>
              )}
            />
          </TabsContent>

          {/* TAB 3: WORK ORDER */}
          <TabsContent value="workorder" className="space-y-6 outline-none focus:outline-none">
            <div className="bg-white border rounded-lg p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="size-5 text-primary" />
                <h3 className="text-base font-bold text-foreground">Predicted WO Volume</h3>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={aiWoForecast}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                    <XAxis dataKey="month" fontSize={12} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} />
                    <YAxis fontSize={12} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} />
                    <RechartsTooltip cursor={{fill: 'var(--color-muted)', opacity: 0.2}} />
                    <Legend />
                    <Bar dataKey="actual" name="Actual WOs" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} maxBarSize={60} />
                    <Bar dataKey="predicted" name="Predicted WOs" fill="var(--color-chart-2)" opacity={0.6} radius={[4, 4, 0, 0]} maxBarSize={60} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-4 text-xs text-muted-foreground bg-primary/5 p-3 rounded-md border border-primary/20">
                <strong>LLM Insight:</strong> Volume Work Order diproyeksikan melonjak pada bulan Oktober dan Januari, berkorelasi kuat dengan jadwal puncak produksi dan habisnya umur pakai komponen major secara bersamaan. Disarankan untuk menambah ketersediaan manpower pada periode tersebut.
              </p>
            </div>

            <StandardTable
              title="Work Order Forecast Data"
              columns={["Month", "Actual WOs", "Predicted WOs", "Variance"]}
              data={aiWoForecast}
              searchFields={["month"]}
              renderRow={(row, i) => {
                const hasActual = row.actual !== null;
                const variance = hasActual ? row.predicted - row.actual : null;
                return (
                  <tr key={i} className="hover:bg-muted/20">
                    <td className="px-4 py-4 text-muted-foreground font-semibold">{row.month}</td>
                    <td className="px-4 py-4 font-medium text-foreground">{hasActual ? row.actual : "-"}</td>
                    <td className="px-4 py-4 font-bold text-primary">{row.predicted}</td>
                    <td className="px-4 py-4">
                      {hasActual ? (
                        <span className={cn(
                          "font-bold text-xs",
                          variance && variance > 0 ? "text-warning" : "text-success"
                        )}>
                          {variance && variance > 0 ? "+" : ""}{variance}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                  </tr>
                );
              }}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
