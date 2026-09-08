import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Eye, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TablePagination } from "@/components/ui-kit/page";

export const Route = createFileRoute("/spare-part/order-request/$id")({
  head: () => ({
    meta: [
      { title: "Detail SOR — Predictive CMMS Hub" },
      { name: "description", content: "Detail Sparepart Order Request (SOR)" },
    ],
  }),
  component: DetailSorPage,
});

// Mock detail data based on SOR ID
const mockSorDetailsMap: Record<
  string,
  {
    transactionDate: string;
    status: string;
    picOrderBy: string;
    requestDeliveryDate: string;
    prNo: string;
    prName: string;
    submitDateToPurchase: string;
    updatePo: string;
    items: Array<{
      no: number;
      requestedBy: string;
      itemCode: string;
      deliveryActual: string;
      sparepartCode: string;
      sparepartDetail: string;
      poNumber: string;
      poDate: string;
      supplier: string;
      orderQty: number;
      pricePr: string;
      totalPricePr: string;
      prNo: string;
      pricePo: string;
      totalPricePo: string;
      inUseQty: number | string;
      currentStock: number;
      minQty: number;
      maxQty: number;
      deliveryPlan: string;
    }>;
  }
> = {
  "1": {
    transactionDate: "04/09/2026, 17:11",
    status: "New Order",
    picOrderBy: "admin",
    requestDeliveryDate: "04/09/2026",
    prNo: "hgghfgh",
    prName: "hyfghfgfgf",
    submitDateToPurchase: "-",
    updatePo: "Not All Yet",
    items: [
      {
        no: 1,
        requestedBy: "admin",
        itemCode: "SPR010781",
        deliveryActual: "-",
        sparepartCode: "SPR010781",
        sparepartDetail:
          "GASKET / 1050FF BLACK T=3MM / JIS10K x 100 A / EPDM / MECHANICAL / MKR000456",
        poNumber: "-",
        poDate: "-",
        supplier: "-",
        orderQty: 20,
        pricePr: "Rp. 20.000",
        totalPricePr: "Rp. 400.000",
        prNo: "hgghfgh",
        pricePo: "-",
        totalPricePo: "Rp. 0",
        inUseQty: 0,
        currentStock: 54,
        minQty: 100,
        maxQty: 200,
        deliveryPlan: "04/09/2026",
      },
    ],
  },
};

