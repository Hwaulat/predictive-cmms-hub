export const kpis = [
  { label: "MTTR", value: "3.4 hrs", delta: "-12% vs last month", icon: "wrench", tone: "success" },
  { label: "MTBF", value: "182 hrs", delta: "+8% vs last month", icon: "refresh", tone: "success" },
  { label: "PM Compliance", value: "92%", delta: "Target 95%", icon: "calendar", tone: "warning" },
  { label: "Open Work Orders", value: "18", delta: "4 critical • 6 high", icon: "clipboard", tone: "info" },
  { label: "Equipment Availability", value: "96.2%", delta: "+1.1% this week", icon: "activity", tone: "success" },
  { label: "At-Risk Spareparts (AI)", value: "7", delta: "3 depleted < 7 days", icon: "alert", tone: "destructive" },
] as const;

export const woTrend = [
  { period: "W-8", open: 22, closed: 18 },
  { period: "W-7", open: 19, closed: 21 },
  { period: "W-6", open: 25, closed: 20 },
  { period: "W-5", open: 17, closed: 23 },
  { period: "W-4", open: 21, closed: 19 },
  { period: "W-3", open: 15, closed: 22 },
  { period: "W-2", open: 20, closed: 24 },
  { period: "W-1", open: 18, closed: 21 },
];

export const downtimePareto = [
  { equipment: "Boiler 01", downtime: 42 },
  { equipment: "Compressor A", downtime: 31 },
  { equipment: "Injection M-3", downtime: 26 },
  { equipment: "Conveyor L2", downtime: 18 },
  { equipment: "Chiller 02", downtime: 11 },
];

export const aiInsights = [
  {
    part: "Bearing SKF-6205",
    days: 3,
    confidence: 0.91,
    reason:
      "Consumption over the last 8 months increased by 34%; Conveyor L2 WO used this part 4 times in 6 weeks. Remaining stock 6 pcs, supplier lead time 10 days.",
  },
  {
    part: "V-Belt A-45",
    days: 5,
    confidence: 0.84,
    reason:
      "Seasonal usage pattern rises during shift 3 production. Average consumption 2.1 pcs/week, stock 9 pcs, no active PO.",
  },
  {
    part: "Oil Filter HF-6017",
    days: 6,
    confidence: 0.78,
    reason:
      "Scheduled PM for Boiler 01 & Chiller 02 in the next 12 days requires 6 pcs, while remaining stock is 7 pcs.",
  },
];

export const forecast = [
  { day: "D+0", stock: 24, lower: 24, upper: 24 },
  { day: "D+3", stock: 19, lower: 17, upper: 21 },
  { day: "D+6", stock: 15, lower: 12, upper: 18 },
  { day: "D+9", stock: 11, lower: 7, upper: 15 },
  { day: "D+12", stock: 7, lower: 3, upper: 12 },
  { day: "D+15", stock: 4, lower: 0, upper: 9 },
  { day: "D+18", stock: 1, lower: 0, upper: 7 },
];

export const inventory = [
  { code: "SP-0012", name: "Bearing SKF-6205", cat: "Bearing", stock: 6, min: 10, uom: "pcs", loc: "Rack A-1", status: "Critical" },
  { code: "SP-0031", name: "V-Belt A-45", cat: "Belt", stock: 9, min: 8, uom: "pcs", loc: "Rack B-2", status: "Low" },
  { code: "SP-0044", name: "Oil Filter HF-6017", cat: "Filter", stock: 7, min: 6, uom: "pcs", loc: "Rack B-4", status: "Low" },
  { code: "SP-0078", name: "Hydraulic Seal Kit 40mm", cat: "Seal", stock: 24, min: 10, uom: "set", loc: "Rack C-1", status: "Safe" },
  { code: "SP-0092", name: "Contactor LC1D18", cat: "Electrical", stock: 15, min: 5, uom: "pcs", loc: "Rack D-3", status: "Safe" },
  { code: "SP-0110", name: "Hydraulic Oil ISO 68", cat: "Lubricant", stock: 3, min: 8, uom: "drum", loc: "Warehouse B", status: "Critical" },
];

