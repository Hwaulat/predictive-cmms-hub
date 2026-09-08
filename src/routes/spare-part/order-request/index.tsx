import { useState } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Menu,
  Search,
  Calendar,
  Download,
  Plus,
  FileText,
  Eye,
  Edit2,
  ArrowUpDown,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { TablePagination } from "@/components/ui-kit/page";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/spare-part/order-request/")({
  head: () => ({
    meta: [
      { title: "Order Request — Predictive CMMS Hub" },
      { name: "description", content: "Sparepart Order Request & SOR Management" },
    ],
  }),
  component: OrderRequestPage,
});

// Mock data for Order Request (Tab 1: New Order / Repeat Order)
const mockOrderRequestItems = [
  {
    id: "1",
    hasDocument: true,
    transactionDate: "08/09/2026, 14:11",
    requestedBy: "admin",
    sparepartCode: "SPR010781",
    sparepartDetail:
      "GASKET / 1050FF BLACK T=3MM / JIS10K x 100 A / EPDM / MECHANICAL / MKR000456",
    inUseQty: "-",
    currentStock: 54,
    minQty: 100,
    maxQty: 200,
    orderQty: 20,
    deliveryPlan: "09/09/2026",
  },
  {
    id: "2",
    hasDocument: true,
    transactionDate: "05/09/2026, 10:20",
    requestedBy: "admin",
    sparepartCode: "SPR000007",
    sparepartDetail: "SOLENOID VALVE / VNA-15-L / MECHANICAL",
    inUseQty: "4",
    currentStock: 2,
    minQty: 3,
    maxQty: 4,
    orderQty: 3,
    deliveryPlan: "27/08/2026",
  },
];

// Mock data for Sparepart Order Request SOR (Tab 2)
const mockSorItems = [
  {
    id: "1",
    updatePo: "Not All Yet",
    transactionDate: "04/09/2026, 17:11",
    picOrderBy: "admin",
    requestDeliveryDate: "04/09/2026",
    totalItem: 1,
    prNo: "hgghfgh",
    prName: "hyfghfgfgf",
    submitDate: "-",
  },
  {
    id: "2",
    updatePo: "Completed",
    transactionDate: "04/09/2026, 09:54",
    picOrderBy: "admin",
    requestDeliveryDate: "04/09/2026",
    totalItem: 1,
    prNo: "0010",
    prName: "Offset Link Chain",
    submitDate: "2026-09-04",
  },
  {
    id: "3",
    updatePo: "Completed",
    transactionDate: "04/09/2026, 09:43",
    picOrderBy: "admin",
    requestDeliveryDate: "04/09/2026",
    totalItem: 1,
    prNo: "0040",
    prName: "Mounting Bracket",
    submitDate: "2026-09-04",
  },
  {
    id: "4",
    updatePo: "Completed",
    transactionDate: "02/09/2026, 09:25",
    picOrderBy: "admin",
    requestDeliveryDate: "02/09/2026",
    totalItem: 1,
    prNo: "001212",
    prName: "Hasan Waulat",
    submitDate: "2026-09-02",
  },
  {
    id: "5",
    updatePo: "Completed",
    transactionDate: "01/09/2026, 14:13",
    picOrderBy: "admin",
    requestDeliveryDate: "18/09/2026",
    totalItem: 1,
    prNo: "1",
    prName: "1",
    submitDate: "2026-09-03",
  },
  {
    id: "6",
    updatePo: "Completed",
    transactionDate: "28/08/2026, 16:59",
    picOrderBy: "admin",
    requestDeliveryDate: "28/08/2026",
    totalItem: 1,
    prNo: "912312",
    prName: "tes",
    submitDate: "2026-08-06",
  },
];

