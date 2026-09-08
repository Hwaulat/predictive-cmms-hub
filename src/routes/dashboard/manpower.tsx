import { createFileRoute } from "@tanstack/react-router";
import { Activity, ClipboardList, Users, Search, ChevronLeft, ChevronRight, Calendar as CalendarIcon, type LucideIcon } from "lucide-react";
import { DataTable, Panel, PageHeader, StatusPill } from "@/components/ui-kit/page";
import { 
  manpowerKpis, technicians,
  manpowerProductivityPerformance, manpowerProgressStatus, manpowerTeamProductivityByArea
} from "@/lib/mock-data";
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/dashboard/manpower")({
  component: ManpowerDashboard,
});

const icons: Record<string, LucideIcon> = {
  users: Users,
  clipboard: ClipboardList,
  activity: Activity,
};

function KpiCards({ data }: { data: readonly any[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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

function ManpowerDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <PageHeader
        title="Manpower Dashboard"
        description="Fokus ke performa dan beban kerja teknisi"
      />

      <KpiCards data={manpowerKpis} />

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Productivity Performance (Takes full width on top row) */}
        <div className="lg:col-span-2">
          <Panel 
            title="Productivity Performance" 
            actions={
              <div className="flex items-center gap-2">
                <Select defaultValue="BuildingA">
                  <SelectTrigger className="w-[120px] h-8 bg-white text-xs">
                    <SelectValue placeholder="Area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BuildingA">Building A</SelectItem>
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
                <Button size="sm" className="h-8 bg-[#2563eb] hover:bg-[#1d4ed8] text-white">Details &gt;</Button>
              </div>
            }
          >
            <div className="h-[300px] mt-6 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={manpowerProductivityPerformance} margin={{ top: 20, right: 10, bottom: 20, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                  <XAxis dataKey="month" fontSize={11} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} dy={10} />
                  <YAxis fontSize={11} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} label={{ value: 'TIME (MINUTES)', angle: -90, position: 'insideLeft', fontSize: 10, fill: 'var(--color-muted-foreground)', dy: 40, dx: -20 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#334155', color: 'white' }}
                    cursor={{ fill: 'var(--color-muted)', opacity: 0.2 }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar dataKey="Checklist" name="Checklist" fill="#60a5fa" barSize={16} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Preventive" name="Preventive" fill="#f59e0b" barSize={16} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </div>

        {/* Progress Status by-Task */}
        <div className="lg:col-span-1">
          <Panel 
            title="Progress Status by-Task" 
            actions={
              <div className="flex items-center gap-2 border rounded-md px-3 py-1.5 text-xs text-muted-foreground bg-white">
                <CalendarIcon className="size-3" />
                <span>19/08/2024 - 03/09/2024</span>
              </div>
            }
          >
            <div className="h-[250px] mt-6 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={manpowerProgressStatus}
                    cx="50%"
                    cy="45%"
                    innerRadius={0}
                    outerRadius={90}
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
                    {manpowerProgressStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </div>

        {/* Team Productivity by-Area */}
        <div className="lg:col-span-1">
          <Panel 
            title="Team Productivity by-Area" 
            actions={
              <div className="flex items-center gap-2 border rounded-md px-3 py-1.5 text-xs text-muted-foreground bg-white">
                <CalendarIcon className="size-3" />
                <span>19/08/2024 - 03/09/2024</span>
              </div>
            }
          >
            <div className="h-[250px] mt-6 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={manpowerTeamProductivityByArea}
                    cx="40%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    labelLine={false}
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, value, name }) => {
                      const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
                      const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                      const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
                      return (
                        <text x={x} y={y} fill="#475569" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight="bold">
                          {value}%
                        </text>
                      );
                    }}
                  >
                    {manpowerTeamProductivityByArea.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend iconType="circle" layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ lineHeight: '30px', fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </div>
      </div>

      <Panel title="Technician Workload & Performance">
        <div className="mb-4 flex items-center justify-between">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input placeholder="Search technicians..." className="pl-9 bg-white" />
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[130px] bg-white">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="mechanical">Mechanical</SelectItem>
                <SelectItem value="electrical">Electrical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DataTable
          columns={["Name", "Role", "Active WOs", "Capacity Utilization", "Avg Completion Time", "First-Time Fix Rate"]}
          rows={technicians.map((t) => [
            <span className="font-medium">{t.name}</span>,
            t.role,
            t.activeWO,
            t.capacity,
            t.avgTime,
            <StatusPill label={t.ftf} tone="success" />,
          ])}
        />
        
        <div className="mt-4 flex items-center justify-between border-t pt-4 text-sm text-muted-foreground">
          <div>Showing 1 to 5 of 24 entries</div>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" className="size-8" disabled>
              <ChevronLeft className="size-4" />
            </Button>
            <Button variant="outline" size="icon" className="size-8 bg-primary text-primary-foreground">
              1
            </Button>
            <Button variant="outline" size="icon" className="size-8">
              2
            </Button>
            <Button variant="outline" size="icon" className="size-8">
              3
            </Button>
            <span className="px-2">...</span>
            <Button variant="outline" size="icon" className="size-8">
              5
            </Button>
            <Button variant="outline" size="icon" className="size-8">
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </Panel>
    </div>
  );
}
