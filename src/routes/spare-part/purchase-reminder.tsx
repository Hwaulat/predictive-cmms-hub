import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Sparkles,
  Search,
  ArrowUpDown,
  AlertTriangle,
  TrendingUp,
  Clock,
  CheckCircle2,
  Wrench,
  ShoppingCart,
  Download,
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

export const Route = createFileRoute("/spare-part/purchase-reminder")({
  head: () => ({
    meta: [
      { title: "Purchase Reminder & Forecast — Predictive CMMS Hub" },
      {
        name: "description",
        content:
          "AI-driven sparepart reorder recommendations, estimated maintenance rates, and consumption prediction.",
      },
    ],
  }),
  component: PurchaseReminderPage,
});

// Mock Data: Tab 1 - Reorder Reminders
interface ReorderItem {
  id: string;
  code: string;
  name: string;
  category: string;
  stock: number;
  min: number;
  max: number;
  leadTime: string;
  predictedDepletion: string;
  depletionDays: number;
  action: "Create PO Now" | "Monitor" | "Normal";
  estQty: number;
}

const mockReorderData: ReorderItem[] = [
  {
    id: "1",
    code: "SPR010781",
    name: "GASKET 1050FF BLACK T=3MM",
    category: "Mechanical",
    stock: 6,
    min: 15,
    max: 50,
    leadTime: "7 days",
    predictedDepletion: "3 days left",
    depletionDays: 3,
    action: "Create PO Now",
    estQty: 30,
  },
  {
    id: "2",
    code: "SPR000007",
    name: "SOLENOID VALVE / VNA-15-L",
    category: "Pneumatic",
    stock: 2,
    min: 5,
    max: 20,
    leadTime: "10 days",
    predictedDepletion: "4 days left",
    depletionDays: 4,
    action: "Create PO Now",
    estQty: 10,
  },
  {
    id: "3",
    code: "SPR000566",
    name: "OFFSET LINK CHAIN / RS40-1-OL",
    category: "Mechanical",
    stock: 4,
    min: 8,
    max: 30,
    leadTime: "14 days",
    predictedDepletion: "5 days left",
    depletionDays: 5,
    action: "Create PO Now",
    estQty: 20,
  },
  {
    id: "4",
    code: "ELE006702",
    name: "Mounting Bracket / Type E4.320",
    category: "Electrical",
    stock: 8,
    min: 10,
    max: 25,
    leadTime: "5 days",
    predictedDepletion: "8 days left",
    depletionDays: 8,
    action: "Monitor",
    estQty: 15,
  },
  {
    id: "5",
    code: "SPR000012",
    name: "BALL BEARING 6205-2RS / NSK",
    category: "Mechanical",
    stock: 12,
    min: 10,
    max: 40,
    leadTime: "10 days",
    predictedDepletion: "14 days left",
    depletionDays: 14,
    action: "Monitor",
    estQty: 20,
  },
  {
    id: "6",
    code: "ELE001290",
    name: "PROXIMITY SENSOR M12 PNP NO",
    category: "Electrical",
    stock: 18,
    min: 10,
    max: 30,
    leadTime: "12 days",
    predictedDepletion: "25 days left",
    depletionDays: 25,
    action: "Normal",
    estQty: 10,
  },
];

// Mock Data: Tab 2 - Estimated Maintenance Rank
interface MaintenanceRankItem {
  rank: number;
  code: string;
  name: string;
  equipment: string;
  maintenanceRate: number; // percentage
  mtbfHours: number;
  replacementFreq: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  nextService: string;
}

