import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Clock, Image as ImageIcon, Download, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/approval/maintenance/$id")({
  head: () => ({
    meta: [
      { title: "Detail Checklist — Predictive CMMS Hub" },
      { name: "description", content: "Detail Checklist and Maintenance Information Report" },
    ],
  }),
  component: MaintenanceApprovalDetails,
});

interface ChecklistGroupItem {
  check: string;
  method: string;
  standard: string;
  status: "OK" | "NG";
  variable: string;
  desc: string;
  doc: boolean;
  photo: boolean;
}

interface ChecklistGroup {
  group: string;
  items: ChecklistGroupItem[];
}

const mockChecklistReportData: ChecklistGroup[] = [
  {
    group: "A. Safety Factor",
    items: [
      {
        check: "1. Automatic Grease Pump",
        method: "Viewed",
        standard: "Works",
        status: "OK",
        variable: "23 N/m²",
        desc: "-",
        doc: true,
        photo: false,
      },
      {
        check: "2. Connect Rod Lubrication Level",
        method: "Viewed",
        standard: "According to Level",
        status: "NG",
        variable: "-",
        desc: "Weighing less than ...",
        doc: true,
        photo: true,
      },
      {
        check: "3. Air Pressure",
        method: "Viewed",
        standard: "According to Level",
        status: "OK",
        variable: "-",
        desc: "-",
        doc: true,
        photo: false,
      },
    ],
  },
  {
    group: "B. Lubrication",
    items: [
      {
        check: "1. Wind Leaks",
        method: "Viewed - Written",
        standard: "No Leaks",
        status: "NG",
        variable: "-",
        desc: "Weighing less than ...",
        doc: true,
        photo: true,
      },
      {
        check: "2. Completness of Buttons and Their Functions",
        method: "Viewed",
        standard: "No Leaks",
        status: "NG",
        variable: "23 N/m²",
        desc: "Stronger pressure...",
        doc: true,
        photo: true,
      },
    ],
  },
  {
    group: "C. Hidrolic Oil",
    items: [
      {
        check: "1. Censor Safety Device",
        method: "Viewed - Checked",
        standard: "Complete",
        status: "OK",
        variable: "10 Gram",
        desc: "-",
        doc: true,
        photo: false,
      },
      {
        check: "2. Clean the Machine Body",
        method: "Viewed - Checked",
        standard: "Works",
        status: "NG",
        variable: "23 N/m²",
        desc: "Stronger pressure...",
        doc: true,
        photo: true,
      },
    ],
  },
  {
    group: "D. Sensor",
    items: [
      {
        check: "1. Clean the Machine Legs",
        method: "In Lap With Forward",
        standard: "Clean Machine",
        status: "OK",
        variable: "10 Gram",
        desc: "-",
        doc: true,
        photo: false,
      },
    ],
  },
];

