import { createFileRoute } from "@tanstack/react-router";
import { Plus, Search } from "lucide-react";
import { DataTable, PageHeader, Panel, StatusPill } from "@/components/ui-kit/page";
import { schedule } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Preventive Maintenance Schedule — CMMS" },
      {
        name: "description",
        content:
          "Time-based and running-hours PM schedule with scheduled, due, and overdue status tracking.",
      },
      { property: "og:title", content: "Preventive Maintenance Schedule" },
      {
        property: "og:description",
        content: "Calendar and PM list with auto-generated work orders when due.",
      },
    ],
  }),
  component: SchedulePage,
});

const days = Array.from({ length: 30 }, (_, i) => i + 1);
const marked: Record<number, "info" | "warning" | "destructive" | "success"> = {
  1: "destructive",
  4: "warning",
  7: "info",
  12: "info",
  18: "info",
  28: "success",
};

function SchedulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Schedule"
        description="Scheduled preventive maintenance based on time or usage"
        actions={
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#2563eb] hover:bg-[#1d4ed8]">
                <Plus className="size-4 mr-2" /> Create Schedule
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl pb-4 border-b">
                  <div className="p-1.5 bg-blue-50 text-blue-600 rounded-full">
                    <Plus className="size-5" />
                  </div>
                  Create Preventive Schedule
                </DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <div className="space-y-2">
                  <Label>Equipment / Machine<span className="text-destructive">*</span></Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select machine" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="crn-01">CRN-01 - Crane</SelectItem>
                      <SelectItem value="cmpr-01">CMPR-01 - Compressor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Maintenance Type<span className="text-destructive">*</span></Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="time">Time-based</SelectItem>
                      <SelectItem value="meter">Meter-based (Running Hours)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Frequency<span className="text-destructive">*</span></Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select frequency" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Start Date<span className="text-destructive">*</span></Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Assigned Technician</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select technician" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="t1">Andre (Mechanic)</SelectItem>
                      <SelectItem value="t2">Budi (Electric)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Estimated Duration (Hours)</Label>
                  <Input type="number" placeholder="e.g. 2" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Description / Instructions</Label>
                  <Input placeholder="General inspection and lubrication" />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-slate-100 text-slate-400 hover:bg-slate-200" disabled>Save Schedule</Button>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <Panel className="lg:col-span-2" title="PM Calendar — September 2026">
          <div className="grid grid-cols-7 gap-2">
            {days.map((d) => (
              <div
                key={d}
                className="flex h-16 flex-col rounded-lg border border-border p-2 text-xs"
              >
                <span className="font-semibold text-muted-foreground">{d}</span>
                {marked[d] && (
                  <span
                    className={`mt-auto h-1.5 w-full rounded-full bg-${marked[d]}`}
                    style={{ backgroundColor: `var(--color-${marked[d]})` }}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
            <StatusPill label="Scheduled" tone="info" />
            <StatusPill label="Due Today" tone="warning" />
            <StatusPill label="Overdue" tone="destructive" />
            <StatusPill label="Completed" tone="success" />
          </div>
        </Panel>

        <Panel title="PM Compliance">
          <div className="space-y-4">
            {[
              { label: "Completed on time", value: 92, tone: "var(--color-success)" },
              { label: "Late", value: 6, tone: "var(--color-warning)" },
              { label: "Missed", value: 2, tone: "var(--color-destructive)" },
            ].map((r) => (
              <div key={r.label}>
                <div className="flex justify-between text-sm">
                  <span>{r.label}</span>
                  <span className="font-semibold">{r.value}%</span>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full"
                    style={{ width: `${r.value}%`, backgroundColor: r.tone }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel 
        title="PM Schedule List"
        actions={
          <div className="flex items-center gap-3">
            <div className="relative min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input placeholder="Search PM No. or Equipment" className="pl-9 h-9 text-xs bg-white w-full" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px] h-9 text-xs bg-white">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="due">Due Today</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        }
      >
        <DataTable
          columns={["PM No.", "Equipment", "Trigger", "Due Date", "Technician", "Status"]}
          rows={schedule.map((s) => [
            <span className="font-medium">{s.id}</span>,
            s.equipment,
            s.trigger,
            s.due,
            s.tech,
            <StatusPill
              label={s.status}
              tone={
                s.status === "Overdue"
                  ? "destructive"
                  : s.status === "Due Today"
                    ? "warning"
                    : s.status === "Completed"
                      ? "success"
                      : "info"
              }
            />,
          ])}
        />
      </Panel>
    </div>
  );
}
