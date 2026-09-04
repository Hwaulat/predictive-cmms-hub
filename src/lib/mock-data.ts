export const kpis = [
  { label: "MTTR", value: "3.4 jam", delta: "-12% vs bulan lalu", icon: "wrench", tone: "success" },
  { label: "MTBF", value: "182 jam", delta: "+8% vs bulan lalu", icon: "refresh", tone: "success" },
  { label: "PM Compliance", value: "92%", delta: "Target 95%", icon: "calendar", tone: "warning" },
  { label: "Work Order Terbuka", value: "18", delta: "4 critical • 6 high", icon: "clipboard", tone: "info" },
  { label: "Equipment Availability", value: "96.2%", delta: "+1.1% minggu ini", icon: "activity", tone: "success" },
  { label: "Sparepart Berisiko (AI)", value: "7", delta: "3 habis < 7 hari", icon: "alert", tone: "destructive" },
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
      "Konsumsi 8 bulan terakhir naik 34%; WO Conveyor L2 memakai part ini 4x dalam 6 minggu. Sisa stok 6 pcs, lead time supplier 10 hari.",
  },
  {
    part: "V-Belt A-45",
    days: 5,
    confidence: 0.84,
    reason:
      "Pola pemakaian musiman naik saat produksi shift 3. Rata-rata pemakaian 2.1 pcs/minggu, stok 9 pcs, belum ada PO berjalan.",
  },
  {
    part: "Filter Oli HF-6017",
    days: 6,
    confidence: 0.78,
    reason:
      "PM terjadwal Boiler 01 & Chiller 02 pada 12 hari ke depan membutuhkan 6 pcs, sementara stok tersisa 7 pcs.",
  },
];

export const forecast = [
  { day: "H+0", stock: 24, lower: 24, upper: 24 },
  { day: "H+3", stock: 19, lower: 17, upper: 21 },
  { day: "H+6", stock: 15, lower: 12, upper: 18 },
  { day: "H+9", stock: 11, lower: 7, upper: 15 },
  { day: "H+12", stock: 7, lower: 3, upper: 12 },
  { day: "H+15", stock: 4, lower: 0, upper: 9 },
  { day: "H+18", stock: 1, lower: 0, upper: 7 },
];

export const inventory = [
  { code: "SP-0012", name: "Bearing SKF-6205", cat: "Bearing", stock: 6, min: 10, uom: "pcs", loc: "Rak A-1", status: "Kritis" },
  { code: "SP-0031", name: "V-Belt A-45", cat: "Belt", stock: 9, min: 8, uom: "pcs", loc: "Rak B-2", status: "Menipis" },
  { code: "SP-0044", name: "Filter Oli HF-6017", cat: "Filter", stock: 7, min: 6, uom: "pcs", loc: "Rak B-4", status: "Menipis" },
  { code: "SP-0078", name: "Seal Kit Hydraulic 40mm", cat: "Seal", stock: 24, min: 10, uom: "set", loc: "Rak C-1", status: "Aman" },
  { code: "SP-0092", name: "Contactor LC1D18", cat: "Elektrik", stock: 15, min: 5, uom: "pcs", loc: "Rak D-3", status: "Aman" },
  { code: "SP-0110", name: "Oli Hidrolik ISO 68", cat: "Pelumas", stock: 3, min: 8, uom: "drum", loc: "Gudang B", status: "Kritis" },
];

export const logPart = [
  { date: "04 Sep 2026", wo: "WO-2609-014", part: "Bearing SKF-6205", qty: 2, equipment: "Conveyor L2", tech: "Andi P." },
  { date: "03 Sep 2026", wo: "WO-2609-011", part: "V-Belt A-45", qty: 1, equipment: "Compressor A", tech: "Budi S." },
  { date: "02 Sep 2026", wo: "PM-2609-003", part: "Filter Oli HF-6017", qty: 2, equipment: "Boiler 01", tech: "Cahyo N." },
  { date: "01 Sep 2026", wo: "WO-2608-098", part: "Seal Kit Hydraulic 40mm", qty: 1, equipment: "Injection M-3", tech: "Dedi K." },
];

export const stockTransactions = [
  { id: "TRX-1042", date: "04 Sep 2026", type: "Keluar", part: "Bearing SKF-6205", qty: -2, ref: "WO-2609-014", by: "Gudang 1" },
  { id: "TRX-1041", date: "03 Sep 2026", type: "Masuk", part: "Contactor LC1D18", qty: +10, ref: "PO-8871", by: "Gudang 1" },
  { id: "TRX-1040", date: "02 Sep 2026", type: "Keluar", part: "Filter Oli HF-6017", qty: -2, ref: "PM-2609-003", by: "Gudang 2" },
  { id: "TRX-1039", date: "01 Sep 2026", type: "Adjustment", part: "Oli Hidrolik ISO 68", qty: -1, ref: "Stock Opname", by: "Admin" },
];

export const requests = [
  { id: "RQ-0231", date: "04 Sep 2026", part: "Bearing SKF-6205", qty: 12, requester: "Andi P.", dept: "Maintenance", status: "Menunggu Approval" },
  { id: "RQ-0230", date: "03 Sep 2026", part: "Oli Hidrolik ISO 68", qty: 6, requester: "Budi S.", dept: "Utility", status: "Disetujui" },
  { id: "RQ-0229", date: "02 Sep 2026", part: "V-Belt A-45", qty: 8, requester: "Cahyo N.", dept: "Produksi", status: "Ditolak" },
];