export const logPart = [
  { date: "04 Sep 2026", wo: "WO-2609-014", part: "Bearing SKF-6205", qty: 2, equipment: "Conveyor L2", tech: "Andi P." },
  { date: "03 Sep 2026", wo: "WO-2609-011", part: "V-Belt A-45", qty: 1, equipment: "Compressor A", tech: "Budi S." },
  { date: "02 Sep 2026", wo: "PM-2609-003", part: "Oil Filter HF-6017", qty: 2, equipment: "Boiler 01", tech: "Cahyo N." },
  { date: "01 Sep 2026", wo: "WO-2608-098", part: "Hydraulic Seal Kit 40mm", qty: 1, equipment: "Injection M-3", tech: "Dedi K." },
];

export const stockTransactions = [
  { id: "TRX-1042", date: "04 Sep 2026", type: "Out", part: "Bearing SKF-6205", qty: -2, ref: "WO-2609-014", by: "Warehouse 1" },
  { id: "TRX-1041", date: "03 Sep 2026", type: "In", part: "Contactor LC1D18", qty: +10, ref: "PO-8871", by: "Warehouse 1" },
  { id: "TRX-1040", date: "02 Sep 2026", type: "Out", part: "Oil Filter HF-6017", qty: -2, ref: "PM-2609-003", by: "Warehouse 2" },
  { id: "TRX-1039", date: "01 Sep 2026", type: "Adjustment", part: "Hydraulic Oil ISO 68", qty: -1, ref: "Stock Opname", by: "Admin" },
];

export const requests = [
  { id: "RQ-0231", date: "04 Sep 2026", part: "Bearing SKF-6205", qty: 12, requester: "Andi P.", dept: "Maintenance", status: "Pending Approval" },
  { id: "RQ-0230", date: "03 Sep 2026", part: "Hydraulic Oil ISO 68", qty: 6, requester: "Budi S.", dept: "Utility", status: "Approved" },
  { id: "RQ-0229", date: "02 Sep 2026", part: "V-Belt A-45", qty: 8, requester: "Cahyo N.", dept: "Production", status: "Rejected" },
];

export const purchaseReminders = [
  { part: "Bearing SKF-6205", stock: 6, min: 10, leadTime: "10 days", predicted: "3 days left", action: "Create PO now" },
  { part: "Hydraulic Oil ISO 68", stock: 3, min: 8, leadTime: "7 days", predicted: "4 days left", action: "Create PO now" },
  { part: "V-Belt A-45", stock: 9, min: 8, leadTime: "5 days", predicted: "5 days left", action: "Monitor" },
];

export const workOrders = [
  { no: "WO-2609-014", equipment: "Conveyor L2", desc: "Drive motor bearing noisy", type: "Corrective", prio: "High", tech: "Andi P.", status: "In Progress", due: "05 Sep 2026" },
  { no: "WO-2609-013", equipment: "Boiler 01", desc: "Steam header pipe leak", type: "Emergency", prio: "Critical", tech: "Budi S.", status: "Assigned", due: "04 Sep 2026" },
  { no: "PM-2609-003", equipment: "Chiller 02", desc: "30-day PM — replace filter & check refrigerant", type: "Preventive", prio: "Medium", tech: "Cahyo N.", status: "Open", due: "07 Sep 2026" },
  { no: "WO-2609-010", equipment: "Compressor A", desc: "AI recommendation: abnormal V-Belt consumption pattern", type: "Predictive", prio: "Medium", tech: "Dedi K.", status: "Awaiting Sparepart", due: "08 Sep 2026" },
  { no: "WO-2608-098", equipment: "Injection M-3", desc: "Hydraulic seal leak", type: "Corrective", prio: "Low", tech: "Andi P.", status: "Completed", due: "31 Aug 2026" },
];

export const checklists = [
  { name: "Daily Boiler Checklist", equipment: "Boiler 01", freq: "Daily", items: 12, shift: "Shift 1", status: "Completed", by: "Andi P." },
  { name: "Per-Shift Compressor Checklist", equipment: "Compressor A", freq: "Per Shift", items: 8, shift: "Shift 2", status: "In Progress", by: "Budi S." },
  { name: "Daily Conveyor Checklist", equipment: "Conveyor L2", freq: "Daily", items: 10, shift: "Shift 1", status: "Finding Found", by: "Cahyo N." },
  { name: "Weekly Chiller Checklist", equipment: "Chiller 02", freq: "Weekly", items: 15, shift: "Shift 3", status: "Missed", by: "-" },
];

