import { createFileRoute } from "@tanstack/react-router";
import { Clock, Image as ImageIcon, Download } from "lucide-react";
import { approvalChecklistReport } from "@/lib/mock-data";

export const Route = createFileRoute("/approval/maintenance/$id")({
  component: MaintenanceApprovalDetails,
});

function MaintenanceApprovalDetails() {
  const { id } = Route.useParams();

  return (
    <div className="space-y-6 w-full pb-20">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold font-display">Maintenance Informations</h2>
        <span className="text-sm font-medium text-muted-foreground">
          Submit Form : <span className="text-foreground">12/12/2023 12:02</span>
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-border rounded-lg bg-surface divide-y divide-border">
          <div className="flex px-4 py-3">
            <span className="w-40 text-sm font-semibold">Checklist ID</span>
            <span className="text-sm text-muted-foreground">{id}</span>
          </div>
          <div className="flex px-4 py-3">
            <span className="w-40 text-sm font-semibold">Document Number</span>
            <span className="text-sm text-muted-foreground">TCF2/Form/ME/01/01</span>
          </div>
          <div className="flex px-4 py-3">
            <span className="w-40 text-sm font-semibold">Machine</span>
            <span className="text-sm text-muted-foreground">CRN-01 - Crane</span>
          </div>
          <div className="flex px-4 py-3">
            <span className="w-40 text-sm font-semibold">Revision No</span>
            <span className="text-sm text-muted-foreground">1</span>
          </div>
        </div>

        <div className="border border-border rounded-lg bg-surface divide-y divide-border">
          <div className="flex px-4 py-3">
            <span className="w-40 text-sm font-semibold">Department</span>
            <span className="text-sm text-muted-foreground">Production</span>
          </div>
          <div className="flex px-4 py-3">
            <span className="w-40 text-sm font-semibold">Area</span>
            <span className="text-sm text-muted-foreground">Building A</span>
          </div>
          <div className="flex px-4 py-3">
            <span className="w-40 text-sm font-semibold">Line</span>
            <span className="text-sm text-muted-foreground">Progresive Medium</span>
          </div>
          <div className="flex px-4 py-3">
            <span className="w-40 text-sm font-semibold">Executor</span>
            <span className="text-sm text-muted-foreground">Andre Wifi</span>
          </div>
          <div className="flex px-4 py-3">
            <span className="w-40 text-sm font-semibold">Working Hours</span>
            <span className="text-sm text-muted-foreground">1 hours 23 minute</span>
          </div>
        </div>
      </div>

      <div className="flex gap-16 mt-8">
        <div className="space-y-4">
          <div className="text-sm font-semibold">Checked by:</div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="size-4 text-orange-500" /> -
          </div>
          <div className="flex items-center gap-2 text-sm">
            Status: <span className="inline-flex rounded-full bg-orange-500 text-white px-3 py-0.5 text-xs font-semibold">Pending</span>
          </div>
          <div className="text-sm text-muted-foreground">Approved Date : -</div>
        </div>

        <div className="space-y-4">
          <div className="text-sm font-semibold">Approved by:</div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="size-4 text-orange-500" /> -
          </div>
          <div className="flex items-center gap-2 text-sm">
            Status: <span className="inline-flex rounded-full bg-orange-500 text-white px-3 py-0.5 text-xs font-semibold">Pending</span>
          </div>
          <div className="text-sm text-muted-foreground">Approved Date : -</div>
        </div>
      </div>

      <div className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold font-display">Checklist Report</h2>
          <div className="text-sm font-semibold">
            Summary : <span className="text-red-500 ml-1">NG 5</span> <span className="text-green-500 ml-2">OK 4</span>
          </div>
        </div>

        <div className="border border-border rounded-lg overflow-hidden bg-surface">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted text-muted-foreground border-b border-border">
              <tr>
                <th className="px-4 py-3 font-semibold w-40">Item Check</th>
                <th className="px-4 py-3 font-semibold">Inspection Items</th>
                <th className="px-4 py-3 font-semibold">Inspection Method</th>
                <th className="px-4 py-3 font-semibold">Standard</th>
                <th className="px-4 py-3 font-semibold text-center">Status</th>
                <th className="px-4 py-3 font-semibold">Variable</th>
                <th className="px-4 py-3 font-semibold">Description of Damage</th>
                <th className="px-4 py-3 font-semibold text-center">Doc. SOP</th>
                <th className="px-4 py-3 font-semibold text-center w-16">Preview</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {approvalChecklistReport.map((group, groupIdx) => (
                <>
                  {group.items.map((item, itemIdx) => (
                    <tr key={`${groupIdx}-${itemIdx}`} className="hover:bg-muted/40 group/row">
                      {itemIdx === 0 && (
                        <td rowSpan={group.items.length} className="px-4 py-3 align-top border-r border-border font-medium bg-surface">
                          {group.group}
                        </td>
                      )}
                      <td className="px-4 py-3 border-r border-border/50 text-muted-foreground">{item.check}</td>
                      <td className="px-4 py-3 border-r border-border/50 text-muted-foreground">{item.method}</td>
                      <td className="px-4 py-3 border-r border-border/50 text-muted-foreground">{item.standard}</td>
                      <td className="px-4 py-3 border-r border-border/50 text-center">
                        <span className={`inline-flex rounded px-2 py-0.5 text-xs font-bold ${
                          item.status === 'OK' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 border-r border-border/50 text-muted-foreground">{item.variable}</td>
                      <td className="px-4 py-3 border-r border-border/50 text-muted-foreground">{item.desc}</td>
                      <td className="px-4 py-3 border-r border-border/50 text-center">
                        {item.doc && (
                          <button className="p-1.5 bg-green-500 hover:bg-green-600 text-white rounded transition-colors">
                            <Download className="size-4" />
                          </button>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {item.photo && (
                          <button className="p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors">
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

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border flex justify-end px-10 z-10">
        <button className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-colors">
          Approve
        </button>
      </div>
    </div>
  );
}
