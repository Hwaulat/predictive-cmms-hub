import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TablePagination } from "@/components/ui-kit/page";

export const Route = createFileRoute("/spare-part/stock-transaction/$id")({
  head: () => ({
    meta: [
      { title: "Details Stock Transaction — Predictive CMMS Hub" },
      { name: "description", content: "Details of Sparepart Stock Transaction" },
    ],
  }),
  component: DetailsStockTransactionPage,
});

function DetailsStockTransactionPage() {
  const navigate = useNavigate();
  const { id } = Route.useParams();

  const isOut = id.startsWith("out") || id === "2";

  // Data matching SS 1 (Inventory In) or SS 5 (Inventory Out)
  const detailData = isOut
    ? {
        transactionDate: "27/08/2026, 17:42",
        receiveBy: "Tester01",
        statusActivity: "Submitted",
        statusApproval: "Approved",
        reasonRejected: "-",
        totalSparepart: 1,
        items: [
          {
            no: 1,
            sparepartCode: "SPR000007",
            sparepartDetails: "SOLENOID VALVE / VNA-15-L / 45KPA / CKD",
            quantity: 1,
            price: "3.687.000",
            remarks: "testing",
            store: "SPR",
            rack: "101 A",
          },
        ],
      }
    : {
        transactionDate: "27/08/2026, 16:39",
        receiveBy: "Tester01",
        statusActivity: "Submitted",
        statusApproval: "Approved",
        reasonRejected: "-",
        totalSparepart: 1,
        items: [
          {
            no: 1,
            sparepartCode: "SPR000007",
            sparepartDetails: "SOLENOID VALVE / VNA-15-L / 45KPA / CKD",
            quantity: 4,
            price: "3.687.000",
            remarks: "COBA",
            store: "SPR",
            rack: "101 A",
          },
        ],
      };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in-50 duration-500">
      {/* Top Header Bar */}
      <div className="flex items-center gap-4 border-b pb-4">
        <Button
          variant="outline"
          className="bg-white text-slate-700"
          onClick={() =>
            navigate({
              to: "/spare-part/stock-transaction",
              search: { tab: isOut ? "out" : "in" },
            } as any)
          }
        >
          <ArrowLeft className="size-4 mr-2" /> Back
        </Button>
        <div className="flex items-center gap-2">
          <Eye className="size-5 text-slate-700" />
          <h1 className="text-xl font-bold text-slate-800 font-display">
            Details Stock Transaction
          </h1>
        </div>
      </div>

      {/* Top Summary Card (SS 1 & SS 5) */}
      <div className="bg-white rounded-xl border shadow-sm p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <div className="text-xs text-slate-400 font-medium mb-1">Transaction Date</div>
            <div className="text-sm font-bold text-slate-800">{detailData.transactionDate}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium mb-1">Receive By</div>
            <div className="text-sm font-bold text-slate-800">{detailData.receiveBy}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium mb-1">Status Activity</div>
            <div>
              <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
                {detailData.statusActivity}
              </span>
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium mb-1">Status Approval</div>
            <div>
              <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
                {detailData.statusApproval}
              </span>
            </div>
          </div>
        </div>

        <div>
          <div className="text-xs text-slate-400 font-medium mb-1">Reason Rejected</div>
          <div className="text-sm font-bold text-slate-800">{detailData.reasonRejected}</div>
        </div>
      </div>

      {/* Main List Sparepart Card (SS 1 & SS 5) */}
      <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-base text-slate-800">List Sparepart</h2>
          <div className="text-sm font-medium text-slate-700">
            Total Sparepart : <span className="font-bold">{detailData.totalSparepart}</span>
          </div>
        </div>

        <div className="border rounded-lg overflow-x-auto w-full bg-white">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100/50 border-b text-slate-500 uppercase text-xs font-bold tracking-wider whitespace-nowrap text-left">
                <th className="py-4 px-4 w-16">NO.</th>
                <th className="py-4 px-4 min-w-[170px]">SPAREPART CODE</th>
                <th className="py-4 px-4 min-w-[280px]">SPAREPART DETAILS</th>
                <th className="py-4 px-4 min-w-[120px]">QUANTITY</th>
                <th className="py-4 px-4 min-w-[140px]">PRICE</th>
                <th className="py-4 px-4 min-w-[140px]">REMARKS</th>
                <th className="py-4 px-4 min-w-[120px]">STORE</th>
                <th className="py-4 px-4 min-w-[120px]">RACK</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {detailData.items.map((item) => (
                <tr key={item.no} className="hover:bg-slate-50/70 transition-colors whitespace-nowrap">
                  <td className="py-3 px-4 text-slate-700">{item.no}</td>
                  <td className="py-3 px-4 font-mono font-medium text-slate-800">
                    {item.sparepartCode}
                  </td>
                  <td className="py-3 px-4 text-slate-700 max-w-md truncate">
                    {item.sparepartDetails}
                  </td>
                  <td className="py-3 px-4 text-slate-800 font-semibold">{item.quantity}</td>
                  <td className="py-3 px-4 text-slate-700 font-medium">{item.price}</td>
                  <td className="py-3 px-4 text-slate-700">{item.remarks}</td>
                  <td className="py-3 px-4 text-slate-800 font-medium">{item.store}</td>
                  <td className="py-3 px-4 text-blue-500 italic font-medium">{item.rack}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <TablePagination />
      </div>
    </div>
  );
}