const mockMaintenanceRankData: MaintenanceRankItem[] = [
  {
    rank: 1,
    code: "SPR010781",
    name: "GASKET 1050FF BLACK T=3MM",
    equipment: "Steam Header & Boiler 01",
    maintenanceRate: 94.5,
    mtbfHours: 320,
    replacementFreq: "Bi-Weekly",
    priority: "Critical",
    nextService: "12 Sep 2026",
  },
  {
    rank: 2,
    code: "SPR000007",
    name: "SOLENOID VALVE / VNA-15-L",
    equipment: "Compressor A & Packaging L1",
    maintenanceRate: 88.2,
    mtbfHours: 480,
    replacementFreq: "Monthly",
    priority: "Critical",
    nextService: "15 Sep 2026",
  },
  {
    rank: 3,
    code: "SPR000566",
    name: "OFFSET LINK CHAIN / RS40-1-OL",
    equipment: "Conveyor Line 2",
    maintenanceRate: 79.0,
    mtbfHours: 650,
    replacementFreq: "Monthly",
    priority: "High",
    nextService: "19 Sep 2026",
  },
  {
    rank: 4,
    code: "SPR000012",
    name: "BALL BEARING 6205-2RS / NSK",
    equipment: "Chiller 02 & Exhaust Fan",
    maintenanceRate: 71.4,
    mtbfHours: 920,
    replacementFreq: "Quarterly",
    priority: "High",
    nextService: "24 Sep 2026",
  },
  {
    rank: 5,
    code: "ELE006702",
    name: "Mounting Bracket / Type E4.320",
    equipment: "Robot Arm Cell 3",
    maintenanceRate: 58.6,
    mtbfHours: 1400,
    replacementFreq: "Bi-Monthly",
    priority: "Medium",
    nextService: "02 Oct 2026",
  },
  {
    rank: 6,
    code: "ELE001290",
    name: "PROXIMITY SENSOR M12 PNP NO",
    equipment: "Sorting Table ST-01",
    maintenanceRate: 42.1,
    mtbfHours: 2100,
    replacementFreq: "Quarterly",
    priority: "Low",
    nextService: "18 Oct 2026",
  },
];

// Mock Data: Tab 3 - Consumption Prediction
interface ConsumptionItem {
  id: string;
  code: string;
  name: string;
  category: string;
  hist30d: number;
  next30d: number;
  next90d: number;
  trendPct: number;
  runOutDate: string;
  confidenceScore: number;
  riskAlert: "High Depletion Risk" | "Moderate Usage" | "Stable";
}

const mockConsumptionData: ConsumptionItem[] = [
  {
    id: "1",
    code: "SPR010781",
    name: "GASKET 1050FF BLACK T=3MM",
    category: "Mechanical",
    hist30d: 22,
    next30d: 28,
    next90d: 84,
    trendPct: 27.2,
    runOutDate: "11 Sep 2026",
    confidenceScore: 98.4,
    riskAlert: "High Depletion Risk",
  },
  {
    id: "2",
    code: "SPR000007",
    name: "SOLENOID VALVE / VNA-15-L",
    category: "Pneumatic",
    hist30d: 5,
    next30d: 8,
    next90d: 24,
    trendPct: 60.0,
    runOutDate: "12 Sep 2026",
    confidenceScore: 96.1,
    riskAlert: "High Depletion Risk",
  },
  {
    id: "3",
    code: "SPR000566",
    name: "OFFSET LINK CHAIN / RS40-1-OL",
    category: "Mechanical",
    hist30d: 14,
    next30d: 18,
    next90d: 52,
    trendPct: 28.5,
    runOutDate: "13 Sep 2026",
    confidenceScore: 94.7,
    riskAlert: "High Depletion Risk",
  },
  {
    id: "4",
    code: "ELE006702",
    name: "Mounting Bracket / Type E4.320",
    category: "Electrical",
    hist30d: 9,
    next30d: 11,
    next90d: 32,
    trendPct: 22.2,
    runOutDate: "16 Sep 2026",
    confidenceScore: 92.5,
    riskAlert: "Moderate Usage",
  },
  {
    id: "5",
    code: "SPR000012",
    name: "BALL BEARING 6205-2RS / NSK",
    category: "Mechanical",
    hist30d: 16,
    next30d: 17,
    next90d: 50,
    trendPct: 6.2,
    runOutDate: "22 Sep 2026",
    confidenceScore: 95.8,
    riskAlert: "Moderate Usage",
  },
  {
    id: "6",
    code: "ELE001290",
    name: "PROXIMITY SENSOR M12 PNP NO",
    category: "Electrical",
    hist30d: 8,
    next30d: 9,
    next90d: 26,
    trendPct: 12.5,
    runOutDate: "03 Oct 2026",
    confidenceScore: 97.2,
    riskAlert: "Stable",
  },
];

