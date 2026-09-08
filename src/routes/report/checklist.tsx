import { createFileRoute, useLocation } from "@tanstack/react-router";
import { ChecklistPage } from "../checklist";
import { MachineNgListPage } from "../checklist/machine-ng";

export const Route = createFileRoute("/report/checklist")({
  head: () => ({
    meta: [{ title: "Checklist Report — Maintenance Monitoring System" }],
  }),
  component: ReportChecklistPage,
});

function ReportChecklistPage() {
  const { pathname } = useLocation();

  if (pathname === "/report/checklist/machine-ng" || pathname === "/report/checklist/machine-ng/") {
    return <MachineNgListPage />;
  }

  return <ChecklistPage />;
}