function OrderRequestPage() {
  const navigate = useNavigate();

  // Top tabs: 'order-request' | 'sor'
  const [activeMainTab, setActiveMainTab] = useState<"order-request" | "sor">("order-request");

  // Sub tabs: 'new' | 'repeat'
  const [subTab, setSubTab] = useState<"new" | "repeat">("new");

  // Selection states
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedIds(mockOrderRequestItems.map((item) => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((item) => item !== id));
      setSelectAll(false);
    }
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in-50 duration-500">
      {/* Header with Title and Top-Right Tablist */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Menu className="size-6 text-slate-800" />
          <h1 className="text-2xl font-bold text-slate-800 font-display">Order Request</h1>
        </div>

        {/* Top-Right Tablist Capsule */}
        <div className="bg-slate-100 p-1 rounded-xl border flex items-center gap-1 shadow-inner">
          <button
            type="button"
            onClick={() => setActiveMainTab("order-request")}
            className={cn(
              "px-5 py-2 text-xs font-semibold rounded-lg transition-all",
              activeMainTab === "order-request"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            )}
          >
            Order Request
          </button>
          <button
            type="button"
            onClick={() => setActiveMainTab("sor")}
            className={cn(
              "px-5 py-2 text-xs font-semibold rounded-lg transition-all",
              activeMainTab === "sor"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            )}
          >
            Sparepart Order Request SOR
          </button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white border rounded-xl shadow-sm flex flex-col overflow-hidden">
        {/* Filter and Action Bar */}
        <div className="p-4 border-b flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[280px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                activeMainTab === "order-request"
                  ? "Search by requested, sparepart code, name, s..."
                  : "Search by pic order, status, pr. no & pr. name"
              }
              className="pl-9 bg-slate-50/50 w-full"
            />
          </div>

          {/* Sub-tabs Capsule: New Order | Repeat Order */}
          <div className="bg-slate-100 p-1 rounded-lg border flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSubTab("new")}
              className={cn(
                "px-4 py-1.5 text-xs font-medium rounded-md transition-all",
                subTab === "new"
                  ? "bg-white text-slate-800 shadow-sm font-semibold"
                  : "text-slate-500 hover:text-slate-800"
              )}
            >
              New Order
            </button>
            <button
              type="button"
              onClick={() => setSubTab("repeat")}
              className={cn(
                "px-4 py-1.5 text-xs font-medium rounded-md transition-all",
                subTab === "repeat"
                  ? "bg-white text-slate-800 shadow-sm font-semibold"
                  : "text-slate-500 hover:text-slate-800"
              )}
            >
              Repeat Order
            </button>
          </div>

          {/* Date Picker Button */}
          <div className="h-9 px-3 rounded-md border border-input bg-white text-xs flex items-center gap-2 text-slate-600 cursor-pointer hover:bg-slate-50">
            <Calendar className="size-3.5 text-slate-400" />
            <span>Select date range</span>
          </div>

          {/* Action buttons specific to Order Request tab */}
          {activeMainTab === "order-request" && (
            <>
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-4 text-xs font-medium bg-slate-50 text-slate-600 hover:bg-slate-100"
              >
                Reject ({selectedIds.length})
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-4 text-xs font-medium bg-slate-50 text-slate-600 hover:bg-slate-100"
              >
                Approve ({selectedIds.length})
              </Button>
              <Link to="/spare-part/order-request/create-sor" search={{ type: subTab }}>
                <Button
                  size="sm"
                  className="h-9 px-4 text-xs font-semibold bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white"
                >
                  <Plus className="size-3.5 mr-1.5" /> Create SOR
                </Button>
              </Link>
            </>
          )}

          {/* Download Excel Button */}
          <Button
            size="sm"
            className="h-9 px-4 text-xs font-semibold bg-[#f97316] hover:bg-[#ea580c] text-white"
          >
            <Download className="size-3.5 mr-1.5" /> Download Excel
          </Button>
        </div>

        {/* TAB 1: Order Request Table (SS 1 & SS 2) */}
        {activeMainTab === "order-request" && (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100/50 border-b text-slate-500 uppercase text-xs font-bold tracking-wider whitespace-nowrap">
                  <th className="py-4 px-4 text-center w-10">
                    <Checkbox
                      checked={selectAll}
                      onCheckedChange={(checked) => handleSelectAll(Boolean(checked))}
                    />
                  </th>
                  <th className="py-3.5 px-4 text-left font-semibold">DOCUMENT</th>
                  <th className="py-3.5 px-4 text-left font-semibold">
                    <div className="inline-flex items-center gap-1 cursor-pointer">
                      TRANSACTION DATE <ArrowUpDown className="size-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4 text-left font-semibold">
                    <div className="inline-flex items-center gap-1 cursor-pointer">
                      REQUESTED BY <ArrowUpDown className="size-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4 text-left font-semibold">
                    <div className="inline-flex items-center gap-1 cursor-pointer">
                      SPAREPART CODE <ArrowUpDown className="size-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4 text-left font-semibold">
                    <div className="inline-flex items-center gap-1 cursor-pointer">
                      SPAREPART DETAIL <ArrowUpDown className="size-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4 text-left font-semibold">
                    <div className="inline-flex items-center gap-1 cursor-pointer">
                      IN USE QTY <ArrowUpDown className="size-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4 text-left font-semibold">
                    <div className="inline-flex items-center gap-1 cursor-pointer">
                      CURRENT STOCK <ArrowUpDown className="size-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4 text-left font-semibold">
                    <div className="inline-flex items-center gap-1 cursor-pointer">
                      MIN QTY <ArrowUpDown className="size-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4 text-left font-semibold">
                    <div className="inline-flex items-center gap-1 cursor-pointer">
                      MAX QTY <ArrowUpDown className="size-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4 text-left font-semibold">
                    <div className="inline-flex items-center gap-1 cursor-pointer">
                      ORDER QTY <ArrowUpDown className="size-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4 text-left font-semibold">
                    <div className="inline-flex items-center gap-1 cursor-pointer">
                      DELIVERY PLAN <ArrowUpDown className="size-3 text-slate-400" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {mockOrderRequestItems.map((item) => {
                  const isChecked = selectedIds.includes(item.id);
                  return (
                    <tr
                      key={item.id}
                      className={cn(
                        "hover:bg-slate-50/70 transition-colors whitespace-nowrap",
                        isChecked && "bg-blue-50/40"
                      )}
                    >
                      <td className="py-3 px-4 text-center">
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={(checked) => handleToggleRow(item.id, Boolean(checked))}
                        />
                      </td>
                      <td className="py-3 px-4">
                        <div className="size-8 rounded-lg border bg-white flex items-center justify-center text-slate-400 shadow-xs">
                          <FileText className="size-4" />
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-700">{item.transactionDate}</td>
                      <td className="py-3 px-4 text-slate-800 font-medium">{item.requestedBy}</td>
                      <td className="py-3 px-4 font-mono text-slate-800 font-medium">
                        {item.sparepartCode}
                      </td>
                      <td className="py-3 px-4 text-slate-700 max-w-md truncate">
                        {item.sparepartDetail}
                      </td>
                      <td className="py-3 px-4 text-slate-600">{item.inUseQty}</td>
                      <td className="py-3 px-4 text-slate-800 font-semibold">{item.currentStock}</td>
                      <td className="py-3 px-4 text-slate-600">{item.minQty}</td>
                      <td className="py-3 px-4 text-slate-600">{item.maxQty}</td>
                      <td className="py-3 px-4 text-slate-800 font-semibold">{item.orderQty}</td>
                      <td className="py-3 px-4 text-slate-700">{item.deliveryPlan}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: Sparepart Order Request SOR Table (SS 5) */}
        {activeMainTab === "sor" && (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100/50 border-b text-slate-500 uppercase text-xs font-bold tracking-wider whitespace-nowrap">
                  <th className="py-4 px-4 text-left font-semibold">ACTION</th>
                  <th className="py-3.5 px-4 text-left font-semibold">UPDATE PO</th>
                  <th className="py-3.5 px-4 text-left font-semibold">
                    <div className="inline-flex items-center gap-1 cursor-pointer">
                      TRANSACTION DATE <ArrowUpDown className="size-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4 text-left font-semibold">PIC ORDER BY</th>
                  <th className="py-3.5 px-4 text-left font-semibold">REQUEST DELIVERY DATE</th>
                  <th className="py-3.5 px-4 text-left font-semibold">
                    <div className="inline-flex items-center gap-1 cursor-pointer">
                      TOTAL ITEM <ArrowUpDown className="size-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4 text-left font-semibold">PR NO.</th>
                  <th className="py-3.5 px-4 text-left font-semibold">PR NAME.</th>
                  <th className="py-3.5 px-4 text-left font-semibold">SUBMIT DATE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {mockSorItems.map((sor) => (
                  <tr key={sor.id} className="hover:bg-slate-50/70 transition-colors whitespace-nowrap">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:text-primary bg-white shadow-xs"
                          title="View"
                        >
                          <Eye className="size-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:text-primary bg-white shadow-xs"
                          title="Download"
                        >
                          <Download className="size-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:text-primary bg-white shadow-xs"
                          title="Edit"
                        >
                          <Edit2 className="size-4" />
                        </Button>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {sor.updatePo === "Completed" ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-600 border border-purple-200">
                          Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-600 border border-rose-200">
                          Not All Yet
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-700">{sor.transactionDate}</td>
                    <td className="py-3 px-4 text-slate-800 font-medium">{sor.picOrderBy}</td>
                    <td className="py-3 px-4 text-slate-700">{sor.requestDeliveryDate}</td>
                    <td className="py-3 px-4 text-slate-800 font-medium">{sor.totalItem}</td>
                    <td className="py-3 px-4 text-slate-800 font-mono">{sor.prNo}</td>
                    <td className="py-3 px-4 text-slate-800 font-medium">{sor.prName}</td>
                    <td className="py-3 px-4 text-slate-500">{sor.submitDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination at bottom */}
        <TablePagination />
      </div>
    </div>
  );
}