function PurchaseReminderPage() {
  const [activeTab, setActiveTab] = useState<"reorder" | "rank" | "consumption">("reorder");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Filtered Reorders
  const filteredReorders = mockReorderData.filter((item) => {
    const matchesSearch =
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || item.action === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtered Maintenance Rank
  const filteredRanks = mockMaintenanceRankData.filter((item) => {
    const matchesSearch =
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.equipment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || item.priority === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtered Consumption
  const filteredConsumption = mockConsumptionData.filter((item) => {
    const matchesSearch =
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || item.riskAlert === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const urgentCount = mockReorderData.filter((r) => r.action === "Create PO Now").length;
  const criticalRateCount = mockMaintenanceRankData.filter((r) => r.priority === "Critical").length;

  return (
    <div className="space-y-6 pb-20 animate-in fade-in-50 duration-500">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800 font-display flex items-center gap-2">
            <ShoppingCart className="size-6 text-slate-800" />
            Purchase Reminder
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            AI-driven reorder triggers, maintenance wear rates, and sparepart consumption forecast.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold">
            <Sparkles className="size-3.5" />
            AI Predictive Engine Active
          </div>
          <Button variant="outline" className="bg-white text-slate-700 h-9 gap-1.5 text-xs">
            <Download className="size-3.5" /> Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Urgent Reorder</span>
            <AlertTriangle className="size-4 text-rose-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-800">{urgentCount} Items</div>
          <div className="text-xs text-rose-600 mt-1 font-medium">Stock depletion ≤ lead time</div>
        </div>

        <div className="bg-white p-5 rounded-xl border shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Critical MTC Rate</span>
            <Wrench className="size-4 text-amber-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-800">{criticalRateCount} Parts</div>
          <div className="text-xs text-amber-600 mt-1 font-medium">Maintenance frequency &gt; 85%</div>
        </div>

        <div className="bg-white p-5 rounded-xl border shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Forecast 30D Volume</span>
            <TrendingUp className="size-4 text-blue-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-800">110 Pcs</div>
          <div className="text-xs text-blue-600 mt-1 font-medium">+18.4% vs previous month</div>
        </div>

        <div className="bg-white p-5 rounded-xl border shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">AI Accuracy Score</span>
            <CheckCircle2 className="size-4 text-emerald-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-800">96.8%</div>
          <div className="text-xs text-emerald-600 mt-1 font-medium">Model confidence reliability</div>
        </div>
      </div>

      {/* Main Container Card with Tabs - Styled matching Request Order List */}
      <div className="bg-white rounded-xl border shadow-sm flex flex-col">
        {/* Navigation Tablist Header */}
        <div className="p-4 border-b flex items-center justify-between flex-wrap gap-4">
          <div className="bg-slate-100 p-1 rounded-lg inline-flex items-center gap-1 border border-border/50">
            <button
              type="button"
              onClick={() => {
                setActiveTab("reorder");
                setStatusFilter("ALL");
              }}
              className={`px-4 py-2 rounded-md text-xs font-semibold transition-all flex items-center gap-2 ${
                activeTab === "reorder"
                  ? "bg-white text-slate-800 shadow-xs"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <ShoppingCart className="size-3.5" />
              Reorder Reminder
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold">
                {urgentCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("rank");
                setStatusFilter("ALL");
              }}
              className={`px-4 py-2 rounded-md text-xs font-semibold transition-all flex items-center gap-2 ${
                activeTab === "rank"
                  ? "bg-white text-slate-800 shadow-xs"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Wrench className="size-3.5" />
              Estimated Maintenance Rank
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("consumption");
                setStatusFilter("ALL");
              }}
              className={`px-4 py-2 rounded-md text-xs font-semibold transition-all flex items-center gap-2 ${
                activeTab === "consumption"
                  ? "bg-white text-slate-800 shadow-xs"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <TrendingUp className="size-3.5" />
              Consumption Prediction
            </button>
          </div>

          {/* Right Indicator */}
          <div className="text-xs text-muted-foreground flex items-center gap-1.5">
            <Clock className="size-3.5 text-muted-foreground" />
            Updated today at 14:00
          </div>
        </div>

        {/* Filter Toolbar matching Request Order List */}
        <div className="p-4 border-b flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search by code, sparepart name, or machine..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-slate-50/50 w-full"
            />
          </div>

          {activeTab === "reorder" && (
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="All Recommendations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Recommendations</SelectItem>
                <SelectItem value="Create PO Now">Create PO Now</SelectItem>
                <SelectItem value="Monitor">Monitor</SelectItem>
                <SelectItem value="Normal">Normal</SelectItem>
              </SelectContent>
            </Select>
          )}

          {activeTab === "rank" && (
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="All Priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Priorities</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          )}

          {activeTab === "consumption" && (
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[190px] bg-white">
                <SelectValue placeholder="All Risk Alerts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Risk Alerts</SelectItem>
                <SelectItem value="High Depletion Risk">High Depletion Risk</SelectItem>
                <SelectItem value="Moderate Usage">Moderate Usage</SelectItem>
                <SelectItem value="Stable">Stable</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        {/* TAB 1: REORDER REMINDER */}
        {activeTab === "reorder" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-100/50 text-slate-500 uppercase text-xs font-bold tracking-wider border-b whitespace-nowrap text-left">
                  <th className="py-4 px-4 font-semibold min-w-[140px]">
                    <div className="inline-flex items-center gap-1 cursor-pointer">
                      Sparepart Code <ArrowUpDown className="size-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-4 px-4 font-semibold min-w-[240px]">Sparepart Name</th>
                  <th className="py-4 px-4 font-semibold min-w-[120px]">Category</th>
                  <th className="py-4 px-4 font-semibold min-w-[110px]">Current Stock</th>
                  <th className="py-4 px-4 font-semibold min-w-[90px]">Min</th>
                  <th className="py-4 px-4 font-semibold min-w-[90px]">Max</th>
                  <th className="py-4 px-4 font-semibold min-w-[110px]">Lead Time</th>
                  <th className="py-4 px-4 font-semibold min-w-[150px]">
                    <div className="inline-flex items-center gap-1 cursor-pointer">
                      Predicted Depletion <ArrowUpDown className="size-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-4 px-4 font-semibold min-w-[170px]">Recommendation</th>
                  <th className="py-4 px-4 font-semibold min-w-[120px]">Est. Reorder Qty</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredReorders.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors whitespace-nowrap">
                    <td className="py-3.5 px-4 font-mono font-medium text-slate-800 text-xs">
                      {item.code}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">{item.name}</td>
                    <td className="py-3.5 px-4 text-slate-600">{item.category}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`font-bold ${
                          item.stock < item.min ? "text-rose-600" : "text-slate-800"
                        }`}
                      >
                        {item.stock}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{item.min}</td>
                    <td className="py-3.5 px-4 text-slate-600">{item.max}</td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">{item.leadTime}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          item.depletionDays <= 5
                            ? "bg-rose-50 text-rose-600 border border-rose-200"
                            : "bg-amber-50 text-amber-600 border border-amber-200"
                        }`}
                      >
                        {item.predictedDepletion}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {item.action === "Create PO Now" && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-600 border border-rose-200">
                          Create PO Now
                        </span>
                      )}
                      {item.action === "Monitor" && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-200">
                          Monitor
                        </span>
                      )}
                      {item.action === "Normal" && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
                          Normal
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{item.estQty} pcs</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: ESTIMATED MAINTENANCE RANK */}
        {activeTab === "rank" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-100/50 text-slate-500 uppercase text-xs font-bold tracking-wider border-b whitespace-nowrap text-left">
                  <th className="py-4 px-4 w-16 text-center font-semibold">Rank</th>
                  <th className="py-4 px-4 font-semibold min-w-[140px]">Sparepart Code</th>
                  <th className="py-4 px-4 font-semibold min-w-[240px]">Sparepart Name</th>
                  <th className="py-4 px-4 font-semibold min-w-[220px]">Equipment / Machine</th>
                  <th className="py-4 px-4 font-semibold min-w-[180px]">
                    <div className="inline-flex items-center gap-1 cursor-pointer">
                      Maintenance Rate <ArrowUpDown className="size-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-4 px-4 font-semibold min-w-[130px]">Avg MTBF</th>
                  <th className="py-4 px-4 font-semibold min-w-[140px]">Replacement Freq</th>
                  <th className="py-4 px-4 font-semibold min-w-[130px]">Priority</th>
                  <th className="py-4 px-4 font-semibold min-w-[140px]">
                    <div className="inline-flex items-center gap-1 cursor-pointer">
                      Next Service <ArrowUpDown className="size-3 text-slate-400" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredRanks.map((item) => (
                  <tr key={item.rank} className="hover:bg-slate-50/50 transition-colors whitespace-nowrap">
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center size-6 rounded-full text-xs font-bold ${
                          item.rank === 1
                            ? "bg-amber-100 text-amber-800 font-extrabold"
                            : item.rank === 2
                            ? "bg-slate-200 text-slate-800"
                            : item.rank === 3
                            ? "bg-orange-100 text-orange-800"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        #{item.rank}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium text-slate-800 text-xs">
                      {item.code}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">{item.name}</td>
                    <td className="py-3.5 px-4 text-slate-600">{item.equipment}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              item.maintenanceRate >= 85
                                ? "bg-rose-500"
                                : item.maintenanceRate >= 70
                                ? "bg-amber-500"
                                : "bg-blue-500"
                            }`}
                            style={{ width: `${item.maintenanceRate}%` }}
                          />
                        </div>
                        <span className="font-bold text-xs text-slate-800">
                          {item.maintenanceRate}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700">{item.mtbfHours} hrs</td>
                    <td className="py-3.5 px-4 text-slate-600">{item.replacementFreq}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          item.priority === "Critical"
                            ? "bg-rose-50 text-rose-600 border border-rose-200"
                            : item.priority === "High"
                            ? "bg-amber-50 text-amber-600 border border-amber-200"
                            : item.priority === "Medium"
                            ? "bg-blue-50 text-blue-600 border border-blue-200"
                            : "bg-slate-50 text-slate-600 border border-slate-200"
                        }`}
                      >
                        {item.priority}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-800 font-medium">{item.nextService}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: CONSUMPTION PREDICTION */}
        {activeTab === "consumption" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-100/50 text-slate-500 uppercase text-xs font-bold tracking-wider border-b whitespace-nowrap text-left">
                  <th className="py-4 px-4 font-semibold min-w-[140px]">Sparepart Code</th>
                  <th className="py-4 px-4 font-semibold min-w-[240px]">Sparepart Name</th>
                  <th className="py-4 px-4 font-semibold min-w-[120px]">Category</th>
                  <th className="py-4 px-4 font-semibold min-w-[130px]">Historical (30D)</th>
                  <th className="py-4 px-4 font-semibold min-w-[160px]">
                    <div className="inline-flex items-center gap-1 cursor-pointer">
                      Predicted (Next 30D) <ArrowUpDown className="size-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-4 px-4 font-semibold min-w-[150px]">Predicted (Next 90D)</th>
                  <th className="py-4 px-4 font-semibold min-w-[120px]">Trend</th>
                  <th className="py-4 px-4 font-semibold min-w-[140px]">Run-Out Date</th>
                  <th className="py-4 px-4 font-semibold min-w-[130px]">Confidence</th>
                  <th className="py-4 px-4 font-semibold min-w-[170px]">Risk Alert</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredConsumption.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors whitespace-nowrap">
                    <td className="py-3.5 px-4 font-mono font-medium text-slate-800 text-xs">
                      {item.code}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">{item.name}</td>
                    <td className="py-3.5 px-4 text-slate-600">{item.category}</td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">{item.hist30d} pcs</td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">{item.next30d} pcs</td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">{item.next90d} pcs</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center text-xs font-semibold text-rose-600 gap-0.5">
                        <TrendingUp className="size-3" />+{item.trendPct}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-800 font-medium">{item.runOutDate}</td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-emerald-600 text-xs">
                        {item.confidenceScore}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          item.riskAlert === "High Depletion Risk"
                            ? "bg-rose-50 text-rose-600 border border-rose-200"
                            : item.riskAlert === "Moderate Usage"
                            ? "bg-amber-50 text-amber-600 border border-amber-200"
                            : "bg-emerald-50 text-emerald-600 border border-emerald-200"
                        }`}
                      >
                        {item.riskAlert}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <TablePagination />
      </div>
    </div>
  );
}
