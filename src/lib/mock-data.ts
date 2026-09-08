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

export const historyWorkOrders = [
  { no: "WID9870", submit: "12/12/2022 12:04", approved: "12/12/2022 12:04", type: "General", machineItem: "Item A", department: "Department A", area: "Building A", line: "Progresive Medium", status: "Approved" },
  { no: "WID9870", submit: "13/12/2022 12:04", approved: "13/12/2022 12:04", type: "General", machineItem: "Item B", department: "Department B", area: "Building A", line: "Progresive Medium", status: "Approved" },
  { no: "WID9870", submit: "14/12/2022 12:04", approved: "-", type: "General", machineItem: "Item C", department: "Department C", area: "Building A", line: "Progresive Medium", status: "Pending" },
  { no: "WID9870", submit: "15/12/2022 12:04", approved: "-", type: "General", machineItem: "Item D", department: "Department A", area: "Building A", line: "Progresive Medium", status: "Pending" },
  { no: "WID9870", submit: "16/12/2022 12:04", approved: "16/12/2022 12:04", type: "General", machineItem: "Item E", department: "Department B", area: "Building A", line: "Progresive Medium", status: "Approved" },
  { no: "WID9870", submit: "17/12/2022 12:04", approved: "-", type: "General", machineItem: "Item F", department: "Department B", area: "Building A", line: "Progresive Medium", status: "Pending" },
  { no: "WID9870", submit: "17/12/2022 12:04", approved: "-", type: "Machine", machineItem: "CRN-01 Crane", department: "Department B", area: "Building A", line: "Progresive Medium", status: "Pending" },
  { no: "WID9870", submit: "17/12/2022 12:04", approved: "-", type: "Machine", machineItem: "CRN-02 Crane", department: "Department C", area: "Building A", line: "Progresive Medium", status: "Pending" },
  { no: "WID9870", submit: "17/12/2022 12:04", approved: "-", type: "Machine", machineItem: "CRN-03 Crane", department: "Department C", area: "Building A", line: "Progresive Medium", status: "Pending" },
  { no: "WID9870", submit: "17/12/2022 12:04", approved: "-", type: "Machine", machineItem: "CRN-04 Crane", department: "Department D", area: "Building A", line: "Progresive Medium", status: "Pending" },
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
  {
    id: "dept-a",
    name: "Department A",
    type: "Production",
    areas: [
      {
        name: "Building A",
        lines: ["Progressive Medium", "Progressive Small"]
      },
      {
        name: "Building B",
        lines: ["Progressive Medium", "Progressive Small", "SSW-03"]
      }
    ]
  },
  {
    id: "dept-b",
    name: "Department B",
    type: "Maintenance",
    areas: [
      {
        name: "Building A",
        lines: ["Progressive Medium"]
      },
      {
        name: "Building B",
        lines: ["Progressive Medium", "Progressive Small", "SSW-03", "SSW-04", "SSW-05"]
      },
      {
        name: "Building C",
        lines: ["SSW-06", "SSW-07"]
      }
    ]
  }
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

export const breakdownAnalysis = [
  { cause: "Bearing Vibration", count: 12 },
  { cause: "Lubrication Issue", count: 8 },
  { cause: "Thermal Overload", count: 5 },
  { cause: "Misalignment", count: 3 },
];

export const kpiReportData = [
  { month: "Jan", oee: 82, mtbf: 190, mttr: 3.5, accuracy: 88 },
  { month: "Feb", oee: 84, mtbf: 195, mttr: 3.2, accuracy: 89 },
  { month: "Mar", oee: 85, mtbf: 210, mttr: 2.8, accuracy: 90 },
  { month: "Apr", oee: 87, mtbf: 225, mttr: 2.5, accuracy: 92 },
  { month: "May", oee: 86, mtbf: 218, mttr: 2.6, accuracy: 91 },
  { month: "Jun", oee: 89, mtbf: 240, mttr: 2.1, accuracy: 94 },
];

export const approvalMaintenanceList2 = [
  { id: "CID12345", doc: "TCF2/Form/ME/01/01", submit: "26/04/2023, 12:00", machine: "CRN-01 - Crane", dept: "Department A", area: "Building A", line: "Progresive Medium", exec: "Christin Purnama Sari", summary: "OK : 10 NG : 12", category: "Checklist", status: "Pending" },
  { id: "PID12344", doc: "TCF2/Form/ME/01/02", submit: "22/04/2023, 11:10", machine: "CRN-01 - Crane", dept: "Department B", area: "Building B", line: "Progresive Medium", exec: "Rizal Chandra", summary: "Check : 8 Repair : 8 Change : 8", category: "Preventive", status: "Pending" },
  { id: "PID12343", doc: "TCF2/Form/ME/01/02", submit: "21/04/2023, 17:30", machine: "CRN-01 - Crane", dept: "Department C", area: "Building A1", line: "Progresive Medium", exec: "Evelyn Bellinda", summary: "Check : 8 Repair : 8 Change : 8", category: "Preventive", status: "Pending" },
  { id: "WID12342", doc: "TCF2/Form/ME/01/03", submit: "23/04/2023, 13:55", machine: "CRN-01 - Crane", dept: "Department C", area: "Building A2", line: "Progresive Medium", exec: "-", summary: "No Data", category: "Work Order", status: "Confirmed" },
  { id: "VID12340", doc: "TCF2/Form/ME/01/03", submit: "20/04/2023, 08:45", machine: "CRN-01 - Crane", dept: "Department C", area: "Building C1", line: "Progresive Medium", exec: "-", summary: "No Data", category: "Corrective", status: "Confirmed" },
  { id: "VID12340-2", doc: "TCF2/Form/ME/01/03", submit: "24/04/2023, 07:40", machine: "CRN-01 - Crane", dept: "Department D", area: "Building C2", line: "Progresive Medium", exec: "-", summary: "No Data", category: "Corrective", status: "Confirmed" },
];

export const approvalChecklistReport = [
  { group: "A. Safety Factor", items: [
    { check: "1. Automatic Grease Pump", method: "Viewed", standard: "Works", status: "OK", variable: "23 N/m²", desc: "-", doc: true, photo: false },
    { check: "2. Connect Rod Lubrication Level", method: "Viewed", standard: "According to Level", status: "NG", variable: "-", desc: "Weighing less than ...", doc: true, photo: true },
    { check: "3. Air Pressure", method: "Viewed", standard: "According to Level", status: "OK", variable: "-", desc: "-", doc: true, photo: false },
  ] },
  { group: "B. Lubrication", items: [
    { check: "1. Wind Leaks", method: "Viewed - Written", standard: "No Leaks", status: "NG", variable: "-", desc: "Weighing less than ...", doc: true, photo: true },
    { check: "2. Completness of Buttons and Their Functions", method: "Viewed", standard: "No Leaks", status: "NG", variable: "23 N/m²", desc: "Stronger pressure...", doc: true, photo: true },
  ] },
  { group: "C. Hidrolic Oil", items: [
    { check: "1. Censor Safety Device", method: "Viewed - Checked", standard: "Complete", status: "OK", variable: "10 Gram", desc: "-", doc: true, photo: false },
    { check: "2. Clean the Machine Body", method: "Viewed - Checked", standard: "Works", status: "NG", variable: "23 N/m²", desc: "Stronger pressure...", doc: true, photo: true },
  ] },
  { group: "D. Sensor", items: [
    { check: "1. Clean the Machine Legs", method: "In Lap With Forward", standard: "Clean Machine", status: "OK", variable: "10 Gram", desc: "-", doc: true, photo: false },
  ] },
];

export const correctiveKpis = [
  { label: "Total Corrective", value: "34", delta: "-2 vs last month", icon: "alert", tone: "info" },
  { label: "Avg Response Time", value: "1.2 hrs", delta: "-15 mins vs last week", icon: "activity", tone: "success" },
  { label: "Avg Completion Time", value: "4.5 hrs", delta: "+30 mins", icon: "wrench", tone: "warning" },
  { label: "Corrective vs Preventive", value: "35% / 65%", delta: "Target <30%", icon: "calendar", tone: "info" },
] as const;

export const manpowerKpis = [
  { label: "Active Technicians", value: "12", delta: "2 on leave", icon: "users", tone: "info" },
  { label: "Avg WO / Tech", value: "3.5", delta: "Normal capacity", icon: "clipboard", tone: "success" },
  { label: "Avg Completion", value: "2.1 hrs", delta: "-10% vs last month", icon: "activity", tone: "success" },
] as const;

export const sparepartKpis = [
  { label: "Total Stock Value", value: "Rp 1.2B", delta: "+5% vs last month", icon: "wallet", tone: "info" },
  { label: "Below Min Stock", value: "14 Items", delta: "Need restock", icon: "alert", tone: "warning" },
  { label: "At Risk (AI)", value: "3 Items", delta: "Critical in <7 days", icon: "activity", tone: "destructive" },
  { label: "Top Used Part", value: "Bearing SKF", delta: "42 pcs this month", icon: "wrench", tone: "info" },
] as const;

export const technicians = [
  { name: "Andi P.", role: "Mechanical", activeWO: 4, capacity: "80%", avgTime: "1.5 hrs", ftf: "92%" },
  { name: "Budi S.", role: "Electrical", activeWO: 2, capacity: "40%", avgTime: "2.1 hrs", ftf: "88%" },
  { name: "Cahyo N.", role: "General", activeWO: 5, capacity: "100%", avgTime: "3.0 hrs", ftf: "85%" },
  { name: "Dedi K.", role: "Mechanical", activeWO: 1, capacity: "20%", avgTime: "1.2 hrs", ftf: "95%" },
];

export const partUsage = [
  { part: "Bearing SKF-6205", qty: 42, cost: "Rp 2.1M" },
  { part: "Oil Filter HF-6017", qty: 28, cost: "Rp 1.4M" },
  { part: "V-Belt A-45", qty: 24, cost: "Rp 1.2M" },
  { part: "Hydraulic Seal Kit", qty: 15, cost: "Rp 4.5M" },
];

export const aiCriticalParts = [
  { part: "Bearing SKF-6205", score: "94/100", equip: "Conveyor L2", stock: 6, rec: "Increase min-stock to 15" },
  { part: "Contactor LC1D18", score: "88/100", equip: "Boiler 01", stock: 15, rec: "Find alternative supplier" },
  { part: "Hydraulic Seal Kit", score: "82/100", equip: "Injection M-3", stock: 2, rec: "Reorder immediately" },
  { part: "V-Belt A-45", score: "65/100", equip: "Compressor A", stock: 9, rec: "Monitor usage" },
];

export const aiPartCorrelation = [
  { trigger: "Drive Motor Failure", part1: "Bearing SKF-6205", part2: "V-Belt A-45", correlation: "84%", rec: "Bundle as PM Kit A" },
  { trigger: "Pump Leakage", part1: "Hydraulic Seal Kit", part2: "Hydraulic Oil", correlation: "92%", rec: "Bundle as Pump Kit" },
  { trigger: "Control Panel Short", part1: "Contactor LC1D18", part2: "Fuse 10A", correlation: "76%", rec: "Keep together in Rack D" },
];

export const aiChecklistTrends = [
  { equip: "Boiler 01", item: "Oil Pressure Check", failCount: 4, timeframe: "14 Days", insight: "Strong indicator of impending pump seal failure.", status: "Warning" },
  { equip: "Compressor A", item: "Vibration Test", failCount: 2, timeframe: "7 Days", insight: "Vibration increasing steadily; check mounting bolts.", status: "Monitor" },
  { equip: "Conveyor L2", item: "Belt Tension", failCount: 5, timeframe: "30 Days", insight: "Frequent tension loss indicates bearing wear.", status: "Critical" },
];

export const aiPmRecommendations = [
  { equip: "Boiler 01", currentInterval: "30 Days", suggested: "21 Days", reason: "3 breakdowns occurred around day 25 post-PM in last 6 months.", confidence: "89%" },
  { equip: "Compressor A", currentInterval: "14 Days", suggested: "30 Days", reason: "No anomalies found in last 12 PMs. Safe to extend interval.", confidence: "94%" },
  { equip: "Injection M-3", currentInterval: "500k Cycles", suggested: "400k Cycles", reason: "Seal wear accelerates rapidly after 420k cycles.", confidence: "81%" },
];

export const aiWoForecast = [
  { month: "Sep", actual: 120, predicted: 122 },
  { month: "Oct", actual: null, predicted: 135 },
  { month: "Nov", actual: null, predicted: 110 },
  { month: "Dec", actual: null, predicted: 95 },
  { month: "Jan", actual: null, predicted: 140 },
];

export const aiSparepartKpis = [
  { label: "OVERDUE", value: "17", tone: "orange" },
  { label: "CRITICAL", value: "2", tone: "orange" },
  { label: "WARNING", value: "1", tone: "blue" },
  { label: "TOTAL REPLACEMENT COST", value: "Rp 55.910.000", tone: "blue" },
];

export const aiSparepartTable = [
  { machine: "MCH-03", part: "SP-ROB-03 Abicor Binzel Water-Cooled Mig Torch Neck & Cable Assembly", cat: "THERMAL", usage: 373, eol: "2026-01-10", eolDays: -239, urgency: 100, status: "OVERDUE", cost: 4975000 },
  { machine: "MCH-04", part: "SP-CMP-04 Minimum Pressure Check Valve Assembly (MPV)", cat: "MECHANICAL", usage: 443, eol: "2025-03-23", eolDays: -532, urgency: 100, status: "OVERDUE", cost: 4740000 },
  { machine: "MCH-02", part: "SP-HYD-02 Bosch Rexroth 4WRPE Proportional Servo Valve", cat: "ELECTRICAL", usage: 335, eol: "2025-06-10", eolDays: -453, urgency: 100, status: "OVERDUE", cost: 1445000 },
  { machine: "MCH-05", part: "SP-CNV-02 Head Pulley Pillow Block Spherical Roller Bearing (NTN 22212)", cat: "BEARING", usage: 359, eol: "2025-09-15", eolDays: -356, urgency: 100, status: "OVERDUE", cost: 1535000 },
  { machine: "MCH-01", part: "SP-CNC-01 Spindle Hybrid Ceramic Bearing Set (SKF 7014 CD/P4A)", cat: "BEARING", usage: 161, eol: "2026-08-11", eolDays: -26, urgency: 100, status: "OVERDUE", cost: 670000 },
  { machine: "MCH-02", part: "SP-HYD-04 Heavy Bronze Gib Guide Wear Plates Set", cat: "MECHANICAL", usage: 232, eol: "2026-01-03", eolDays: -246, urgency: 100, status: "OVERDUE", cost: 4670000 },
  { machine: "MCH-01", part: "SP-CNC-04 ATC Cam Follower & Arm Gripper Roller (Iko)", cat: "MECHANICAL", usage: 314, eol: "2026-01-02", eolDays: -247, urgency: 100, status: "OVERDUE", cost: 1930000 },
];

export const aiForecastKpis = [
  { label: "SCOPE", value: "ALL FLEET", tone: "blue" },
  { label: "HORIZON", value: "30d", tone: "blue" },
  { label: "REORDER NEEDED", value: "24", tone: "orange" },
  { label: "EST. COST", value: "Rp 1.108.345.050", tone: "blue" },
];

export const aiForecastTable = [
  { part: "SP-CNC-02 X/Y Precision C3 Ground Ball Screw Assembly (THK)", cat: "MECHANICAL", next30: 4.46, next90: 4.46, stock: 2, stockout: "13d", status: "REORDER 2u", cost: 9410600 },
  { part: "SP-ROB-04 MFDC Welding Inverter IGBT Power Switching Module", cat: "ELECTRICAL", next30: 4.19, next90: 4.19, stock: 2, stockout: "14d", status: "REORDER 2u", cost: 10642600 },
  { part: "SP-HYD-03 Main Axial Piston Hydraulic Pump Cartridge (Rexroth A4VSO)", cat: "MOTOR", next30: 4.06, next90: 4.06, stock: 1, stockout: "7d", status: "REORDER 3u", cost: 9338000 },
  { part: "SP-CMP-02 High-Efficiency Aluminum Plate-Fin Air/Oil Cooler", cat: "THERMAL", next30: 4.03, next90: 4.03, stock: 2, stockout: "14d", status: "REORDER 2u", cost: 6629350 },
  { part: "SP-ROB-01 Nabtesco RV Precision Reducer (Axis J3 / RV-110E)", cat: "MECHANICAL", next30: 4.00, next90: 4.00, stock: 2, stockout: "15d", status: "REORDER 2u", cost: 18600000 },
  { part: "SP-HYD-03 Main Axial Piston Hydraulic Pump Cartridge (Rexroth A4VSO)", cat: "MOTOR", next30: 3.97, next90: 3.97, stock: 1, stockout: "7d", status: "REORDER 3u", cost: 9131000 },
  { part: "SP-CNC-02 X/Y Precision C3 Ground Ball Screw Assembly (THK)", cat: "MECHANICAL", next30: 3.89, next90: 3.89, stock: 2, stockout: "15d", status: "REORDER 2u", cost: 8207900 },
];

export const aiKpiForecast = [
  { month: "Jan", mtbf: 190, oee: 82, mttr: 3.5, predicted: false },
  { month: "Feb", mtbf: 195, oee: 84, mttr: 3.2, predicted: false },
  { month: "Mar", mtbf: 210, oee: 85, mttr: 2.8, predicted: false },
  { month: "Apr", mtbf: 225, oee: 87, mttr: 2.5, predicted: false },
  { month: "May", mtbf: 218, oee: 86, mttr: 2.6, predicted: false },
  { month: "Jun", mtbf: 240, oee: 89, mttr: 2.1, predicted: false },
  { month: "Jul", mtbf: 245, oee: 90, mttr: 2.0, predicted: true },
  { month: "Aug", mtbf: 250, oee: 91, mttr: 1.8, predicted: true },
  { month: "Sep", mtbf: 248, oee: 90, mttr: 1.9, predicted: true },
];

export const aiKpiAnomalies = [
  { metric: "MTTR", type: "Spike", severity: "high", desc: "MTTR di Line 3 naik 45% dalam 2 minggu terakhir, berkorelasi dengan tingginya rasio teknisi junior yang bertugas." },
  { metric: "PM Compliance", type: "Drop", severity: "medium", desc: "Kepatuhan PM turun ke 82% untuk Boiler 01, biasanya stabil di >95%. Check log penugasan." },
];

export const aiKpiRecommendations = [
  { action: "Reschedule PM Load", desc: "Geser jadwal PM Boiler 01 ke minggu depan untuk menghindari penumpukan dengan overhaul Line 2.", impact: "High" },
  { action: "Optimize Shift 2", desc: "Pertimbangkan menambah kapasitas teknisi Shift 2, beban kerja 30% lebih tinggi dari shift lain namun MTTR lebih lambat.", impact: "Medium" },
  { action: "Review Seal Quality", desc: "Frekuensi penggantian Hydraulic Seal di Mesin M-3 naik tajam. Pertimbangkan evaluasi supplier part tersebut.", impact: "High" },
];

export const aiManpowerForecast = [
  { month: "Jan", capacity: 78, avgTime: 2.1, ftf: 92, predicted: false },
  { month: "Feb", capacity: 80, avgTime: 2.2, ftf: 90, predicted: false },
  { month: "Mar", capacity: 85, avgTime: 2.4, ftf: 88, predicted: false },
  { month: "Apr", capacity: 88, avgTime: 2.5, ftf: 86, predicted: false },
  { month: "May", capacity: 87, avgTime: 2.5, ftf: 87, predicted: false },
  { month: "Jun", capacity: 92, avgTime: 2.8, ftf: 83, predicted: false },
  { month: "Jul", capacity: 95, avgTime: 3.1, ftf: 79, predicted: true },
  { month: "Aug", capacity: 98, avgTime: 3.4, ftf: 75, predicted: true },
  { month: "Sep", capacity: 95, avgTime: 3.2, ftf: 77, predicted: true },
];

export const aiManpowerAnomalies = [
  { metric: "Workload Imbalance", type: "Spike", severity: "high", desc: "Beban kerja Budi S. mencapai 110% kapasitas maksimal, sementara Dedi K. hanya di 20%. Risiko kelelahan tinggi." },
  { metric: "Completion Time", type: "Delay", severity: "medium", desc: "Rata-rata waktu penyelesaian WO tipe 'Electrical' naik 25% minggu ini. Kemungkinan bottleneck pada persetujuan sparepart." },
];

export const aiManpowerRecommendations = [
  { action: "Reassign Work Orders", desc: "Pindahkan 2 WO Preventive dari Budi S. ke Dedi K. untuk meratakan beban kerja mekanik.", impact: "High" },
  { action: "Cross-Training", desc: "Berikan pelatihan dasar kelistrikan kepada tim General untuk mempercepat penanganan masalah kelistrikan ringan (FTF rate rendah di area ini).", impact: "Medium" },
];

export const generalTroubleByArea = [
  { date: "19/08", bA: 1.2, bA1: 0.5, bB: 0.8, bB1: 1.5, bC1: 0, avg: 5 },
  { date: "20/08", bA: 1.2, bA1: 0.5, bB: 0.8, bB1: 1.5, bC1: 0, avg: 6 },
  { date: "21/08", bA: 2.1, bA1: 1.4, bB: 1.2, bB1: 1.1, bC1: 0.3, avg: 5.5 },
  { date: "22/08", bA: 3.2, bA1: 1.6, bB: 2.4, bB1: 3.5, bC1: 1.1, avg: 5.4 },
  { date: "23/08", bA: 1.2, bA1: 0.5, bB: 0.8, bB1: 2.0, bC1: 1.0, avg: 5.5 },
  { date: "24/08", bA: 1.1, bA1: 0.6, bB: 0.7, bB1: 1.2, bC1: 0.4, avg: 4.8 },
  { date: "25/08", bA: 3.2, bA1: 1.6, bB: 2.4, bB1: 3.5, bC1: 1.5, avg: 5 },
  { date: "26/08", bA: 1.1, bA1: 0.6, bB: 0.7, bB1: 1.2, bC1: 0.6, avg: 5.5 },
  { date: "27/08", bA: 1.1, bA1: 0.6, bB: 0.7, bB1: 1.2, bC1: 0.6, avg: 5.4 },
  { date: "28/08", bA: 3.2, bA1: 1.6, bB: 2.4, bB1: 3.5, bC1: 1.2, avg: 5 },
  { date: "29/08", bA: 1.1, bA1: 0.6, bB: 0.7, bB1: 1.2, bC1: 0.6, avg: 5.8 },
  { date: "30/08", bA: 1.1, bA1: 0.6, bB: 0.7, bB1: 1.2, bC1: 0.6, avg: 5.2 },
  { date: "01/09", bA: 1.1, bA1: 0.6, bB: 0.7, bB1: 1.2, bC1: 0.6, avg: 7.8 },
  { date: "02/09", bA: 1.1, bA1: 0.6, bB: 0.7, bB1: 1.2, bC1: 0.6, avg: 8.2 },
];

export const generalChecklistProblem = [
  { name: "Clearance Clutch", value: 60, fill: "#3b82f6" },
  { name: "Lubrication System", value: 45, fill: "#10b981" },
  { name: "Solenoid Valve", value: 35, fill: "#f59e0b" },
  { name: "Motor Slide", value: 30, fill: "#06b6d4" },
  { name: "Balancer", value: 25, fill: "#1e1b4b" },
  { name: "Operator Panel", value: 20, fill: "#ef4444" },
  { name: "V-Belt", value: 15, fill: "#8b5cf6" },
  { name: "Push Button & Emergency", value: 10, fill: "#f43f5e" },
  { name: "Greasing Main Motor", value: 8, fill: "#6366f1" },
  { name: "Andon", value: 5, fill: "#eab308" },
];

export const generalSparepartUsage = [
  { month: "Jan", cost: 2500000 },
  { month: "Feb", cost: 4100000 },
  { month: "Mar", cost: 4800000 },
  { month: "Apr", cost: 3500000 },
  { month: "May", cost: 5800000 },
  { month: "Jun", cost: 6000000 },
  { month: "Jul", cost: 5900000 },
  { month: "Aug", cost: 7400000 },
  { month: "Sep", cost: 9500000 },
  { month: "Oct", cost: 11000000 },
  { month: "Nov", cost: 7100000 },
  { month: "Dec", cost: 5200000 },
];

export const correctiveMonthlyStatistic = [
  { month: "Jan", bA: 28, bA1: 10, bB: 28, bB1: 23, bC1: 10, avg: 60 },
  { month: "Feb", bA: 21, bA1: 15, bB: 25, bB1: 20, bC1: 18, avg: 50 },
  { month: "Mar", bA: 10, bA1: 8, bB: 12, bB1: 11, bC1: 7, avg: 28 },
  { month: "Apr", bA: 12, bA1: 28, bB: 19, bB1: 26, bC1: 22, avg: 60 },
  { month: "May", bA: 10, bA1: 20, bB: 15, bB1: 21, bC1: 13, avg: 48 },
  { month: "Jun", bA: 23, bA1: 16, bB: 19, bB1: 32, bC1: 7, avg: 68 },
  { month: "Jul", bA: 3, bA1: 6, bB: 15, bB1: 12, bC1: 10, avg: 40 },
  { month: "Aug", bA: 16, bA1: 36, bB: 7, bB1: 10, bC1: 18, avg: 76 },
  { month: "Sep", bA: 20, bA1: 32, bB: 10, bB1: 30, bC1: 18, avg: 74 },
  { month: "Oct", bA: 18, bA1: 38, bB: 17, bB1: 28, bC1: 27, avg: 80 },
  { month: "Nov", bA: 6, bA1: 14, bB: 9, bB1: 14, bC1: 12, avg: 31 },
  { month: "Dec", bA: 3, bA1: 9, bB: 6, bB1: 28, bC1: 21, avg: 56 },
];

export const correctiveFreqMachine = [
  { name: "Crane", value: 92, fill: "#ffb3b3", percent: 43 },
  { name: "Hoist", value: 43, fill: "#ffdd99", percent: 20 },
  { name: "Spot Welding", value: 32, fill: "#a3c2c2", percent: 15 },
  { name: "Air Dryer", value: 21, fill: "#99e6e6", percent: 10 },
  { name: "Compressor", value: 10, fill: "#b3ffb3", percent: 5 },
  { name: "Feeder", value: 16, fill: "#66b3ff", percent: 7 },
];

export const correctiveTop10 = [
  { name: "Clearance Clutch", value: 600 },
  { name: "Lubrication System", value: 500 },
  { name: "Overload System", value: 400 },
  { name: "Solenoid", value: 400 },
  { name: "Motor Slide", value: 200 },
  { name: "Balancer", value: 100 },
  { name: "Panel Operator", value: 60 },
  { name: "V-Belt", value: 40 },
  { name: "Push Button and Emergency Stop", value: 20 },
  { name: "Greasing Main Motor", value: 10 },
];

export const machineProblemTrendData = [
  { date: "19/08", val: 8 },
  { date: "20/08", val: 6 },
  { date: "21/08", val: 11 },
  { date: "22/08", val: 3 },
  { date: "23/08", val: 9 },
  { date: "24/08", val: 4 },
  { date: "25/08", val: 14 },
  { date: "26/08", val: 10 },
  { date: "27/08", val: 6 },
  { date: "28/08", val: 7 },
  { date: "29/08", val: 5 },
  { date: "30/08", val: 11 },
  { date: "31/08", val: 5 },
  { date: "01/09", val: 5 },
];

export const workOrderTrendLines = [
  { month: "Jan", wo: 210, cor: 250, val: 20 },
  { month: "Feb", wo: 240, cor: 400, val: 180 },
  { month: "Mar", wo: 250, cor: 460, val: 210 },
  { month: "Apr", wo: 560, cor: 380, val: 100 },
  { month: "May", wo: 400, cor: 320, val: 70 },
  { month: "Jun", wo: 820, cor: 530, val: 280 },
  { month: "Jul", wo: 880, cor: 600, val: 240 },
  { month: "Aug", wo: 580, cor: 850, val: 180 },
  { month: "Sep", wo: 480, cor: 720, val: 260 },
  { month: "Oct", wo: 640, cor: 940, val: 420 },
  { month: "Nov", wo: 680, cor: 700, val: 410 },
  { month: "Dec", wo: 500, cor: 480, val: 260 },
];

export const machineConditionItems = [
  { building: "Building A", check: 21, repair: 16, change: 32 },
  { building: "Building A1", check: 29, repair: 16, change: 9 },
  { building: "Building B", check: 22, repair: 15, change: 36 },
  { building: "Building B1", check: 20, repair: 15, change: 9 },
  { building: "Building C1", check: 22, repair: 38, change: 26 },
];

export const machineProblemComposition = [
  { name: "OK", value: 58.2, fill: "#34d399" },
  { name: "NG", value: 41.8, fill: "#f87171" },
];

export const mockUsers = [
  {
    id: "U001",
    status: true,
    username: "Tester01",
    email: "tester01@gmail.com",
    role: "Warehouse",
    department: "MECHANICAL",
    position: "Manager",
    phone: "085263547687",
    city: "BEKASI",
    country: "INDONESIA",
    avatar: "https://i.pravatar.cc/150?u=Tester01"
  },
  {
    id: "U002",
    status: true,
    username: "Tester PIC",
    email: "qwerty@gmail.com",
    role: "PIC",
    department: "MECHANICAL",
    position: "Supervisor",
    phone: "0812000000",
    city: "BEKASI",
    country: "INDONESIA",
    avatar: "https://i.pravatar.cc/150?u=TesterPIC"
  },
  {
    id: "U003",
    status: true,
    username: "admin",
    email: "admin@cmms.com",
    role: "SUPER ADMIN",
    department: "MECHANICAL",
    position: "Manager",
    phone: "08123456789",
    city: "JAKARTA",
    country: "INDONESIA",
    avatar: "https://i.pravatar.cc/150?u=admin"
  }
];

export const mockRoles = [
  { id: "r1", name: "SUPER ADMIN", usersCount: 1 },
  { id: "r2", name: "user", usersCount: 0 },
  { id: "r3", name: "PIC", usersCount: 1 },
  { id: "r4", name: "Warehouse", usersCount: 1 },
  { id: "r5", name: "Approval", usersCount: 0 },
  { id: "r6", name: "Operator", usersCount: 0 }
];

export const mockRolePermissions = [
  // AI & Analytics
  { menu: "AI Analytics - Sparepart", allAccess: false, create: false, update: false, delete: false, onlyView: true },
  { menu: "AI Analytics - Forecast Part", allAccess: false, create: false, update: false, delete: false, onlyView: true },
  { menu: "AI Analytics - Maintenance", allAccess: false, create: false, update: false, delete: false, onlyView: true },
  { menu: "AI for Breakdown Sparepart", allAccess: false, create: false, update: false, delete: false, onlyView: true },
  { menu: "AI for KPI", allAccess: false, create: false, update: false, delete: false, onlyView: true },

  // Main Menu - Dashboard
  { menu: "Dashboard General", allAccess: false, create: false, update: false, delete: false, onlyView: true },
  { menu: "Dashboard Corrective", allAccess: false, create: false, update: false, delete: false, onlyView: true },
  { menu: "Dashboard Machine", allAccess: false, create: false, update: false, delete: false, onlyView: true },
  { menu: "Dashboard Sparepart", allAccess: false, create: false, update: false, delete: false, onlyView: true },
  { menu: "Dashboard Manpower", allAccess: false, create: false, update: false, delete: false, onlyView: true },

  // Main Menu - Others
  { menu: "Checklist", allAccess: false, create: false, update: false, delete: false, onlyView: true },
  { menu: "Schedule", allAccess: false, create: false, update: false, delete: false, onlyView: true },
  { menu: "Work Order", allAccess: false, create: false, update: false, delete: false, onlyView: true },

  // Sparepart
  { menu: "Sparepart - Request Order List", allAccess: false, create: false, update: false, delete: false, onlyView: true },
  { menu: "Sparepart - Order Request", allAccess: false, create: false, update: false, delete: false, onlyView: true },
  { menu: "Sparepart - Log Part", allAccess: false, create: false, update: false, delete: false, onlyView: true },
  { menu: "Sparepart - Stock Transaction", allAccess: false, create: false, update: false, delete: false, onlyView: true },
  { menu: "Sparepart - Stock Opname", allAccess: false, create: false, update: false, delete: false, onlyView: true },
  { menu: "Sparepart - Purchase Reminder", allAccess: false, create: false, update: false, delete: false, onlyView: true },

  // Approval
  { menu: "Approval - Maintenance", allAccess: false, create: false, update: false, delete: false, onlyView: true },
  { menu: "Approval - Sparepart", allAccess: false, create: false, update: false, delete: false, onlyView: true },

  // Report & Documentation
  { menu: "Report - Checklist", allAccess: false, create: false, update: false, delete: false, onlyView: true },
  { menu: "Report - Preventive", allAccess: false, create: false, update: false, delete: false, onlyView: true },
  { menu: "Report - Corrective", allAccess: false, create: false, update: false, delete: false, onlyView: true },
  { menu: "Report - Sparepart", allAccess: false, create: false, update: false, delete: false, onlyView: true },
  { menu: "Documentation", allAccess: false, create: false, update: false, delete: false, onlyView: true },

  // Setup System - Master Data
  { menu: "Master Data - Department", allAccess: false, create: false, update: false, delete: false, onlyView: true },
  { menu: "Master Data - Machine", allAccess: false, create: false, update: false, delete: false, onlyView: true },
  { menu: "Master Data - Sparepart", allAccess: false, create: false, update: false, delete: false, onlyView: true },
  { menu: "Master Data - Checklist Form", allAccess: false, create: false, update: false, delete: false, onlyView: true },
  { menu: "Master Data - Preventive Form", allAccess: false, create: false, update: false, delete: false, onlyView: true },

  // Setup System - Others
  { menu: "Workflow Approval", allAccess: false, create: false, update: false, delete: false, onlyView: true },
  { menu: "Users Management", allAccess: false, create: false, update: false, delete: false, onlyView: true },
];

export const mockRequestOrders = [
  {
    id: "RO-001",
    teamLeader: "Approved",
    statusOrdered: "Approved",
    transactionDate: "04/09/2026, 17:11",
    revNo: "00",
    groupInCharge: "MECHANICAL - ENTRY",
    itemName: "GASKET",
    deliveryPlan: "04/09/2026",
    reasonRejected: "-",
    approvedBy: "admin",
    parts: [
      { docNo: "1", status: "Approved", statusOrdered: "Approved", applicationArea: "area 1", itemCode: "SPR010781", itemName: "GASKET", spec: "1050FF BLACK T=3MM", drawNo: "MECHANICAL", maker: "MKR000456", inUse: "-", currentStock: 54, minQty: 100, maxQty: 200, orderQty: 20, deliveryPlan: "04/09/2026", deliveryActual: "-" }
    ]
  },
  {
    id: "RO-002",
    teamLeader: "Approved",
    statusOrdered: "Completed",
    transactionDate: "04/09/2026, 09:33",
    revNo: "00",
    groupInCharge: "MECHANICAL - ENTRY",
    itemName: "Offset Link Chain",
    deliveryPlan: "04/09/2026",
    reasonRejected: "-",
    approvedBy: "admin",
    parts: []
  },
  {
    id: "RO-003",
    teamLeader: "Approved",
    statusOrdered: "Completed",
    transactionDate: "04/09/2026, 09:24",
    revNo: "00",
    groupInCharge: "MECHANICAL - DELIVERY",
    itemName: "Brake Pad",
    deliveryPlan: "04/09/2026",
    reasonRejected: "-",
    approvedBy: "admin",
    parts: []
  },
  {
    id: "RO-004",
    teamLeader: "Approved",
    statusOrdered: "Ordered",
    transactionDate: "28/08/2026, 17:05",
    revNo: "00",
    groupInCharge: "MECHANICAL - FURNACE",
    itemName: "GASKET",
    deliveryPlan: "28/08/2026",
    reasonRejected: "-",
    approvedBy: "admin",
    parts: []
  },
  {
    id: "RO-005",
    teamLeader: "Approved",
    statusOrdered: "Completed",
    transactionDate: "31/08/2026, 10:13",
    revNo: "00",
    groupInCharge: "MECHANICAL - TECHNOLOGY",
    itemName: "GASKET",
    deliveryPlan: "31/08/2026",
    reasonRejected: "-",
    approvedBy: "admin",
    parts: []
  },
  {
    id: "RO-006",
    teamLeader: "Approved",
    statusOrdered: "Completed",
    transactionDate: "28/08/2026, 16:59",
    revNo: "00",
    groupInCharge: "MECHANICAL - FURNACE",
    itemName: "GASKET",
    deliveryPlan: "28/08/2026",
    reasonRejected: "-",
    approvedBy: "admin",
    parts: []
  }
];