function MaintenanceApprovalDetails() {
  const navigate = useNavigate();
  const { id } = Route.useParams();

  return (
    <div className="space-y-6 w-full pb-20 animate-in fade-in-50 duration-500">
      {/* Top Header with Back and Approve at the top right */}
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-2xl font-bold font-display text-slate-800">Detail Checklist</h1>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="text-slate-700 bg-white"
            onClick={() => navigate({ to: "/approval/maintenance" })}
          >
            <ArrowLeft className="size-4 mr-2" /> Back
          </Button>

          {/* Button Approve diposisikan di paling kanan atas */}
          <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 font-semibold shadow-sm">
            Approve
          </Button>
        </div>
      </div>

      {/* Section 1: Maintenance Informations (SS 1) */}
      <div className="bg-white rounded-xl border shadow-sm p-6 space-y-6">
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-lg font-bold font-display text-slate-800">
            Maintenance Informations
          </h2>
          <span className="text-xs font-medium text-slate-500">
            Submit Form : <span className="font-bold text-slate-800">12/12/2023 12:02</span>
          </span>
        </div>

        {/* 2 Information Tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Table */}
          <div className="border rounded-lg overflow-hidden divide-y divide-border/60 text-sm">
            <div className="flex justify-between px-4 py-3 bg-white">
              <span className="text-slate-600 font-medium">Checklist ID</span>
              <span className="text-slate-800 font-semibold">{id || "CID12345"}</span>
            </div>
            <div className="flex justify-between px-4 py-3 bg-white">
              <span className="text-slate-600 font-medium">Document Number</span>
              <span className="text-slate-800 font-semibold">TCF2/Form/ME/01/01</span>
            </div>
            <div className="flex justify-between px-4 py-3 bg-white">
              <span className="text-slate-600 font-medium">Machine</span>
              <span className="text-slate-800 font-semibold">CRN-01 - Crane</span>
            </div>
            <div className="flex justify-between px-4 py-3 bg-white">
              <span className="text-slate-600 font-medium">Revision No</span>
              <span className="text-slate-800 font-semibold">1</span>
            </div>
          </div>

          {/* Right Table */}
          <div className="border rounded-lg overflow-hidden divide-y divide-border/60 text-sm">
            <div className="flex justify-between px-4 py-3 bg-white">
              <span className="text-slate-600 font-medium">Department</span>
              <span className="text-slate-800 font-semibold">Production</span>
            </div>
            <div className="flex justify-between px-4 py-3 bg-white">
              <span className="text-slate-600 font-medium">Area</span>
              <span className="text-slate-800 font-semibold">Building A</span>
            </div>
            <div className="flex justify-between px-4 py-3 bg-white">
              <span className="text-slate-600 font-medium">Line</span>
              <span className="text-slate-800 font-semibold">Progresive Medium</span>
            </div>
            <div className="flex justify-between px-4 py-3 bg-white">
              <span className="text-slate-600 font-medium">Executor</span>
              <span className="text-slate-800 font-semibold">Andre Wifi</span>
            </div>
            <div className="flex justify-between px-4 py-3 bg-white">
              <span className="text-slate-600 font-medium">Working Hours</span>
              <span className="text-slate-800 font-semibold">1 hours 23 minute</span>
            </div>
          </div>
        </div>

        {/* Checked by & Approved by Status Section (SS 1) */}
        <div className="flex flex-wrap items-start gap-16 pt-2">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-700">Checked by:</div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Clock className="size-3.5 text-amber-500" />
              <span>-</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-600">Status:</span>
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold bg-[#ea580c] text-white">
                Pending
              </span>
            </div>
            <div className="text-xs text-slate-500">Approved Date : -</div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-700">Approved by:</div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Clock className="size-3.5 text-amber-500" />
              <span>-</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-600">Status:</span>
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold bg-[#ea580c] text-white">
                Pending
              </span>
            </div>
            <div className="text-xs text-slate-500">Approved Date : -</div>
          </div>
        </div>
      </div>

      {/* Section 2: Checklist Report (SS 1) */}
      <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-lg font-bold font-display text-slate-800">Checklist Report</h2>
          <div className="text-xs font-semibold">
            Summary : <span className="text-red-500 font-bold ml-1">NG 5</span>{" "}
            <span className="text-green-600 font-bold ml-2">OK 4</span>
          </div>
        </div>

        <div className="border rounded-lg overflow-x-auto w-full bg-white">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100/50 border-b text-slate-500 uppercase text-xs font-bold tracking-wider whitespace-nowrap text-left">
                <th className="py-3 px-4 min-w-[140px] border-r">Item Check</th>
                <th className="py-3 px-4 min-w-[260px] border-r">Inspection Items</th>
                <th className="py-3 px-4 min-w-[160px] border-r">Inspection Method</th>
                <th className="py-3 px-4 min-w-[160px] border-r">Standard</th>
                <th className="py-3 px-4 text-center w-24 border-r">Status</th>
                <th className="py-3 px-4 min-w-[120px] border-r">Variable</th>
                <th className="py-3 px-4 min-w-[200px] border-r">Description of Damage</th>
                <th className="py-3 px-4 text-center w-24 border-r">Doc. SOP</th>
                <th className="py-3 px-4 text-center w-20">Preview</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {mockChecklistReportData.map((group, groupIdx) => (
                <>
                  {group.items.map((item, itemIdx) => (
                    <tr
                      key={`${groupIdx}-${itemIdx}`}
                      className="hover:bg-slate-50/70 transition-colors whitespace-nowrap"
                    >
                      {itemIdx === 0 && (
                        <td
                          rowSpan={group.items.length}
                          className="py-3 px-4 align-top font-semibold text-slate-800 bg-white border-r text-xs"
                        >
                          {group.group}
                        </td>
                      )}
                      <td className="py-3 px-4 border-r text-slate-700 text-xs">{item.check}</td>
                      <td className="py-3 px-4 border-r text-slate-600 text-xs">{item.method}</td>
                      <td className="py-3 px-4 border-r text-slate-600 text-xs">{item.standard}</td>
                      <td className="py-3 px-4 text-center border-r">
                        <span
                          className={`inline-flex items-center justify-center px-2.5 py-1 rounded text-xs font-bold ${
                            item.status === "OK"
                              ? "bg-emerald-500 text-white"
                              : "bg-red-500 text-white"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 border-r text-slate-600 text-xs">{item.variable}</td>
                      <td className="py-3 px-4 border-r text-slate-600 text-xs">{item.desc}</td>
                      <td className="py-3 px-4 text-center border-r">
                        {item.doc && (
                          <button
                            type="button"
                            className="p-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded transition-colors"
                            title="Download SOP"
                          >
                            <Download className="size-4" />
                          </button>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {item.photo && (
                          <button
                            type="button"
                            className="p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                            title="Preview Image"
                          >
                            <ImageIcon className="size-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
