import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TablePagination } from "@/components/ui-kit/page";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockRequestOrders } from "@/lib/mock-data";

export const Route = createFileRoute("/spare-part/request-order-list/$id")({
  component: RequestOrderDetail,
});

function getStatusColor(status: string) {
  if (status === "Approved") return "text-green-600 bg-green-50 border-green-200";
  if (status === "Completed") return "text-green-600 bg-green-50 border-green-200";
  if (status === "Ordered") return "text-blue-600 bg-blue-50 border-blue-200";
  if (status === "Rejected") return "text-red-600 bg-red-50 border-red-200";
  return "text-slate-600 bg-slate-50 border-slate-200";
}

function RequestOrderDetail() {
  const navigate = useNavigate();
  const { id } = Route.useParams();
  
  const order = mockRequestOrders.find(o => o.id === id) || mockRequestOrders[0] || {
    id: "RO-2026-001",
    transactionDate: "01 Sep 2026",
    groupInCharge: "Mechanical",
    teamLeader: "Approved",
    approvedBy: "John Doe",
    deliveryPlan: "15 Sep 2026",
    reasonRejected: "-",
    parts: []
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in-50 duration-500">
      <div className="flex items-center gap-4 border-b pb-4">
        <Button variant="outline" size="sm" onClick={() => navigate({ to: "/spare-part/request-order-list" })}>
          <ArrowLeft className="size-4 mr-1" /> Back
        </Button>
        <h2 className="text-xl font-bold flex items-center gap-2">
          <FileText className="size-5 text-slate-500" /> Detail Request Order
        </h2>
      </div>

      <div className="bg-white rounded-xl border shadow-sm p-6 grid grid-cols-1 md:grid-cols-4 gap-y-6 gap-x-4">
        <div>
          <div className="text-xs text-muted-foreground font-medium mb-1">Transaction Date</div>
          <div className="font-semibold">{order.transactionDate}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground font-medium mb-1">Group in Charge</div>
          <div className="font-semibold">{order.groupInCharge}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground font-medium mb-1">Team Leader</div>
          <div className="mt-1">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border inline-block ${getStatusColor(order.teamLeader)}`}>
              {order.teamLeader}
            </span>
          </div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground font-medium mb-1">Approved By</div>
          <div className="font-semibold">{order.approvedBy}</div>
        </div>
        
        <div>
          <div className="text-xs text-muted-foreground font-medium mb-1">Delivery Plan Date</div>
          <div className="font-semibold">{order.deliveryPlan}</div>
        </div>
        <div className="md:col-span-3">
          <div className="text-xs text-muted-foreground font-medium mb-1">Reason Rejected</div>
          <div className="font-semibold">{order.reasonRejected}</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
        <h3 className="font-bold text-lg">List Sparepart</h3>
        
        <div className="overflow-x-auto w-full">
          <table className="w-full text-sm min-w-max border-t">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase text-xs font-bold tracking-wider">
                <th className="py-4 px-4 text-left font-semibold">Document</th>
                <th className="py-4 px-4 text-left font-semibold">No.</th>
                <th className="py-4 px-4 text-left font-semibold">Status</th>
                <th className="py-4 px-4 text-left font-semibold">Status Ordered</th>
                <th className="py-4 px-4 text-left font-semibold">Application Area</th>
                <th className="py-4 px-4 text-left font-semibold">Item Code</th>
                <th className="py-4 px-4 text-left font-semibold">Item Name</th>
                <th className="py-4 px-4 text-left font-semibold">Specification</th>
                <th className="py-4 px-4 text-left font-semibold">Drawing No.</th>
                <th className="py-4 px-4 text-left font-semibold">Maker</th>
                <th className="py-4 px-4 text-left font-semibold">In Use</th>
                <th className="py-4 px-4 text-left font-semibold">Current Stock</th>
                <th className="py-4 px-4 text-left font-semibold">Min Qty</th>
                <th className="py-4 px-4 text-left font-semibold">Max Qty</th>
                <th className="py-4 px-4 text-left font-semibold">Order Qty</th>
                <th className="py-4 px-4 text-left font-semibold">Delivery Plan</th>
                <th className="py-4 px-4 text-left font-semibold">Delivery Actual</th>
              </tr>
            </thead>
            <tbody className="divide-y border-b">
              {order.parts.map((p, i) => (
                <tr key={i} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4">
                    <div className="p-2 border rounded-md inline-flex items-center justify-center text-slate-400 bg-white shadow-sm">
                      <FileText className="size-4" />
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">{p.docNo}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border inline-block whitespace-nowrap ${getStatusColor(p.status)}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border inline-block whitespace-nowrap ${getStatusColor(p.statusOrdered)}`}>
                      {p.statusOrdered}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{p.applicationArea}</td>
                  <td className="py-3 px-4 text-slate-600">{p.itemCode}</td>
                  <td className="py-3 px-4 text-slate-800 font-medium">{p.itemName}</td>
                  <td className="py-3 px-4 text-slate-600">{p.spec}</td>
                  <td className="py-3 px-4 text-slate-600">{p.drawNo}</td>
                  <td className="py-3 px-4 text-slate-600">{p.maker}</td>
                  <td className="py-3 px-4 text-slate-600">{p.inUse}</td>
                  <td className="py-3 px-4 text-slate-600">{p.currentStock}</td>
                  <td className="py-3 px-4 text-slate-600">{p.minQty}</td>
                  <td className="py-3 px-4 text-slate-600">{p.maxQty}</td>
                  <td className="py-3 px-4 text-slate-600">{p.orderQty}</td>
                  <td className="py-3 px-4 text-slate-600">{p.deliveryPlan}</td>
                  <td className="py-3 px-4 text-slate-600">{p.deliveryActual}</td>
                </tr>
              ))}
              {order.parts.length === 0 && (
                <tr>
                  <td colSpan={17} className="py-8 text-center text-muted-foreground">
                    No items available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <TablePagination />
      </div>
    </div>
  );
}
