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
    label: "Core Functions",
    items: [
      {
        title: "Dashboard",
        icon: LayoutGrid,
        children: [
          { title: "Overview", url: "/" },
          { title: "AI Analytics", url: "/ai-analytics" },
        ],
      },
      { title: "Checklist", url: "/checklist", icon: ClipboardList },
      { title: "Work Order", url: "/work-order", icon: Wrench },
      {
        title: "Spare part",
        icon: Layers,
        children: [
          { title: "Inventory", url: "/spare-part/inventory" },
          { title: "Log Part", url: "/spare-part/log-part" },
          { title: "Stock Transaction", url: "/spare-part/stock-transaction" },
          { title: "Request Part", url: "/spare-part/request-part" },
          { title: "Purchase Reminder", url: "/spare-part/purchase-reminder" },
        ],
      },
      { title: "Schedule", url: "/schedule", icon: Calendar },
      {
        title: "Approval",
        icon: CheckSquare,
        children: [
          { title: "Maintenance", url: "/approval/maintenance" },
          { title: "Spare Part", url: "/approval/spare-part" },
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
          { title: "Maintenance Report", url: "/report/maintenance" },
          { title: "Sparepart Report", url: "/report/sparepart" },
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
          { title: "Parameter", url: "/master-data/parameter" },
          { title: "Document Number", url: "/master-data/document-number" },
          { title: "Machine/Equipment", url: "/master-data/machine" },
        ],
      },
    ],
  },
];

export const aiIcon = Sparkles;
