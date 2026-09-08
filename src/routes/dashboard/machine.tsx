import { createFileRoute } from "@tanstack/react-router";
import {
  CalendarIcon,
  ChevronRight,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { PageHeader, Panel } from "@/components/ui-kit/page";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  machineConditionItems,
  correctiveTop10,
  machineProblemComposition,
} from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/machine")({
  component: MachineDashboard,
});

function MachineDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <PageHeader
        title="Machine Dashboard"
        description="Fokus ke detail kondisi mesin dan komposisi permasalahan"
      />

      {/* Top Panel: Machine Condition */}
      <Panel 
        title="Machine Condition (Inspection Item)" 
        actions={
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 border rounded-md bg-white text-sm">
              <CalendarIcon className="size-4 text-muted-foreground" />
              <span>19/08/2024 - 01/09/2024</span>
            </div>
            <Button className="bg-[#2563eb] hover:bg-[#1d4ed8]">
              Details <ChevronRight className="size-4 ml-1" />
            </Button>
          </div>
        }
      >
        <div className="h-[350px] mt-6 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={machineConditionItems} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
              <XAxis dataKey="building" fontSize={11} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} dy={10} />
              <YAxis fontSize={11} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} label={{ value: 'QUANTITY', angle: -90, position: 'insideLeft', fontSize: 10, fill: 'var(--color-muted-foreground)', dy: 40, dx: -10 }} />
              
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#334155', color: 'white' }}
                cursor={{ fill: 'var(--color-muted)', opacity: 0.2 }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
              
              {/* Grouped Bars */}
              <Bar dataKey="check" name="Check" fill="#34d399" radius={[4, 4, 0, 0]} barSize={32} />
              <Bar dataKey="repair" name="Repair" fill="#fbbf24" radius={[4, 4, 0, 0]} barSize={32} />
              <Bar dataKey="change" name="Change" fill="#f87171" radius={[4, 4, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Top 10 Machine (Problem) */}
        <Panel 
          title="Top 10 Machine" 
          titleBadge={<span className="text-destructive font-bold ml-1">(Problem)</span>}
          actions={
            <div className="flex items-center gap-2 px-3 py-1.5 border rounded-md bg-white text-sm">
              <CalendarIcon className="size-4 text-muted-foreground" />
              <span>19/08/2024 - 03/08/2024</span>
            </div>
          }
        >
          <div className="h-[400px] mt-4 relative">
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
                <Bar dataKey="value" fill="#2563eb" barSize={12} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        {/* Right: Problem Composition */}
        <Panel 
          title="Problem Composition" 
          actions={
            <div className="flex items-center gap-2 px-3 py-1.5 border rounded-md bg-white text-sm">
              <CalendarIcon className="size-4 text-muted-foreground" />
              <span>19/08/2024 - 01/09/2024</span>
            </div>
          }
        >
          <div className="h-[400px] mt-4 flex flex-col items-center justify-center relative">
            <div className="w-full h-[320px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={machineProblemComposition}
                    cx="50%"
                    cy="50%"
                    outerRadius={140}
                    dataKey="value"
                    stroke="none"
                    labelLine={false}
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, value, name }) => {
                      const RADIAN = Math.PI / 180;
                      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);

                      return (
                        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="font-bold text-xl">
                          {`${value}%`}
                        </text>
                      );
                    }}
                  >
                    {machineProblemComposition.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', color: 'white', backgroundColor: '#334155' }}
                    itemStyle={{ color: 'white' }}
                    formatter={(val, name, props) => [`${val}%`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex items-center gap-8 mt-4">
              {machineProblemComposition.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="size-4 rounded-full shrink-0" style={{ backgroundColor: item.fill }} />
                  <span className="text-sm font-semibold text-slate-600 leading-tight">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Panel>

      </div>
    </div>
  );
}
