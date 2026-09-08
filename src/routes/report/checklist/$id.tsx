import { createFileRoute } from "@tanstack/react-router";
import { ChecklistDetailPage } from "../../checklist/$id";

export const Route = createFileRoute("/report/checklist/$id")({
  head: () => ({ meta: [{ title: "Detail Checklist Report" }] }),
  component: ChecklistDetailPage,
});