export const schedule = [
  { id: "PM-2609-003", equipment: "Chiller 02", trigger: "Time-based — every 30 days", due: "07 Sep 2026", tech: "Cahyo N.", status: "Scheduled" },
  { id: "PM-2609-004", equipment: "Boiler 01", trigger: "Running hours — 2,000 hrs", due: "04 Sep 2026", tech: "Budi S.", status: "Due Today" },
  { id: "PM-2609-001", equipment: "Compressor A", trigger: "Time-based — every 14 days", due: "01 Sep 2026", tech: "Andi P.", status: "Overdue" },
  { id: "PM-2608-021", equipment: "Injection M-3", trigger: "Cycle count — 500k", due: "28 Aug 2026", tech: "Dedi K.", status: "Completed" },
];

export const approvalsMaintenance = [
  { id: "AP-MT-045", ref: "WO-2609-013", equipment: "Boiler 01", cost: "Rp 24,500,000", requester: "Budi S.", status: "Pending" },
  { id: "AP-MT-044", ref: "WO-2609-010", equipment: "Compressor A", cost: "Rp 8,200,000", requester: "Dedi K.", status: "Pending" },
  { id: "AP-MT-043", ref: "PM-2609-003", equipment: "Chiller 02", cost: "Rp 3,100,000", requester: "Cahyo N.", status: "Approved" },
];

export const approvalsSparepart = [
  { id: "AP-SP-112", ref: "RQ-0231", part: "Bearing SKF-6205", qty: 12, cost: "Rp 6,000,000", status: "Pending" },
  { id: "AP-SP-111", ref: "RQ-0230", part: "Hydraulic Oil ISO 68", qty: 6, cost: "Rp 11,400,000", status: "Approved" },
  { id: "AP-SP-110", ref: "RQ-0229", part: "V-Belt A-45", qty: 8, cost: "Rp 1,600,000", status: "Rejected" },
];

export const documents = [
  { name: "Manual Book Boiler 01", type: "PDF", equipment: "Boiler 01", version: "v3", updated: "12 Aug 2026" },
  { name: "V-Belt Replacement SOP", type: "PDF", equipment: "Compressor A", version: "v2", updated: "22 Jul 2026" },
  { name: "Panel L2 Wiring Diagram", type: "DWG", equipment: "Conveyor L2", version: "v1", updated: "03 Jun 2026" },
];

export const departments = [
  { code: "MTC", name: "Maintenance", head: "Rudi H.", members: 14 },
  { code: "PRD", name: "Production", head: "Sari W.", members: 62 },
  { code: "UTL", name: "Utility", head: "Joko L.", members: 9 },
];

export const parameters = [
  { key: "WO_APPROVAL_LIMIT", value: "Rp 10,000,000", desc: "WO cost threshold requiring manager approval" },
  { key: "AI_FORECAST_HORIZON", value: "30 days", desc: "Sparepart consumption prediction horizon" },
  { key: "PM_GRACE_PERIOD", value: "2 days", desc: "PM delay tolerance before marked overdue" },
];

export const documentNumbers = [
  { doc: "Work Order", prefix: "WO", format: "WO-YYMM-000", last: "WO-2609-014" },
  { doc: "Preventive", prefix: "PM", format: "PM-YYMM-000", last: "PM-2609-004" },
  { doc: "Request Part", prefix: "RQ", format: "RQ-0000", last: "RQ-0231" },
];

export const machines = [
  { code: "EQ-001", name: "Boiler 01", area: "Utility", brand: "Miura", year: 2019, status: "Running" },
  { code: "EQ-014", name: "Compressor A", area: "Utility", brand: "Atlas Copco", year: 2021, status: "Running" },
  { code: "EQ-022", name: "Conveyor L2", area: "Line 2", brand: "Interroll", year: 2018, status: "Maintenance" },
  { code: "EQ-031", name: "Injection M-3", area: "Line 3", brand: "Haitian", year: 2020, status: "Running" },
  { code: "EQ-040", name: "Chiller 02", area: "Utility", brand: "Trane", year: 2017, status: "Standby" },
];
