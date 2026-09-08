import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui-kit/page";

export const Route = createFileRoute("/work-order/$id")({
  component: WorkOrderDetailPage,
});

function WorkOrderDetailPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 w-full pb-20">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate({ to: "/work-order" })}>
          <ArrowLeft className="size-4" />
        </Button>
        <PageHeader title="Work Order Detail" description="View work order information" />
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold font-display">Maintenance Informations</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-border rounded-lg bg-surface divide-y divide-border">
            <div className="flex px-4 py-3">
              <span className="w-40 text-sm font-semibold">Work Order ID</span>
              <span className="text-sm text-muted-foreground">{id}</span>
            </div>
            <div className="flex px-4 py-3">
              <span className="w-40 text-sm font-semibold">Document Number</span>
              <span className="text-sm text-muted-foreground">TCF2/Form/ME/01/01</span>
            </div>
            <div className="flex px-4 py-3">
              <span className="w-40 text-sm font-semibold">Work Order Type</span>
              <span className="text-sm text-muted-foreground">General</span>
            </div>
            <div className="flex px-4 py-3">
              <span className="w-40 text-sm font-semibold">Item</span>
              <span className="text-sm text-muted-foreground">Bearing Sealing</span>
            </div>
          </div>

          <div className="border border-border rounded-lg bg-surface divide-y divide-border h-fit">
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
          </div>
        </div>

        <div className="pt-4 space-y-4">
          <h2 className="text-xl font-bold font-display">Corrective</h2>
          
          <div className="space-y-4">
            <div className="text-sm font-semibold">Approved by:</div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
              <CheckCircle2 className="size-4 text-green-500" /> Hasan
            </div>
            <div className="flex items-center gap-2 text-sm mt-4">
              Status: <span className="inline-flex rounded bg-green-500 text-white px-3 py-1 text-xs font-semibold">Approved</span>
            </div>
            <div className="text-sm text-muted-foreground">Approved Date : 09/08/2024 10:00</div>
          </div>
        </div>

        <div className="pt-4 border border-border rounded-lg overflow-hidden bg-surface">
          <table className="w-full text-sm text-left">
            <thead className="bg-surface text-muted-foreground border-b border-border">
              <tr>
                <th colSpan={2} className="px-4 py-3 font-semibold text-foreground bg-muted">Damage Report</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="hover:bg-muted/40">
                <td className="px-4 py-3 font-semibold w-1/3">WO Created Date</td>
                <td className="px-4 py-3 text-muted-foreground">09 August 2024 10:17</td>
              </tr>
              <tr className="hover:bg-muted/40">
                <td className="px-4 py-3 font-semibold">Reported by</td>
                <td className="px-4 py-3 text-muted-foreground">Shendy Wijaksana</td>
              </tr>
              <tr className="hover:bg-muted/40">
                <td className="px-4 py-3 font-semibold">Description Damage</td>
                <td className="px-4 py-3 text-muted-foreground">The machine motor died and did not rotate so the production process was delayed for up to 1 minute.</td>
              </tr>
              <tr className="hover:bg-muted/40">
                <td className="px-4 py-3 font-semibold align-top">Damage Photo</td>
                <td className="px-4 py-3 text-blue-600 flex flex-col gap-2">
                  <a href="#" className="hover:underline">Photo_Kerusakan.JPG</a>
                  <a href="#" className="hover:underline">Photo_Kerusakan.JPG</a>
                  <a href="#" className="hover:underline">Photo_Kerusakan.JPG</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
