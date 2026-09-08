import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  CalendarIcon,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LineChart,
} from "recharts";
import { Panel, PageHeader } from "@/components/ui-kit/page";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  machineProblemTrendData,
  workOrderTrendLines,
} from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/machine-problem-trend")({
  component: MachineProblemTrendDashboard,
});

function MachineProblemTrendDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500 pb-20 w-full">
      


      <div className="flex items-center gap-4">
        <Button variant="outline" className="bg-white text-slate-700" onClick={() => navigate({ to: "/dashboard/corrective" })}>
          <ArrowLeft className="size-4 mr-2" /> Back
        </Button>
        <PageHeader 
          title="Tren Masalah Mesin" 
          description="Analisis tren frekuensi masalah mesin dan jumlah work order dari waktu ke waktu" 
        />
      </div>

      <Panel 
        title="Machine Problem" 
        actions={
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-muted-foreground mr-1">Show based on</span>
            <Select defaultValue="buildingA">
              <SelectTrigger className="w-[120px] h-8 bg-white text-xs">
                <SelectValue placeholder="Area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buildingA">Building A</SelectItem>
                <SelectItem value="buildingB">Building B</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="crane">
              <SelectTrigger className="w-[120px] h-8 bg-white text-xs">
                <SelectValue placeholder="Machine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="crane">Crane</SelectItem>
                <SelectItem value="hoist">Hoist</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2 px-3 py-1.5 border rounded-md bg-white text-sm ml-2">
              <CalendarIcon className="size-4 text-muted-foreground" />
              <span>19/08/2024 - 03/08/2024</span>
            </div>
          </div>
        }
      >
        <div className="h-[350px] mt-6 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={machineProblemTrendData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
              <XAxis dataKey="date" fontSize={11} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} dy={10} />
              <YAxis fontSize={11} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} label={{ value: 'FREQUENCY', angle: -90, position: 'insideLeft', fontSize: 10, fill: 'var(--color-muted-foreground)', dy: 40, dx: -10 }} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#334155', color: 'white' }}
                cursor={{ fill: 'var(--color-muted)', opacity: 0.2 }}
                formatter={(val: number) => [`${val}`, "Frequency"]}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
              <Bar dataKey="val" name="Crane" fill="#3b82f6" barSize={32} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      <Panel 
        title="Work Order Trend" 
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
            <LineChart data={workOrderTrendLines} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
              <XAxis dataKey="month" fontSize={11} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} dy={10} />
              <YAxis fontSize={11} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} label={{ value: 'QUANTITY', angle: -90, position: 'insideLeft', fontSize: 10, fill: 'var(--color-muted-foreground)', dy: 40, dx: -10 }} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#334155', color: 'white' }}
                itemStyle={{ color: 'white' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
              
              <Line type="monotone" dataKey="wo" name="Work Order" stroke="#ef4444" strokeWidth={3} dot={{ r: 4, fill: '#ef4444' }} />
              <Line type="monotone" dataKey="cor" name="Correction" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} />
              <Line type="monotone" dataKey="val" name="Validation" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Panel>

    </div>
  );
}