function DetailSorPage() {
  const navigate = useNavigate();
  const { id } = Route.useParams();

  const sor = mockSorDetailsMap[id] || mockSorDetailsMap["1"]!;

  return (
    <div className="space-y-6 pb-20 animate-in fade-in-50 duration-500">
      {/* Top Header Bar */}
      <div className="flex items-center gap-4 border-b pb-4">
        <Button
          variant="outline"
          className="bg-white text-slate-700"
          onClick={() => navigate({ to: "/spare-part/order-request" })}
        >
          <ArrowLeft className="size-4 mr-2" /> Back
        </Button>
        <div className="flex items-center gap-2">
          <Eye className="size-5 text-slate-700" />
          <h1 className="text-xl font-bold text-slate-800 font-display">Detail SOR</h1>
        </div>
      </div>

      {/* Top Summary Card (SS 5) */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <div className="text-xs text-slate-400 font-medium mb-1">Transaction Date</div>
            <div className="text-sm font-bold text-slate-800">{sor.transactionDate}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium mb-1">Status</div>
            <div>
              <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-600 border border-purple-200">
                {sor.status}
              </span>
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium mb-1">PIC Order By</div>
            <div className="text-sm font-bold text-slate-800">{sor.picOrderBy}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium mb-1">Request Delivery Date</div>
            <div className="text-sm font-bold text-slate-800">{sor.requestDeliveryDate}</div>
          </div>

          <div>
            <div className="text-xs text-slate-400 font-medium mb-1">PR No.</div>
            <div className="text-sm font-bold text-slate-800">{sor.prNo}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium mb-1">PR. Name</div>
            <div className="text-sm font-bold text-slate-800">{sor.prName}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium mb-1">Submit Date to Purchase</div>
            <div className="text-sm font-bold text-slate-800">{sor.submitDateToPurchase}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium mb-1">Update PO</div>
            <div>
              <span
                className={`inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold ${
                  sor.updatePo === "Completed"
                    ? "bg-purple-50 text-purple-600 border border-purple-200"
                    : "bg-rose-50 text-rose-600 border border-rose-200"
                }`}
              >
                {sor.updatePo}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main List Sparepart Card (SS 5) with Combined Columns (SS 1, 2, 3, 4) */}
      <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
        <h2 className="font-bold text-base text-slate-800">List Sparepart</h2>

        <div className="border rounded-lg overflow-x-auto w-full bg-white">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100/50 border-b text-slate-500 uppercase text-xs font-bold tracking-wider whitespace-nowrap text-left">
                <th className="py-4 px-4 text-left w-12">ACTION</th>
                <th className="py-4 px-4">NO.</th>
                <th className="py-4 px-4 min-w-[140px]">
                  <div className="inline-flex items-center gap-1 cursor-pointer">
                    REQUESTED BY <ArrowUpDown className="size-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-4 px-4 min-w-[130px]">ITEM CODE</th>
                <th className="py-4 px-4 min-w-[140px]">DELIVERY ACTUAL</th>
                <th className="py-4 px-4 min-w-[200px]">
                  <div className="inline-flex items-center gap-1 cursor-pointer">
                    SPAREPART CODE <ArrowUpDown className="size-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-4 px-4 min-w-[260px]">
                  <div className="inline-flex items-center gap-1 cursor-pointer">
                    SPAREPART DETAIL <ArrowUpDown className="size-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-4 px-4 min-w-[140px]">
                  <div className="inline-flex items-center gap-1 cursor-pointer">
                    PO. NUMBER <ArrowUpDown className="size-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-4 px-4 min-w-[130px]">
                  <div className="inline-flex items-center gap-1 cursor-pointer">
                    PO DATE <ArrowUpDown className="size-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-4 px-4 min-w-[140px]">SUPPLIER</th>
                <th className="py-4 px-4 min-w-[100px]">ORDER QTY</th>
                <th className="py-4 px-4 min-w-[120px]">PRICE PR</th>
                <th className="py-4 px-4 min-w-[140px]">TOTAL PRICE PR</th>
                <th className="py-4 px-4 min-w-[120px]">PR NO</th>
                <th className="py-4 px-4 min-w-[120px]">PRICE PO</th>
                <th className="py-4 px-4 min-w-[140px]">TOTAL PRICE PO</th>
                <th className="py-4 px-4 min-w-[100px]">IN USE QTY</th>
                <th className="py-4 px-4 min-w-[120px]">CURRENT STOCK</th>
                <th className="py-4 px-4 min-w-[90px]">MIN QTY</th>
                <th className="py-4 px-4 min-w-[90px]">MAX QTY</th>
                <th className="py-4 px-4 min-w-[140px]">DELIVERY PLAN</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {sor.items.map((item) => (
                <tr key={item.no} className="hover:bg-slate-50/70 transition-colors whitespace-nowrap">
                  <td className="py-3 px-4 text-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-8 text-slate-400 hover:text-primary border bg-white shadow-xs"
                      title="View Details"
                    >
                      <Eye className="size-4" />
                    </Button>
                  </td>
                  <td className="py-3 px-4 text-slate-700">{item.no}</td>
                  <td className="py-3 px-4 text-slate-800 font-medium">{item.requestedBy}</td>
                  <td className="py-3 px-4 font-mono text-slate-800 font-medium">{item.itemCode}</td>
                  <td className="py-3 px-4 text-slate-500">{item.deliveryActual}</td>
                  <td className="py-3 px-4 font-mono text-slate-800 font-medium">
                    {item.sparepartCode}
                  </td>
                  <td className="py-3 px-4 text-slate-700 max-w-md truncate">
                    {item.sparepartDetail}
                  </td>
                  <td className="py-3 px-4 text-slate-600">{item.poNumber}</td>
                  <td className="py-3 px-4 text-slate-600">{item.poDate}</td>
                  <td className="py-3 px-4 text-slate-600">{item.supplier}</td>
                  <td className="py-3 px-4 text-slate-800 font-semibold">{item.orderQty}</td>
                  <td className="py-3 px-4 text-slate-800 font-medium">{item.pricePr}</td>
                  <td className="py-3 px-4 text-slate-800 font-semibold">{item.totalPricePr}</td>
                  <td className="py-3 px-4 font-mono text-slate-800">{item.prNo}</td>
                  <td className="py-3 px-4 text-slate-600">{item.pricePo}</td>
                  <td className="py-3 px-4 text-slate-700 font-semibold">{item.totalPricePo}</td>
                  <td className="py-3 px-4 text-slate-600">{item.inUseQty}</td>
                  <td className="py-3 px-4 text-slate-800 font-semibold">{item.currentStock}</td>
                  <td className="py-3 px-4 text-slate-600">{item.minQty}</td>
                  <td className="py-3 px-4 text-slate-600">{item.maxQty}</td>
                  <td className="py-3 px-4 text-slate-700">{item.deliveryPlan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination at bottom */}
        <TablePagination />
      </div>
    </div>
  );
}
