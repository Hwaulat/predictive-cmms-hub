import {
  LayoutGrid,
  Layers,
  Calendar,
  CheckSquare,
  FileText,
  FileSpreadsheet,
  Box,
  Sparkles,
  ClipboardList,
  Wrench,
  GitMerge,
  Users,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  title: string;
  url?: string;
  icon?: LucideIcon;
  children?: { title: string; url: string }[];
};

export type NavSection = {
  label: string;
  items: NavItem[];
};

export const navSections: NavSection[] = [
  {
    label: "AI & Analytics",
    items: [
      {
        title: "AI Analytics",
        icon: Sparkles,
        children: [
          { title: "Sparepart", url: "/ai/sparepart" },
          { title: "Forecast Part", url: "/ai/forecast-part" },
          { title: "Maintenance", url: "/ai/maintenance" },
        ],
      },
      { title: "AI for Breakdown Sparepart", url: "/ai/breakdown-sparepart", icon: Sparkles },
      { title: "AI for KPI", url: "/ai/kpi", icon: Sparkles },
    ],
  },
  {
    label: "Main Menu",
    items: [
      {
        title: "Dashboard",
        icon: LayoutGrid,
        children: [
          { title: "General", url: "/" },
          { title: "Corrective", url: "/dashboard/corrective" },
          { title: "Machine", url: "/dashboard/machine" },
          { title: "Sparepart", url: "/dashboard/sparepart" },
          { title: "Manpower", url: "/dashboard/manpower" },
        ],
      },
      { title: "Schedule", url: "/schedule", icon: Calendar },
      { title: "Work Order", url: "/work-order", icon: Wrench },
      {
        title: "Sparepart",
        icon: Layers,
        children: [
          { title: "Request Order List", url: "/spare-part/request-order-list" },
          { title: "Order Request", url: "/spare-part/order-request" },
          { title: "Log Part", url: "/spare-part/log-part" },
          { title: "Stock Transaction", url: "/spare-part/stock-transaction" },
          { title: "Stock Opname", url: "/spare-part/stock-opname" },
          { title: "Purchase Reminder", url: "/spare-part/purchase-reminder" },
        ],
      },
      {
        title: "Approval",
        icon: CheckSquare,
        children: [
          { title: "Maintenance", url: "/approval/maintenance" },
          { title: "Sparepart", url: "/approval/spare-part" },
        ],
      },
    ],
  },
  {
    label: "Report & Documentation",
    items: [
      {
        title: "Report",
        icon: FileText,
        children: [
          { title: "Checklist", url: "/report/checklist" },
          { title: "Preventive", url: "/report/preventive" },
          { title: "Corrective", url: "/report/corrective" },
          { title: "Sparepart", url: "/report/sparepart" },
        ],
      },
      { title: "Documentation", url: "/documentation", icon: FileSpreadsheet },
    ],
  },
  {
    label: "Setup System",
    items: [
      {
        title: "Master Data",
        icon: Box,
        children: [
          { title: "Department", url: "/master-data/department" },
          { title: "Machine", url: "/master-data/machine" },
          { title: "Sparepart", url: "/master-data/sparepart" },
          { title: "Checklist Form", url: "/master-data/checklist-form" },
          { title: "Preventive Form", url: "/master-data/preventive-form" },
        ],
      },
      { title: "Workflow Approval", url: "/setup/workflow-approval", icon: GitMerge },
      { title: "Users Management", url: "/users-management", icon: Users },
    ],
  },
];

export const aiIcon = Sparkles;
