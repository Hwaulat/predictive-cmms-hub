import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ClipboardList,
  Wrench,
  CheckSquare,
  ChevronRight,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { PageHeader, Panel } from "@/components/ui-kit/page";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  correctiveMonthlyStatistic,
  correctiveFreqMachine,
  correctiveTop10,
} from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/corrective")({
  component: CorrectiveDashboard,
});

function CorrectiveDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <PageHeader
          title="Corrective Dashboard"
          description="Fokus ke frekuensi kerusakan mesin dan waktu penanganan"
        />
        
        <div className="flex items-center gap-3">
          <Select defaultValue="crane">
            <SelectTrigger className="w-[120px] bg-white">
              <SelectValue placeholder="Machine" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="crane">Crane</SelectItem>
              <SelectItem value="hoist">Hoist</SelectItem>
              <SelectItem value="compressor">Compressor</SelectItem>
            </SelectContent>
          </Select>
          
          <Button asChild className="bg-[#2563eb] hover:bg-[#1d4ed8]">
            <Link to="/dashboard/machine-problem-trend">
              Machine Problem Trend <ChevronRight className="size-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="card-surface p-4">
          <div className="flex items-start justify-between">
            <p className="text-xs font-medium text-muted-foreground">Work Order</p>
            <ClipboardList className="size-4 text-primary" />
          </div>
          <p className="mt-3 font-display text-2xl font-bold">35</p>
          <p className="mt-1 text-[11px] text-muted-foreground">AVG. Working Time: 329 Hours</p>
        </div>
        
        <div className="card-surface p-4">
          <div className="flex items-start justify-between">
            <p className="text-xs font-medium text-muted-foreground">Correction</p>
            <Wrench className="size-4 text-primary" />
          </div>
          <p className="mt-3 font-display text-2xl font-bold">35</p>
          <p className="mt-1 text-[11px] text-muted-foreground">AVG. Working Time: 329 Hours</p>
        </div>
        
        <div className="card-surface p-4">
          <div className="flex items-start justify-between">
            <p className="text-xs font-medium text-muted-foreground">Validation</p>
            <CheckSquare className="size-4 text-primary" />
          </div>
          <p className="mt-3 font-display text-2xl font-bold">35</p>
          <p className="mt-1 text-[11px] text-muted-foreground">AVG. Working Time: 329 Hours</p>
        </div>
      </div>

      {/* Middle Chart: Monthly Trouble Statistic by Area */}
      <Panel 
        title="Monthly Trouble Statistic by-Area" 
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
        <div className="h-[350px] mt-6 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={correctiveMonthlyStatistic} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
              <XAxis dataKey="month" fontSize={11} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} dy={10} />
              
              {/* Left Y Axis for Frequency */}
              <YAxis yAxisId="left" orientation="left" fontSize={11} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} label={{ value: 'FREQUENCY', angle: -90, position: 'insideLeft', fontSize: 10, fill: 'var(--color-muted-foreground)', dy: 40, dx: -10 }} />
              
              {/* Right Y Axis for Average */}
              <YAxis yAxisId="right" orientation="right" fontSize={11} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} label={{ value: 'AVERAGE', angle: -90, position: 'insideRight', fontSize: 10, fill: 'var(--color-muted-foreground)', dy: 30, dx: 10 }} />
              
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                cursor={{ fill: 'var(--color-muted)', opacity: 0.2 }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
              
              {/* Grouped Bars for Buildings */}
              <Bar yAxisId="left" dataKey="bA" name="Building A" fill="#7dd3fc" radius={[2, 2, 0, 0]} />
              <Bar yAxisId="left" dataKey="bA1" name="Building A1" fill="#2dd4bf" radius={[2, 2, 0, 0]} />
              <Bar yAxisId="left" dataKey="bB" name="Building B" fill="#60a5fa" radius={[2, 2, 0, 0]} />
              <Bar yAxisId="left" dataKey="bB1" name="Building B1" fill="#a78bfa" radius={[2, 2, 0, 0]} />
              <Bar yAxisId="left" dataKey="bC1" name="Building C1" fill="#4f46e5" radius={[2, 2, 0, 0]} />
              
              {/* Line for Average */}
              <Line yAxisId="right" type="monotone" dataKey="avg" name="Average" stroke="#0f172a" strokeWidth={1.5} dot={{ r: 3, fill: 'white', stroke: '#0f172a', strokeWidth: 1.5 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Trouble Freq Machine Donut */}
        <Panel 
          title="Trouble Freq. Machine" 
          actions={
            <div className="flex items-center gap-2">
              <Select defaultValue="buildingA">
                <SelectTrigger className="w-[120px] h-8 bg-white text-xs">
                  <SelectValue placeholder="Area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buildingA">Building A</SelectItem>
                  <SelectItem value="buildingB">Building B</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="2024">
                <SelectTrigger className="w-[90px] h-8 bg-white text-xs">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
              </Select>
            </div>
          }
        >
          <div className="h-[300px] mt-4 flex flex-col items-center">
            <div className="w-full h-[220px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={correctiveFreqMachine}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={95}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {correctiveFreqMachine.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', color: 'white', backgroundColor: '#334155' }}
                    itemStyle={{ color: 'white' }}
                    formatter={(val, name, props) => [`${props.payload.percent}% (${val})`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Text for sections is rendered in the pie chart tooltip */}
            </div>
            
            {/* Custom Legend Grid */}
            <div className="w-full grid grid-cols-2 gap-y-3 px-4">
              {correctiveFreqMachine.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 justify-center">
                  <div className="size-3 rounded-full shrink-0" style={{ backgroundColor: item.fill }} />
                  <span className="text-xs font-medium text-slate-600 leading-tight">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        {/* Right: Top 10 Machine (Breakdown) */}
        <Panel 
          title="Top 10 Machine" 
          titleBadge={<span className="text-destructive font-bold ml-1">(Breakdown)</span>}
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
          <div className="h-[300px] mt-4 relative">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={correctiveTop10} layout="vertical" margin={{ top: 0, right: 30, left: 70, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="var(--color-border)" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  fontSize={11} 
                  width={130}
                  tick={{ fill: 'var(--color-muted-foreground)' }}
                />
                <Tooltip 
                  cursor={{ fill: 'var(--color-muted)', opacity: 0.2 }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" fill="#2563eb" barSize={12} radius={[0, 4, 4, 0]}>
                  {/* Values at the end of the bar */}
                  {/* Note: In a real implementation we could use LabelList, but standard tooltips work well too */}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

      </div>
    </div>
  );
}
