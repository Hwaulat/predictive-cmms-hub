import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  CheckCircle2,
  Search,
  Calendar,
  Eye,
  FileText,
  ArrowLeft,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TablePagination } from "@/components/ui-kit/page";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/approval/spare-part")({
  head: () => ({
    meta: [
      { title: "Spare Part Approval — Predictive CMMS Hub" },
      {
        name: "description",
        content: "Approval for Spare Part Request Orders and Stock Transactions.",
      },
    ],
  }),
  component: ApprovalSparePartPage,
});

// Mock Data: Request Order Approval List (SS 1)
interface RequestOrderItem {
  id: string;
  status: string;
  requestedBy: string;
  transactionDate: string;
  revNo: string;
  groupInCharge: string;
  itemName: string;
}

const mockRequestOrders: RequestOrderItem[] = [
  {
    id: "1",
    status: "Approved",
    requestedBy: "admin",
    transactionDate: "08/09/2026, 14:11",
    revNo: "00",
    groupInCharge: "MECHANICAL - TECHNOLOGY",
    itemName: "GASKET",
  },
  {
    id: "2",
    status: "Approved",
    requestedBy: "admin",
    transactionDate: "04/09/2026, 17:11",
    revNo: "00",
    groupInCharge: "MECHANICAL - ENTRY",
    itemName: "GASKET",
  },
  {
    id: "3",
    status: "Approved",
    requestedBy: "admin",
    transactionDate: "04/09/2026, 09:33",
    revNo: "00",
    groupInCharge: "MECHANICAL - ENTRY",
    itemName: "Offset Link Chain",
  },
  {
    id: "4",
    status: "Approved",
    requestedBy: "admin",
    transactionDate: "04/09/2026, 09:24",
    revNo: "00",
    groupInCharge: "MECHANICAL - DELIVERY",
    itemName: "Brake Pad",
  },
  {
    id: "5",
    status: "Approved",
    requestedBy: "admin",
    transactionDate: "31/08/2026, 10:13",
    revNo: "00",
    groupInCharge: "MECHANICAL - TECHNOLOGY",
    itemName: "GASKET",
  },
  {
    id: "6",
    status: "Approved",
    requestedBy: "admin",
    transactionDate: "28/08/2026, 17:05",
    revNo: "00",
    groupInCharge: "MECHANICAL - FURNACE",
    itemName: "GASKET",
  },
  {
    id: "7",
    status: "Approved",
    requestedBy: "admin",
    transactionDate: "28/08/2026, 16:59",
    revNo: "00",
    groupInCharge: "MECHANICAL - FURNACE",
    itemName: "GASKET",
  },
  {
    id: "8",
    status: "Approved",
    requestedBy: "admin",
    transactionDate: "28/08/2026, 10:32",
    revNo: "00",
    groupInCharge: "MECHANICAL - TECHNOLOGY",
    itemName: "GASKET",
  },
];

// Mock Data: Stock Transaction Approval List (SS 3)
interface StockTransactionItem {
  id: string;
  no: number;
  status: string;
  transactionDate: string;
  receiveBy: string;
  sparepartName: string;
}

const mockStockIn: StockTransactionItem[] = [
  {
    id: "st-in-1",
    no: 1,
    status: "Approved",
    transactionDate: "27/08/2026, 16:39",
    receiveBy: "Tester01",
    sparepartName: "SOLENOID VALVE",
  },
];

const mockStockOut: StockTransactionItem[] = [
  {
    id: "st-out-1",
    no: 1,
    status: "Approved",
    transactionDate: "27/08/2026, 17:42",
    receiveBy: "Tester01",
    sparepartName: "SOLENOID VALVE",
  },
];

