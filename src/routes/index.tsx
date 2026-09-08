import { createFileRoute } from "@tanstack/react-router";
import {
  CalendarIcon,
  CheckCircle2,
  RefreshCcw,
  AlertTriangle,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ComposedChart,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";
import { Panel, PageHeader } from "@/components/ui-kit/page";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  generalTroubleByArea, 
  generalChecklistProblem,
  generalSparepartUsage 
} from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  component: GeneralDashboard,
});

function GeneralDashboard() {
  const totalChecklist = generalChecklistProblem.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <PageHeader
        title="General Dashboard"
        description="Ringkasan menyeluruh performa maintenance dan operasional pabrik"
      />

      {/* 3 Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="card-surface p-4">
          <div className="flex items-start justify-between">
            <p className="text-xs font-medium text-muted-foreground">Checklist</p>
            <CheckCircle2 className="size-4 text-primary" />
          </div>
          <p className="mt-3 font-display text-2xl font-bold">35</p>
          <p className="mt-1 text-[11px] text-muted-foreground">AVG. Work Hours: 329 Hours</p>
        </div>
        
        <div className="card-surface p-4">
          <div className="flex items-start justify-between">
            <p className="text-xs font-medium text-muted-foreground">Preventive</p>
            <RefreshCcw className="size-4 text-primary" />
          </div>
          <p className="mt-3 font-display text-2xl font-bold">35</p>
          <p className="mt-1 text-[11px] text-muted-foreground">AVG. Work Hours: 329 Hours</p>
        </div>
        
        <div className="card-surface p-4">
          <div className="flex items-start justify-between">
            <p className="text-xs font-medium text-muted-foreground">Corrective</p>
            <AlertTriangle className="size-4 text-primary" />
          </div>
          <p className="mt-3 font-display text-2xl font-bold">35</p>
          <p className="mt-1 text-[11px] text-muted-foreground">AVG. Work Hours: 329 Hours</p>
        </div>
      </div>

      {/* Middle Chart: Trouble by Area */}
      <Panel 
        title="Trouble by-Area" 
        actions={
          <div className="flex items-center gap-2 px-3 py-1.5 border rounded-md bg-white text-sm">
            <CalendarIcon className="size-4 text-muted-foreground" />
            <span>19/08/2024 - 03/08/2024</span>
          </div>
        }
      >
        <div className="h-[350px] mt-6 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={generalTroubleByArea} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
              <XAxis dataKey="date" fontSize={11} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} dy={10} />
              
              {/* Left Y Axis for Frequency */}
              <YAxis yAxisId="left" orientation="left" fontSize={11} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} label={{ value: 'FREQUENCY', angle: -90, position: 'insideLeft', fontSize: 10, fill: 'var(--color-muted-foreground)', dy: 40, dx: -10 }} />
              
              {/* Right Y Axis for Average */}
              <YAxis yAxisId="right" orientation="right" fontSize={11} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} label={{ value: 'AVERAGE', angle: -90, position: 'insideRight', fontSize: 10, fill: 'var(--color-muted-foreground)', dy: 30, dx: 10 }} />
              
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                cursor={{ fill: 'var(--color-muted)', opacity: 0.2 }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
              
              {/* Stacked Bars for Buildings */}
              <Bar yAxisId="left" dataKey="bA" name="Building A" stackId="a" fill="#7dd3fc" radius={[0, 0, 4, 4]} barSize={32} />
              <Bar yAxisId="left" dataKey="bA1" name="Building A1" stackId="a" fill="#2dd4bf" />
              <Bar yAxisId="left" dataKey="bB" name="Building B" stackId="a" fill="#60a5fa" />
              <Bar yAxisId="left" dataKey="bB1" name="Building B1" stackId="a" fill="#a78bfa" />
              <Bar yAxisId="left" dataKey="bC1" name="Building C1" stackId="a" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              
              {/* Line for Average */}
              <Line yAxisId="right" type="monotone" dataKey="avg" name="Average" stroke="#0f172a" strokeWidth={1.5} dot={{ r: 3, fill: 'white', stroke: '#0f172a', strokeWidth: 1.5 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Checklist Problem Donut */}
        <Panel 
          title="Checklist Problem (Inspection Item)" 
          actions={
            <div className="flex items-center gap-2 px-3 py-1.5 border rounded-md bg-white text-sm">
              <CalendarIcon className="size-4 text-muted-foreground" />
              <span>19/08/2024 - 01/09/2024</span>
            </div>
          }
        >
          <div className="h-[300px] mt-4 flex items-center">
            <div className="w-1/2 h-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={generalChecklistProblem}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {generalChecklistProblem.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', color: 'white', backgroundColor: '#334155' }}
                    itemStyle={{ color: 'white' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Center Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-sm font-semibold text-muted-foreground">Total</span>
                <span className="text-3xl font-bold">{totalChecklist}</span>
              </div>
            </div>
            
            {/* Custom Legend */}
            <div className="w-1/2 grid grid-cols-2 gap-y-3 gap-x-2 pl-4">
              {generalChecklistProblem.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="size-3 rounded-full shrink-0" style={{ backgroundColor: item.fill }} />
                  <span className="text-xs font-medium text-slate-600 leading-tight">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        {/* Right: Spare part Usage Area Chart */}
        <Panel 
          title="Spare part Usage (IDR Conversion)"
          actions={
            <Select defaultValue="2024">
              <SelectTrigger className="w-[100px] h-8 bg-white text-xs">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
          }
        >
          <div className="h-[300px] mt-4 relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={generalSparepartUsage} margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="month" fontSize={11} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} dy={10} />
                <YAxis 
                  fontSize={11} 
                  stroke="var(--color-muted-foreground)" 
                  axisLine={false} 
                  tickLine={false} 
                  tickFormatter={(val) => val === 0 ? "0" : (val / 1000000).toFixed(1) + "M"}
                  label={{ value: 'TOTAL RUPIAH', angle: -90, position: 'insideLeft', fontSize: 10, fill: 'var(--color-muted-foreground)', dy: 30, dx: -30 }} 
                />
                <Tooltip 
                  formatter={(value: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(value)}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', color: 'white', backgroundColor: '#334155' }}
                  itemStyle={{ color: 'white' }}
                />
                <Area type="monotone" dataKey="cost" stroke="#2dd4bf" strokeWidth={3} fillOpacity={1} fill="url(#colorUsage)" dot={{ r: 4, fill: '#fff', stroke: '#2dd4bf', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

      </div>
    </div>
  );
}
