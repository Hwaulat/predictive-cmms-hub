import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  FileText,
  Download,
  Search,
  Calendar,
  Eye,
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

export const Route = createFileRoute("/spare-part/log-part")({
  head: () => ({
    meta: [
      { title: "Log Part — Predictive CMMS Hub" },
      { name: "description", content: "Complete Sparepart and Non-SPR Log Part History" },
    ],
  }),
  component: LogPartPage,
});

interface LogPartItem {
  id: string;
  no: number;
  requestDate: string;
  requestedBy: string;
  statusOrder: string;
  statusActivity: "Waiting" | "Approved" | "Completed" | "Ordered";
  sparepartCode: string;
  details: string;
  prNo: string;
  prName: string;
  poNumber: string;
  pricePr: string;
  totalPricePr: string;
  pricePo: string;
  totalPricePo: string;
  orderQty: number;
  deliveryPlan: string;
}

const mockLogPartData: LogPartItem[] = [
  {
    id: "1",
    no: 1,
    requestDate: "08/09/2026, 14:11",
    requestedBy: "admin",
    statusOrder: "New Order",
    statusActivity: "Waiting",
    sparepartCode: "SPR010781",
    details: "GASKET / 1050FF BLACK T=3MM / JIS10K x 100 A / EPDM / MECHANICAL / MKR000456",
    prNo: "-",
    prName: "-",
    poNumber: "-",
    pricePr: "-",
    totalPricePr: "-",
    pricePo: "-",
    totalPricePo: "-",
    orderQty: 20,
    deliveryPlan: "09/09/2026",
  },
  {
    id: "2",
    no: 2,
    requestDate: "04/09/2026, 17:11",
    requestedBy: "admin",
    statusOrder: "New Order",
    statusActivity: "Approved",
    sparepartCode: "SPR010781",
    details: "GASKET / 1050FF BLACK T=3MM / JIS10K x 100 A / EPDM / MECHANICAL / MKR000456",
    prNo: "hgghfgh",
    prName: "hyfghfgfgf",
    poNumber: "-",
    pricePr: "20.000",
    totalPricePr: "400.000",
    pricePo: "0",
    totalPricePo: "0",
    orderQty: 20,
    deliveryPlan: "04/09/2026",
  },
  {
    id: "3",
    no: 3,
    requestDate: "04/09/2026, 09:33",
    requestedBy: "admin",
    statusOrder: "New Order",
    statusActivity: "Completed",
    sparepartCode: "SPR000566",
    details: "OFFSET LINK CHAIN / RS40-1-OL / TSUBAKI",
    prNo: "0010",
    prName: "Offset Link Chain",
    poNumber: "000-10",
    pricePr: "100.000",
    totalPricePr: "300.000",
    pricePo: "100.000",
    totalPricePo: "300.000",
    orderQty: 3,
    deliveryPlan: "04/09/2026",
  },
  {
    id: "4",
    no: 4,
    requestDate: "04/09/2026, 09:34",
    requestedBy: "admin",
    statusOrder: "New Order",
    statusActivity: "Completed",
    sparepartCode: "ELE006702",
    details: "Mounting Bracket / Type E4.320.18.2.12.C",
    prNo: "0040",
    prName: "Mounting Bracket",
    poNumber: "0040",
    pricePr: "300.000",
    totalPricePr: "600.000",
    pricePo: "300.000",
    totalPricePo: "600.000",
    orderQty: 2,
    deliveryPlan: "04/09/2026",
  },
  {
    id: "5",
    no: 5,
    requestDate: "28/08/2026, 17:05",
    requestedBy: "admin",
    statusOrder: "New Order",
    statusActivity: "Ordered",
    sparepartCode: "SPR010781",
    details: "GASKET / 1050FF BLACK T=3MM / JIS10K x 100 A / EPDM / MECHANICAL / MKR000456",
    prNo: "001212",
    prName: "Hasan Waulat",
    poNumber: "PO001",
    pricePr: "20.000",
    totalPricePr: "200.000",
    pricePo: "10.000",
    totalPricePo: "100.000",
    orderQty: 10,
    deliveryPlan: "02/09/2026",
  },
  {
    id: "6",
    no: 6,
    requestDate: "21/08/2026, 10:13",
    requestedBy: "admin",
    statusOrder: "New Order",
    statusActivity: "Completed",
    sparepartCode: "SPR010781",
    details: "GASKET / 1050FF BLACK T=3MM / JIS10K x 100 A / EPDM / MECHANICAL / MKR000456",
    prNo: "1111",
    prName: "test",
    poNumber: "111",
    pricePr: "111",
    totalPricePr: "222",
    pricePo: "350.000",
    totalPricePo: "700.000",
    orderQty: 2,
    deliveryPlan: "18/08/2026",
  },
  {
    id: "7",
    no: 7,
    requestDate: "20/08/2026, 15:40",
    requestedBy: "admin",
    statusOrder: "New Order",
    statusActivity: "Approved",
    sparepartCode: "SPR000007",
    details: "SOLENOID VALVE / VNA-15-L / MECHANICAL",
    prNo: "0009",
    prName: "Solenoid Valve",
    poNumber: "PO-092",
    pricePr: "500.000",
    totalPricePr: "1.500.000",
    pricePo: "500.000",
    totalPricePo: "1.500.000",
    orderQty: 3,
    deliveryPlan: "27/08/2026",
  },
  {
    id: "8",
    no: 8,
    requestDate: "15/08/2026, 11:20",
    requestedBy: "admin",
    statusOrder: "New Order",
    statusActivity: "Completed",
    sparepartCode: "SPR000012",
    details: "BALL BEARING 6205-2RS / NSK",
    prNo: "0008",
    prName: "Bearing Replacement",
    poNumber: "PO-088",
    pricePr: "85.000",
    totalPricePr: "340.000",
    pricePo: "85.000",
    totalPricePo: "340.000",
    orderQty: 4,
    deliveryPlan: "22/08/2026",
  },
  {
    id: "9",
    no: 9,
    requestDate: "10/08/2026, 09:15",
    requestedBy: "admin",
    statusOrder: "New Order",
    statusActivity: "Waiting",
    sparepartCode: "ELE001290",
    details: "PROXIMITY SENSOR M12 PNP NO",
    prNo: "-",
    prName: "-",
    poNumber: "-",
    pricePr: "-",
    totalPricePr: "-",
    pricePo: "-",
    totalPricePo: "-",
    orderQty: 5,
    deliveryPlan: "18/08/2026",
  },
];

function LogPartPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [partCategory, setPartCategory] = useState<"sparepart" | "non-spr">("sparepart");
  const [statusOrderFilter, setStatusOrderFilter] = useState("all");
  const [statusActivityFilter, setStatusActivityFilter] = useState("all");

  const filteredData = mockLogPartData.filter((item) => {
    const matchSearch =
      item.requestedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sparepartCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.prNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchActivity =
      statusActivityFilter === "all" || item.statusActivity === statusActivityFilter;
    return matchSearch && matchActivity;
  });

  return (
    <div className="space-y-6 pb-20 animate-in fade-in-50 duration-500">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2">
          <FileText className="size-6 text-slate-800" />
          <h1 className="text-xl font-bold text-slate-800 font-display">Log Part</h1>
        </div>

        <Button className="bg-[#f97316] hover:bg-[#ea580c] text-white flex items-center gap-2 font-medium px-4 shadow-sm">
          <Download className="size-4" /> Download Excel
        </Button>
      </div>

      {/* Main Container Card - Styled matching Request Order List */}
      <div className="bg-white rounded-xl border shadow-sm flex flex-col">
        {/* Filters Header Bar */}
        <div className="p-4 border-b flex flex-wrap items-center gap-4">
          {/* Search Bar - Fill container */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search by requested by, sparepart code, details, pr no &..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-slate-50/50 w-full"
            />
          </div>

          {/* Radio Buttons: Sparepart / NON-SPR */}
          <div className="flex items-center gap-4 px-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-800 cursor-pointer">
              <input
                type="radio"
                name="partCategory"
                checked={partCategory === "sparepart"}
                onChange={() => setPartCategory("sparepart")}
                className="size-4 text-blue-600 accent-blue-600 cursor-pointer"
              />
              <span>Sparepart</span>
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-600 cursor-pointer">
              <input
                type="radio"
                name="partCategory"
                checked={partCategory === "non-spr"}
                onChange={() => setPartCategory("non-spr")}
                className="size-4 text-blue-600 accent-blue-600 cursor-pointer"
              />
              <span>NON-SPR</span>
            </label>
          </div>

          {/* Dropdown: All Status Order */}
          <Select value={statusOrderFilter} onValueChange={setStatusOrderFilter}>
            <SelectTrigger className="w-[160px] bg-white">
              <SelectValue placeholder="All Status Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status Order</SelectItem>
              <SelectItem value="new-order">New Order</SelectItem>
            </SelectContent>
          </Select>

          {/* Dropdown: All Status Activity */}
          <Select value={statusActivityFilter} onValueChange={setStatusActivityFilter}>
            <SelectTrigger className="w-[160px] bg-white">
              <SelectValue placeholder="All Status Activity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status Activity</SelectItem>
              <SelectItem value="Waiting">Waiting</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Ordered">Ordered</SelectItem>
            </SelectContent>
          </Select>

          {/* Date Range Picker */}
          <div className="flex items-center gap-2 border rounded-md px-3 h-10 bg-white text-xs text-muted-foreground cursor-pointer hover:bg-slate-50 min-w-[160px]">
            <Calendar className="size-4 text-muted-foreground" />
            <span>Select date range</span>
          </div>
        </div>

        {/* Table Container - Flush with card edges matching Request Order List */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-100/50 text-slate-500 uppercase text-xs font-bold tracking-wider border-b whitespace-nowrap text-left">
                <th className="py-4 px-4 text-center font-semibold w-16">Action</th>
                <th className="py-4 px-4 font-semibold">No.</th>
                <th className="py-4 px-4 font-semibold min-w-[160px]">
                  <div className="inline-flex items-center gap-1 cursor-pointer">
                    Request Date <ArrowUpDown className="size-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-4 px-4 font-semibold min-w-[140px]">
                  <div className="inline-flex items-center gap-1 cursor-pointer">
                    Requested By <ArrowUpDown className="size-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-4 px-4 font-semibold min-w-[130px]">
                  <div className="inline-flex items-center gap-1 cursor-pointer">
                    Status Order <ArrowUpDown className="size-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-4 px-4 font-semibold min-w-[140px]">
                  <div className="inline-flex items-center gap-1 cursor-pointer">
                    Status Activity <ArrowUpDown className="size-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-4 px-4 font-semibold min-w-[160px]">
                  <div className="inline-flex items-center gap-1 cursor-pointer">
                    Sparepart Code <ArrowUpDown className="size-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-4 px-4 font-semibold min-w-[280px]">
                  <div className="inline-flex items-center gap-1 cursor-pointer">
                    Details <ArrowUpDown className="size-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-4 px-4 font-semibold min-w-[120px]">
                  <div className="inline-flex items-center gap-1 cursor-pointer">
                    PR No. <ArrowUpDown className="size-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-4 px-4 font-semibold min-w-[140px]">
                  <div className="inline-flex items-center gap-1 cursor-pointer">
                    PR Name <ArrowUpDown className="size-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-4 px-4 font-semibold min-w-[130px]">
                  <div className="inline-flex items-center gap-1 cursor-pointer">
                    PO Number <ArrowUpDown className="size-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-4 px-4 font-semibold min-w-[120px]">
                  <div className="inline-flex items-center gap-1 cursor-pointer">
                    Price PR <ArrowUpDown className="size-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-4 px-4 font-semibold min-w-[140px]">
                  <div className="inline-flex items-center gap-1 cursor-pointer">
                    Total Price PR <ArrowUpDown className="size-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-4 px-4 font-semibold min-w-[120px]">
                  <div className="inline-flex items-center gap-1 cursor-pointer">
                    Price PO <ArrowUpDown className="size-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-4 px-4 font-semibold min-w-[140px]">
                  <div className="inline-flex items-center gap-1 cursor-pointer">
                    Total Price PO <ArrowUpDown className="size-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-4 px-4 font-semibold min-w-[110px]">
                  <div className="inline-flex items-center gap-1 cursor-pointer">
                    Order Qty <ArrowUpDown className="size-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-4 px-4 font-semibold min-w-[140px]">
                  <div className="inline-flex items-center gap-1 cursor-pointer">
                    Delivery Plan <ArrowUpDown className="size-3 text-slate-400" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors whitespace-nowrap">
                  <td className="py-3 px-4 text-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 text-slate-400 hover:text-primary bg-white shadow-xs"
                      title="View Details"
                    >
                      <Eye className="size-4" />
                    </Button>
                  </td>
                  <td className="py-3 px-4 text-slate-700">{item.no}</td>
                  <td className="py-3 px-4 text-slate-600">{item.requestDate}</td>
                  <td className="py-3 px-4 text-slate-700 font-medium">{item.requestedBy}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-600 border border-purple-200">
                      {item.statusOrder}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {item.statusActivity === "Waiting" && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-200">
                        Waiting
                      </span>
                    )}
                    {item.statusActivity === "Approved" && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
                        Approved
                      </span>
                    )}
                    {item.statusActivity === "Completed" && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-600 border border-purple-200">
                        Completed
                      </span>
                    )}
                    {item.statusActivity === "Ordered" && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200">
                        Ordered
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-700 font-medium">
                    {item.sparepartCode}
                  </td>
                  <td className="py-3 px-4 text-slate-600 max-w-md truncate">{item.details}</td>
                  <td className="py-3 px-4 text-slate-600 font-mono">{item.prNo}</td>
                  <td className="py-3 px-4 text-slate-700 font-medium">{item.prName}</td>
                  <td className="py-3 px-4 text-slate-600">{item.poNumber}</td>
                  <td className="py-3 px-4 text-slate-600">{item.pricePr}</td>
                  <td className="py-3 px-4 text-slate-600">{item.totalPricePr}</td>
                  <td className="py-3 px-4 text-slate-600">{item.pricePo}</td>
                  <td className="py-3 px-4 text-slate-600">{item.totalPricePo}</td>
                  <td className="py-3 px-4 text-slate-800 font-semibold">{item.orderQty}</td>
                  <td className="py-3 px-4 text-slate-600">{item.deliveryPlan}</td>
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