export const purchaseReminders = [
  { part: "Bearing SKF-6205", stock: 6, min: 10, leadTime: "10 hari", predicted: "3 hari lagi", action: "Buat PO sekarang" },
  { part: "Oli Hidrolik ISO 68", stock: 3, min: 8, leadTime: "7 hari", predicted: "4 hari lagi", action: "Buat PO sekarang" },
  { part: "V-Belt A-45", stock: 9, min: 8, leadTime: "5 hari", predicted: "5 hari lagi", action: "Pantau" },
];

export const workOrders = [
  { no: "WO-2609-014", equipment: "Conveyor L2", desc: "Bearing motor penggerak berisik", type: "Corrective", prio: "High", tech: "Andi P.", status: "In Progress", due: "05 Sep 2026" },
  { no: "WO-2609-013", equipment: "Boiler 01", desc: "Kebocoran pipa steam header", type: "Emergency", prio: "Critical", tech: "Budi S.", status: "Assigned", due: "04 Sep 2026" },
  { no: "PM-2609-003", equipment: "Chiller 02", desc: "PM 30 hari — ganti filter & cek refrigerant", type: "Preventive", prio: "Medium", tech: "Cahyo N.", status: "Open", due: "07 Sep 2026" },
  { no: "WO-2609-010", equipment: "Compressor A", desc: "Rekomendasi AI: pola konsumsi V-Belt abnormal", type: "Predictive", prio: "Medium", tech: "Dedi K.", status: "Menunggu Sparepart", due: "08 Sep 2026" },
  { no: "WO-2608-098", equipment: "Injection M-3", desc: "Hydraulic seal bocor", type: "Corrective", prio: "Low", tech: "Andi P.", status: "Selesai", due: "31 Agu 2026" },
];

export const checklists = [
  { name: "Checklist Harian Boiler", equipment: "Boiler 01", freq: "Harian", items: 12, shift: "Shift 1", status: "Selesai", by: "Andi P." },
  { name: "Checklist Per-Shift Compressor", equipment: "Compressor A", freq: "Per Shift", items: 8, shift: "Shift 2", status: "Berjalan", by: "Budi S." },
  { name: "Checklist Harian Conveyor", equipment: "Conveyor L2", freq: "Harian", items: 10, shift: "Shift 1", status: "Ada Temuan", by: "Cahyo N." },
  { name: "Checklist Mingguan Chiller", equipment: "Chiller 02", freq: "Mingguan", items: 15, shift: "Shift 3", status: "Terlewat", by: "-" },
];

export const schedule = [
  { id: "PM-2609-003", equipment: "Chiller 02", trigger: "Waktu — tiap 30 hari", due: "07 Sep 2026", tech: "Cahyo N.", status: "Terjadwal" },
  { id: "PM-2609-004", equipment: "Boiler 01", trigger: "Running hours — 2.000 jam", due: "04 Sep 2026", tech: "Budi S.", status: "Jatuh Tempo" },
  { id: "PM-2609-001", equipment: "Compressor A", trigger: "Waktu — tiap 14 hari", due: "01 Sep 2026", tech: "Andi P.", status: "Overdue" },
  { id: "PM-2608-021", equipment: "Injection M-3", trigger: "Cycle count — 500k", due: "28 Agu 2026", tech: "Dedi K.", status: "Selesai" },
];

export const approvalsMaintenance = [
  { id: "AP-MT-045", ref: "WO-2609-013", equipment: "Boiler 01", cost: "Rp 24.500.000", requester: "Budi S.", status: "Menunggu" },
  { id: "AP-MT-044", ref: "WO-2609-010", equipment: "Compressor A", cost: "Rp 8.200.000", requester: "Dedi K.", status: "Menunggu" },
  { id: "AP-MT-043", ref: "PM-2609-003", equipment: "Chiller 02", cost: "Rp 3.100.000", requester: "Cahyo N.", status: "Disetujui" },
];

export const approvalsSparepart = [
  { id: "AP-SP-112", ref: "RQ-0231", part: "Bearing SKF-6205", qty: 12, cost: "Rp 6.000.000", status: "Menunggu" },
  { id: "AP-SP-111", ref: "RQ-0230", part: "Oli Hidrolik ISO 68", qty: 6, cost: "Rp 11.400.000", status: "Disetujui" },
  { id: "AP-SP-110", ref: "RQ-0229", part: "V-Belt A-45", qty: 8, cost: "Rp 1.600.000", status: "Ditolak" },
];

export const documents = [
  { name: "Manual Book Boiler 01", type: "PDF", equipment: "Boiler 01", version: "v3", updated: "12 Agu 2026" },
  { name: "SOP Penggantian V-Belt", type: "PDF", equipment: "Compressor A", version: "v2", updated: "22 Jul 2026" },
  { name: "Wiring Diagram Panel L2", type: "DWG", equipment: "Conveyor L2", version: "v1", updated: "03 Jun 2026" },
];

export const departments = [
  { code: "MTC", name: "Maintenance", head: "Rudi H.", members: 14 },
  { code: "PRD", name: "Produksi", head: "Sari W.", members: 62 },
  { code: "UTL", name: "Utility", head: "Joko L.", members: 9 },
];

export const parameters = [
  { key: "WO_APPROVAL_LIMIT", value: "Rp 10.000.000", desc: "Batas biaya WO yang butuh approval manajer" },
  { key: "AI_FORECAST_HORIZON", value: "30 hari", desc: "Horizon prediksi konsumsi sparepart" },
  { key: "PM_GRACE_PERIOD", value: "2 hari", desc: "Toleransi keterlambatan PM sebelum dihitung overdue" },
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
