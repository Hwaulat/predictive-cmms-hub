import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeftRight,
  Search,
  Calendar,
  Download,
  Plus,
  Eye,
  Edit2,
  Trash2,
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

export const Route = createFileRoute("/spare-part/stock-transaction/")({
  head: () => ({
    meta: [
      { title: "Stock Transaction — Predictive CMMS Hub" },
      { name: "description", content: "Sparepart Stock Transaction Management" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>) => ({
    tab: (search["tab"] as string) || "in",
  }),
  component: StockTransactionPage,
});

interface TransactionItem {
  id: string;
  no: number;
  statusActivity: string;
  statusApproval: string;
  transactionDate: string;
  receiveBy: string;
  sparepartName: string;
}

const mockTransactionsIn: TransactionItem[] = [
  {
    id: "in-1",
    no: 1,
    statusActivity: "Submitted",
    statusApproval: "Approved",
    transactionDate: "27/08/2026, 16:39",
    receiveBy: "Tester01",
    sparepartName: "SOLENOID VALVE",
  },
];

const mockTransactionsOut: TransactionItem[] = [
  {
    id: "out-1",
    no: 1,
    statusActivity: "Submitted",
    statusApproval: "Approved",
    transactionDate: "27/08/2026, 17:42",
    receiveBy: "Tester01",
    sparepartName: "SOLENOID VALVE",
  },
];

function StockTransactionPage() {
  const navigate = useNavigate();
  const searchParams = Route.useSearch();

  const [activeTab, setActiveTab] = useState<"in" | "out">(
    searchParams["tab"] === "out" ? "out" : "in"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusActivity, setStatusActivity] = useState("all");
  const [statusApproval, setStatusApproval] = useState("all");

  useEffect(() => {
    if (searchParams["tab"] === "out" || searchParams["tab"] === "in") {
      setActiveTab(searchParams["tab"] as "in" | "out");
    }
  }, [searchParams]);

  const currentItems = activeTab === "in" ? mockTransactionsIn : mockTransactionsOut;

  return (
    <div className="space-y-6 pb-20 animate-in fade-in-50 duration-500">
      {/* Header Bar with Inventory In / Out Tabs (SS 2 & 3) */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2">
          <ArrowLeftRight className="size-6 text-slate-800" />
          <h1 className="text-xl font-bold text-slate-800 font-display">Stock Transaction</h1>
        </div>

        {/* Inventory In / Inventory Out pill switcher */}
        <div className="bg-slate-100 p-1 rounded-lg inline-flex items-center gap-1 border border-border/50">
          <button
            type="button"
            onClick={() => setActiveTab("in")}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === "in"
                ? "bg-white text-slate-800 shadow-xs"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Inventory In
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("out")}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === "out"
                ? "bg-white text-slate-800 shadow-xs"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Inventory Out
          </button>
        </div>
      </div>

      {/* Main Container Card */}
      <div className="bg-white rounded-xl border shadow-sm p-6 space-y-6">
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Bar */}
          <div className="relative w-44">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input
              placeholder="Q S."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-white text-xs h-10"
            />
          </div>

          {/* Select: Choose Status Activity */}
          <Select value={statusActivity} onValueChange={setStatusActivity}>
            <SelectTrigger className="w-[190px] bg-white text-xs text-slate-700 h-10">
              <SelectValue placeholder="Choose Status Activity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Choose Status Activity</SelectItem>
              <SelectItem value="Submitted">Submitted</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
            </SelectContent>
          </Select>

          {/* Select: Choose Status Approval */}
          <Select value={statusApproval} onValueChange={setStatusApproval}>
            <SelectTrigger className="w-[190px] bg-white text-xs text-slate-700 h-10">
              <SelectValue placeholder="Choose Status Approval" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Choose Status Approval</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          {/* Date range picker */}
          <div className="flex items-center gap-2 border rounded-md px-3 h-10 bg-white text-xs text-slate-400 cursor-pointer hover:bg-slate-50 min-w-[200px]">
            <Calendar className="size-4 text-slate-400" />
            <span>dd/mm/yyyy - dd/mm/yyyy</span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            {/* Download Excel Button */}
            <Button className="bg-[#f97316] hover:bg-[#ea580c] text-white flex items-center gap-2 font-medium px-4 h-10 shadow-sm">
              <Download className="size-4" /> Download Excel
            </Button>

            {/* Create New Transaction Button */}
            <Button
              className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white flex items-center gap-2 font-medium px-4 h-10 shadow-sm"
              onClick={() =>
                navigate({
                  to: "/spare-part/stock-transaction/create",
                  search: { type: activeTab },
                } as any)
              }
            >
              <Plus className="size-4" /> Create New Transaction
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="border rounded-lg overflow-x-auto w-full bg-white">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100/50 border-b text-slate-500 uppercase text-xs font-bold tracking-wider whitespace-nowrap text-left">
                <th className="py-4 px-4 text-center w-28">ACTION</th>
                <th className="py-4 px-4">NO.</th>
                <th className="py-4 px-4 min-w-[170px]">
                  <div className="inline-flex items-center gap-1 cursor-pointer">
                    STATUS ACTIVITY <ArrowUpDown className="size-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-4 px-4 min-w-[170px]">STATUS APPROVAL</th>
                <th className="py-4 px-4 min-w-[180px]">
                  <div className="inline-flex items-center gap-1 cursor-pointer">
                    TRANSACTION DATE <ArrowUpDown className="size-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-4 px-4 min-w-[160px]">
                  <div className="inline-flex items-center gap-1 cursor-pointer">
                    RECEIVE BY <ArrowUpDown className="size-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-4 px-4 min-w-[200px]">SPAREPART NAME</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {currentItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors whitespace-nowrap">
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <Button
                        variant="outline"
                        size="icon"
                        className="size-8 text-slate-400 hover:text-primary border bg-white shadow-xs"
                        title="View Details"
                        onClick={() =>
                          navigate({
                            to: `/spare-part/stock-transaction/${item.id}` as any,
                          })
                        }
                      >
                        <Eye className="size-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="size-8 text-slate-400 hover:text-primary border bg-white shadow-xs"
                        title="Edit"
                      >
                        <Edit2 className="size-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="size-8 text-slate-400 hover:text-destructive border bg-white shadow-xs"
                        title="Delete"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-700">{item.no}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
                      {item.statusActivity}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
                      {item.statusApproval}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-700">{item.transactionDate}</td>
                  <td className="py-3 px-4 text-slate-800 font-medium">{item.receiveBy}</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{item.sparepartName}</td>
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
