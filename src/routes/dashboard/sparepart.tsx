import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Activity, AlertTriangle, Wallet, Wrench, Search, ChevronLeft, ChevronRight, type LucideIcon } from "lucide-react";
import { DataTable, Panel, PageHeader, StatusPill } from "@/components/ui-kit/page";
import { 
  sparepartKpis, partUsage, aiInsights,
  sparepartCostByArea, sparepartUsageComposition, sparepartUsage, sparepartCost
} from "@/lib/mock-data";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
  ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard/sparepart")({
  component: SparepartDashboard,
});

const icons: Record<string, LucideIcon> = {
  wallet: Wallet,
  alert: AlertTriangle,
  activity: Activity,
  wrench: Wrench,
};

function KpiCards({ data }: { data: readonly any[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {data.map((k) => {
        const Icon = icons[k.icon] || Activity;
        return (
          <div key={k.label} className="card-surface p-4">
            <div className="flex items-start justify-between">
              <p className="text-xs font-medium text-muted-foreground">{k.label}</p>
              <Icon className="size-4 text-primary" />
            </div>
            <p className="mt-3 font-display text-2xl font-bold">{k.value}</p>
            <p className="mt-1 text-[11px] text-muted-foreground">{k.delta}</p>
          </div>
        );
      })}
    </div>
  );
}

function SparepartDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredParts = useMemo(() => {
    return partUsage.filter(p => p.part.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredParts.length / itemsPerPage) || 1;
  const paginatedParts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredParts.slice(start, start + itemsPerPage);
  }, [filteredParts, currentPage, itemsPerPage]);

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <PageHeader
        title={
          <div className="flex items-center gap-3">
            <span>Sparepart Dashboard</span>
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="inline-flex items-center rounded-full bg-destructive/10 px-2.5 py-0.5 text-xs font-semibold text-destructive cursor-help border border-destructive/20 hover:bg-destructive/20 transition-colors">
                  Critical Part ({aiInsights.length})
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-96 p-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-slate-900">Critical Part Alerts</h4>
                  <p className="text-xs text-muted-foreground pb-2">Predicted to deplete soon</p>
                  <ul className="space-y-3">
                    {aiInsights.map((i) => (
                      <li key={i.part} className="rounded-lg bg-destructive/10 p-3 border border-destructive/20">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-destructive text-sm">{i.part}</span>
                          <StatusPill label={`± ${i.days} days left`} tone="destructive" />
                        </div>
                        <p className="mt-2 text-[11px] text-muted-foreground leading-relaxed">{i.reason}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        }
        description="Fokus ke kondisi stok dan pergerakan sparepart"
      />

      <KpiCards data={sparepartKpis} />

      {/* New Analytics Charts Section */}
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Spare part Cost by Area (Takes 2 columns) */}
        <div className="lg:col-span-2">
          <Panel 
            title="Spare part Cost by-Area" 
            actions={
              <Select defaultValue="2024">
                <SelectTrigger className="w-[90px] h-8 bg-white text-xs">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
              </Select>
            }
          >
            <div className="h-[300px] mt-6 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={sparepartCostByArea} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                  <XAxis dataKey="month" fontSize={11} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} dy={10} />
                  <YAxis yAxisId="left" fontSize={11} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} label={{ value: 'TOTAL RUPIAH', angle: -90, position: 'insideLeft', fontSize: 10, fill: 'var(--color-muted-foreground)', dy: 40, dx: -20 }} />
                  <YAxis yAxisId="right" orientation="right" fontSize={11} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} label={{ value: 'PART QUANTITY', angle: 90, position: 'insideRight', fontSize: 10, fill: 'var(--color-muted-foreground)', dy: 40, dx: 20 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#334155', color: 'white' }}
                    itemStyle={{ color: 'white' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
                  
                  <Bar yAxisId="left" dataKey="BuildingA" name="Building A" fill="#a7f3d0" barSize={8} radius={[2, 2, 0, 0]} />
                  <Bar yAxisId="left" dataKey="BuildingA1" name="Building A1" fill="#2dd4bf" barSize={8} radius={[2, 2, 0, 0]} />
                  <Bar yAxisId="left" dataKey="BuildingB" name="Building B" fill="#60a5fa" barSize={8} radius={[2, 2, 0, 0]} />
                  <Bar yAxisId="left" dataKey="BuildingB1" name="Building B1" fill="#c4b5fd" barSize={8} radius={[2, 2, 0, 0]} />
                  <Bar yAxisId="left" dataKey="BuildingC1" name="Building C1" fill="#818cf8" barSize={8} radius={[2, 2, 0, 0]} />
                  <Line yAxisId="right" type="monotone" dataKey="PartQuantity" name="Part Quantity" stroke="#64748b" strokeWidth={2} dot={{ r: 4, fill: 'white', stroke: '#64748b', strokeWidth: 2 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </div>

        {/* Usage Composition (Pie Chart) */}
        <div className="lg:col-span-1">
          <Panel 
            title="Usage Composition" 
            actions={
              <Select defaultValue="2024">
                <SelectTrigger className="w-[90px] h-8 bg-white text-xs">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>
            }
          >
            <div className="h-[300px] mt-6 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sparepartUsageComposition}
                    cx="50%"
                    cy="45%"
                    innerRadius={0}
                    outerRadius={100}
                    dataKey="value"
                    labelLine={false}
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, value, name }) => {
                      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                      const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                      const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
                      return (
                        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={14} fontWeight="bold">
                          {value}%
                        </text>
                      );
                    }}
                  >
                    {sparepartUsageComposition.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </div>

        {/* Spare part Usage (Bar) */}
        <div className="lg:col-span-1">
          <Panel 
            title="Spare part Usage" 
            actions={
              <div className="flex items-center gap-2">
                <Select defaultValue="alloy">
                  <SelectTrigger className="w-[120px] h-8 bg-white text-xs">
                    <SelectValue placeholder="Area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alloy">Alloy Casting</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="2024">
                  <SelectTrigger className="w-[90px] h-8 bg-white text-xs">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            }
          >
            <div className="h-[250px] mt-6 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sparepartUsage} margin={{ top: 20, right: 10, bottom: 20, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                  <XAxis dataKey="month" fontSize={11} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} dy={10} />
                  <YAxis fontSize={11} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} label={{ value: 'PART QUANTITY', angle: -90, position: 'insideLeft', fontSize: 10, fill: 'var(--color-muted-foreground)', dy: 40, dx: -20 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#334155', color: 'white' }}
                    cursor={{ fill: 'var(--color-muted)', opacity: 0.2 }}
                  />
                  <Bar dataKey="PartQuantity" name="Total" fill="#2dd4bf" barSize={24} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </div>

        {/* Sparepart Cost (Area) */}
        <div className="lg:col-span-2">
          <Panel 
            title="Sparepart Cost" 
            actions={
              <Select defaultValue="2024">
                <SelectTrigger className="w-[90px] h-8 bg-white text-xs">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>
            }
          >
            <div className="h-[250px] mt-6 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparepartCost} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <defs>
                    <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                  <XAxis dataKey="month" fontSize={11} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} dy={10} />
                  <YAxis fontSize={11} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} tickFormatter={(value) => value.toLocaleString()} label={{ value: 'TOTAL RUPIAH', angle: -90, position: 'insideLeft', fontSize: 10, fill: 'var(--color-muted-foreground)', dy: 40, dx: -30 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#334155', color: 'white' }}
                    formatter={(value: number) => [`Rp. ${value.toLocaleString()}`, "Cost"]}
                  />
                  <Area type="monotone" dataKey="cost" stroke="#2dd4bf" strokeWidth={3} fillOpacity={1} fill="url(#colorCost)" dot={{ r: 4, fill: 'white', stroke: '#2dd4bf', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#2dd4bf', stroke: 'white', strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Panel>
      </div>
      </div>

      {/* Top Used Parts with Search and Pagination */}
      <Panel 
        title="Top Used Parts" 
        description="Highest consumption this month"
        actions={
          <div className="relative w-[250px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input 
              placeholder="Search part..." 
              className="pl-9 h-9" 
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        }
      >
        <div className="mt-4 border rounded-lg overflow-hidden">
          <DataTable
            columns={["Part Name", "Quantity Used", "Total Cost"]}
            rows={paginatedParts.map((p) => [
              <span className="font-medium">{p.part}</span>,
              p.qty,
              p.cost,
            ])}
          />
          <div className="p-4 border-t flex items-center justify-end gap-6 text-sm text-slate-600 bg-white">
            <div className="flex items-center gap-2">
              <span>Rows per page</span>
              <Select 
                value={itemsPerPage.toString()} 
                onValueChange={(val) => {
                  setItemsPerPage(Number(val));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[70px] h-8 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="font-medium">
              Page {currentPage} of {totalPages}
            </div>
            
            <div className="flex items-center gap-1">
              <Button 
                variant="outline" 
                size="icon" 
                className="size-8 rounded-sm text-slate-600 disabled:opacity-50" 
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <span className="sr-only">First page</span>&laquo;
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="size-8 rounded-sm text-slate-600 disabled:opacity-50" 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <span className="sr-only">Previous page</span>&lsaquo;
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="size-8 rounded-sm text-slate-600 disabled:opacity-50" 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <span className="sr-only">Next page</span>&rsaquo;
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="size-8 rounded-sm text-slate-600 disabled:opacity-50" 
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <span className="sr-only">Last page</span>&raquo;
              </Button>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}