function ApprovalSparePartPage() {
  // Main Tablist: only 2 tabs as requested
  const [mainTab, setMainTab] = useState<"request-order" | "stock-transaction">("request-order");

  // Stock Transaction Subtab: "in" | "out"
  const [stockSubTab, setStockSubTab] = useState<"in" | "out">("in");

  // Detail View State: null | "ro-detail" | "stock-detail"
  const [activeDetail, setActiveDetail] = useState<{
    type: "ro" | "stock";
    stockType?: "in" | "out";
    id: string;
  } | null>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [gicFilter, setGicFilter] = useState("all");

  // ==========================================
  // VIEW: DETAILS REQUEST ORDER (SS 2)
  // ==========================================
  if (activeDetail?.type === "ro") {
    return (
      <div className="space-y-6 pb-20 animate-in fade-in-50 duration-500">
        {/* Top Header Bar with Reject & Approve buttons aligned with Details title */}
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="bg-white text-slate-700"
              onClick={() => setActiveDetail(null)}
            >
              <ArrowLeft className="size-4 mr-2" /> Back
            </Button>
            <div className="flex items-center gap-2">
              <Eye className="size-5 text-slate-700" />
              <h1 className="text-xl font-bold text-slate-800 font-display">Details</h1>
            </div>
          </div>

          {/* Action buttons aligned with Details */}
          <div className="flex items-center gap-3">
            <Button className="bg-rose-600 hover:bg-rose-700 text-white font-semibold px-6 shadow-sm">
              Reject
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 shadow-sm">
              Approve
            </Button>
          </div>
        </div>

        {/* Top Summary Card (SS 2) */}
        <div className="bg-white rounded-xl border shadow-sm p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <div className="text-xs text-slate-400 font-medium mb-1">Requested by</div>
              <div className="text-sm font-bold text-slate-800">admin</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium mb-1">Transaction Date</div>
              <div className="text-sm font-bold text-slate-800">08/09/2026, 14:11</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium mb-1">Department</div>
              <div className="text-sm font-bold text-slate-800">MECHANICAL - TECHNOLOGY</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium mb-1">Status</div>
              <div>
                <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
                  Approved
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="text-xs text-slate-400 font-medium mb-1">Reason Rejected</div>
            <div className="text-sm font-bold text-slate-800">-</div>
          </div>
        </div>

        {/* Main List Sparepart Card (SS 2) */}
        <div className="bg-white rounded-xl border shadow-sm flex flex-col">
          <div className="p-4 border-b">
            <h2 className="font-bold text-base text-slate-800">List Sparepart</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-100/50 text-slate-500 uppercase text-xs font-bold tracking-wider border-b whitespace-nowrap text-left">
                  <th className="py-4 px-4 text-left w-24">Document</th>
                  <th className="py-4 px-4">No.</th>
                  <th className="py-4 px-4 min-w-[150px]">
                    <div className="inline-flex items-center gap-1 cursor-pointer">
                      Application Area <ArrowUpDown className="size-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-4 px-4 min-w-[130px]">Item Code</th>
                  <th className="py-4 px-4 min-w-[140px]">
                    <div className="inline-flex items-center gap-1 cursor-pointer">
                      Item Name <ArrowUpDown className="size-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-4 px-4 min-w-[200px]">
                    <div className="inline-flex items-center gap-1 cursor-pointer">
                      Specification <ArrowUpDown className="size-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-4 px-4 min-w-[140px]">
                    <div className="inline-flex items-center gap-1 cursor-pointer">
                      Drawing No. <ArrowUpDown className="size-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-4 px-4 min-w-[130px]">
                    <div className="inline-flex items-center gap-1 cursor-pointer">
                      Maker <ArrowUpDown className="size-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-4 px-4 min-w-[100px]">
                    <div className="inline-flex items-center gap-1 cursor-pointer">
                      In Use <ArrowUpDown className="size-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-4 px-4 min-w-[130px]">
                    <div className="inline-flex items-center gap-1 cursor-pointer">
                      Current Stock <ArrowUpDown className="size-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-4 px-4 min-w-[100px]">
                    <div className="inline-flex items-center gap-1 cursor-pointer">
                      Min Qty <ArrowUpDown className="size-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-4 px-4 min-w-[100px]">
                    <div className="inline-flex items-center gap-1 cursor-pointer">
                      Max Qty <ArrowUpDown className="size-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-4 px-4 min-w-[110px]">
                    <div className="inline-flex items-center gap-1 cursor-pointer">
                      Order Qty <ArrowUpDown className="size-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-4 px-4 min-w-[140px]">
                    <div className="inline-flex items-center gap-1 cursor-pointer">
                      Delivery Plan <ArrowUpDown className="size-3 text-slate-400" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr className="hover:bg-slate-50/50 transition-colors whitespace-nowrap">
                  <td className="py-3 px-4 text-center">
                    <div className="inline-flex items-center justify-center size-8 rounded border bg-slate-50 text-slate-400">
                      <FileText className="size-4" />
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-700">1</td>
                  <td className="py-3 px-4 text-slate-700">area 1</td>
                  <td className="py-3 px-4 font-mono font-medium text-slate-800">SPR010781</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">GASKET</td>
                  <td className="py-3 px-4 text-slate-700">1050FF BLACK T=3MM</td>
                  <td className="py-3 px-4 text-slate-700">MECHANICAL</td>
                  <td className="py-3 px-4 text-slate-700">MKR000456</td>
                  <td className="py-3 px-4 text-slate-600">0</td>
                  <td className="py-3 px-4 text-slate-800 font-semibold">54</td>
                  <td className="py-3 px-4 text-slate-600">100</td>
                  <td className="py-3 px-4 text-slate-600">200</td>
                  <td className="py-3 px-4 text-slate-800 font-semibold">20</td>
                  <td className="py-3 px-4 text-slate-700">09/09/2026</td>
                </tr>
              </tbody>
            </table>
          </div>

          <TablePagination />
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: DETAILS STOCK TRANSACTION (SS 4)
  // ==========================================
  if (activeDetail?.type === "stock") {
    const isStockIn = activeDetail.stockType === "in";
    const dateStr = isStockIn ? "27/08/2026, 16:39" : "27/08/2026, 17:42";
    const titleText = isStockIn ? "Details Stock Transaction (IN)" : "Details Stock Transaction (OUT)";
    const qtyVal = isStockIn ? 4 : 1;
    const remarksVal = isStockIn ? "COBA" : "testing";

    return (
      <div className="space-y-6 pb-20 animate-in fade-in-50 duration-500">
        {/* Top Header Bar with Reject & Approve buttons aligned with Details title */}
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="bg-white text-slate-700"
              onClick={() => setActiveDetail(null)}
            >
              <ArrowLeft className="size-4 mr-2" /> Back
            </Button>
            <div className="flex items-center gap-2">
              <Eye className="size-5 text-slate-700" />
              <h1 className="text-xl font-bold text-slate-800 font-display">{titleText}</h1>
            </div>
          </div>

          {/* Action buttons aligned with Details */}
          <div className="flex items-center gap-3">
            <Button className="bg-rose-600 hover:bg-rose-700 text-white font-semibold px-6 shadow-sm">
              Reject
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 shadow-sm">
              Approve
            </Button>
          </div>
        </div>

        {/* Top Summary Card (SS 4) */}
        <div className="bg-white rounded-xl border shadow-sm p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <div className="text-xs text-slate-400 font-medium mb-1">Transaction Date</div>
              <div className="text-sm font-bold text-slate-800">{dateStr}</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium mb-1">Receive by</div>
              <div className="text-sm font-bold text-slate-800">Tester01</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium mb-1">Status Approval</div>
              <div>
                <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
                  Approved
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="text-xs text-slate-400 font-medium mb-1">Reason Rejected</div>
            <div className="text-sm font-bold text-slate-800">-</div>
          </div>
        </div>

        {/* List Sparepart Card (SS 4) */}
        <div className="bg-white rounded-xl border shadow-sm flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="font-bold text-base text-slate-800">List Sparepart</h2>
            <div className="text-sm font-medium text-slate-700">
              Total Sparepart : <span className="font-bold">1</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-100/50 text-slate-500 uppercase text-xs font-bold tracking-wider border-b whitespace-nowrap text-left">
                  <th className="py-4 px-4 w-16">No.</th>
                  <th className="py-4 px-4 min-w-[160px]">Sparepart Code</th>
                  <th className="py-4 px-4 min-w-[280px]">Sparepart Details</th>
                  <th className="py-4 px-4 min-w-[120px]">Quantity</th>
                  <th className="py-4 px-4 min-w-[160px]">Estimate Part Cost</th>
                  <th className="py-4 px-4 min-w-[140px]">Remarks</th>
                  <th className="py-4 px-4 min-w-[140px]">Store Location</th>
                  <th className="py-4 px-4 min-w-[140px]">Rack Location</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr className="hover:bg-slate-50/50 transition-colors whitespace-nowrap">
                  <td className="py-3 px-4 text-slate-700">1</td>
                  <td className="py-3 px-4 font-mono font-medium text-slate-800">SPR000007</td>
                  <td className="py-3 px-4 text-slate-700 font-medium">
                    SOLENOID VALVE / CKD / VNA-15-L
                  </td>
                  <td className="py-3 px-4 text-slate-800 font-semibold">{qtyVal}</td>
                  <td className="py-3 px-4 text-slate-700 font-medium">Rp. 3.687.000</td>
                  <td className="py-3 px-4 text-slate-700">{remarksVal}</td>
                  <td className="py-3 px-4 text-slate-800 font-medium">SPR</td>
                  <td className="py-3 px-4 text-blue-500 italic font-medium">101 A</td>
                </tr>
              </tbody>
            </table>
          </div>

          <TablePagination />
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: MAIN LISTS (SS 1 & SS 3)
  // ==========================================
  return (
    <div className="space-y-6 pb-20 animate-in fade-in-50 duration-500">
      {/* Top Header Bar with ONLY 2 TABS (Requirement 1) */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="size-6 text-slate-800" />
          <h1 className="text-xl font-bold text-slate-800 font-display">Approval</h1>
        </div>

        {/* Tablist Capsule: Request Order & Stock Transaction ONLY */}
        <div className="bg-slate-100 p-1 rounded-xl border flex items-center gap-1 shadow-inner">
          <button
            type="button"
            onClick={() => {
              setMainTab("request-order");
              setSearchTerm("");
            }}
            className={cn(
              "px-5 py-2 text-xs font-bold rounded-lg transition-all",
              mainTab === "request-order"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            )}
          >
            Request Order
          </button>
          <button
            type="button"
            onClick={() => {
              setMainTab("stock-transaction");
              setSearchTerm("");
            }}
            className={cn(
              "px-5 py-2 text-xs font-bold rounded-lg transition-all",
              mainTab === "stock-transaction"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            )}
          >
            Stock Transaction
          </button>
        </div>
      </div>

      {/* TAB 1: REQUEST ORDER (SS 1) */}
      {mainTab === "request-order" && (
        <div className="bg-white rounded-xl border shadow-sm flex flex-col">
          {/* Filters Bar (SS 1) */}
          <div className="p-4 border-b flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search by requested by & item name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-slate-50/50 w-full"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px] bg-white">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select value={gicFilter} onValueChange={setGicFilter}>
              <SelectTrigger className="w-[140px] bg-white">
                <SelectValue placeholder="All GIC" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All GIC</SelectItem>
                <SelectItem value="tech">MECHANICAL - TECHNOLOGY</SelectItem>
                <SelectItem value="entry">MECHANICAL - ENTRY</SelectItem>
                <SelectItem value="delivery">MECHANICAL - DELIVERY</SelectItem>
                <SelectItem value="furnace">MECHANICAL - FURNACE</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2 border rounded-md px-3 h-10 bg-white text-xs text-muted-foreground cursor-pointer hover:bg-slate-50 min-w-[160px]">
              <Calendar className="size-4 text-muted-foreground" />
              <span>Select date range</span>
            </div>
          </div>

          {/* Table (SS 1) */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-100/50 text-slate-500 uppercase text-xs font-bold tracking-wider border-b whitespace-nowrap text-left">
                  <th className="py-4 px-4 text-left font-semibold w-24">Action</th>
                  <th className="py-4 px-4 font-semibold min-w-[130px]">
                    <div className="inline-flex items-center gap-1 cursor-pointer">
                      Status <ArrowUpDown className="size-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-4 px-4 font-semibold min-w-[150px]">Requested By</th>
                  <th className="py-4 px-4 font-semibold min-w-[170px]">
                    <div className="inline-flex items-center gap-1 cursor-pointer">
                      Transaction Date <ArrowUpDown className="size-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-4 px-4 font-semibold min-w-[110px]">
                    <div className="inline-flex items-center gap-1 cursor-pointer">
                      Rev. No <ArrowUpDown className="size-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-4 px-4 font-semibold min-w-[220px]">Group In Charge</th>
                  <th className="py-4 px-4 font-semibold min-w-[180px]">Item Name</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {mockRequestOrders.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors whitespace-nowrap">
                    <td className="py-3 px-4 text-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-primary bg-white shadow-xs"
                        title="View Details"
                        onClick={() =>
                          setActiveDetail({
                            type: "ro",
                            id: item.id,
                          })
                        }
                      >
                        <Eye className="size-4" />
                      </Button>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-medium">{item.requestedBy}</td>
                    <td className="py-3 px-4 text-slate-600">{item.transactionDate}</td>
                    <td className="py-3 px-4 text-slate-600 font-mono">{item.revNo}</td>
                    <td className="py-3 px-4 text-slate-700 font-medium">{item.groupInCharge}</td>
                    <td className="py-3 px-4 font-semibold text-slate-800">{item.itemName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <TablePagination />
        </div>
      )}

      {/* TAB 2: STOCK TRANSACTION (SS 3) */}
      {mainTab === "stock-transaction" && (
        <div className="bg-white rounded-xl border shadow-sm flex flex-col">
          {/* Filters Bar with Subtabs: Transaction IN & OUT (SS 3 & Requirement 5) */}
          <div className="p-4 border-b flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search by receive by & sparepart name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-slate-50/50 w-full"
              />
            </div>

            {/* Sub-tab Capsule: Transaction IN / Transaction OUT */}
            <div className="bg-slate-100 p-1 rounded-lg inline-flex items-center gap-1 border border-border/50">
              <button
                type="button"
                onClick={() => setStockSubTab("in")}
                className={cn(
                  "px-4 py-1.5 rounded-md text-xs font-semibold transition-all",
                  stockSubTab === "in"
                    ? "bg-white text-slate-800 shadow-xs"
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                Transaction IN
              </button>
              <button
                type="button"
                onClick={() => setStockSubTab("out")}
                className={cn(
                  "px-4 py-1.5 rounded-md text-xs font-semibold transition-all",
                  stockSubTab === "out"
                    ? "bg-white text-slate-800 shadow-xs"
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                Transaction OUT
              </button>
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px] bg-white">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2 border rounded-md px-3 h-10 bg-white text-xs text-muted-foreground cursor-pointer hover:bg-slate-50 min-w-[160px]">
              <Calendar className="size-4 text-muted-foreground" />
              <span>Select date range</span>
            </div>
          </div>

          {/* Table (SS 3 & Requirement 5) */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-100/50 text-slate-500 uppercase text-xs font-bold tracking-wider border-b whitespace-nowrap text-left">
                  <th className="py-4 px-4 text-left font-semibold w-24">Action</th>
                  <th className="py-4 px-4 font-semibold w-16">No.</th>
                  <th className="py-4 px-4 font-semibold min-w-[140px]">
                    <div className="inline-flex items-center gap-1 cursor-pointer">
                      Status <ArrowUpDown className="size-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-4 px-4 font-semibold min-w-[170px]">
                    <div className="inline-flex items-center gap-1 cursor-pointer">
                      Transaction Date <ArrowUpDown className="size-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-4 px-4 font-semibold min-w-[160px]">
                    <div className="inline-flex items-center gap-1 cursor-pointer">
                      Receive By <ArrowUpDown className="size-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-4 px-4 font-semibold min-w-[200px]">Sparepart Name</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {(stockSubTab === "in" ? mockStockIn : mockStockOut).map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors whitespace-nowrap">
                    <td className="py-3 px-4 text-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-primary bg-white shadow-xs"
                        title="View Details"
                        onClick={() =>
                          setActiveDetail({
                            type: "stock",
                            stockType: stockSubTab,
                            id: item.id,
                          })
                        }
                      >
                        <Eye className="size-4" />
                      </Button>
                    </td>
                    <td className="py-3 px-4 text-slate-700">{item.no}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{item.transactionDate}</td>
                    <td className="py-3 px-4 text-slate-700 font-medium">{item.receiveBy}</td>
                    <td className="py-3 px-4 font-semibold text-slate-800">{item.sparepartName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <TablePagination />
        </div>
      )}
    </div>
  );
}
