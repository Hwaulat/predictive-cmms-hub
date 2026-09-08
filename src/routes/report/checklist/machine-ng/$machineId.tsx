import { createFileRoute } from "@tanstack/react-router";
import { MachineNgDetailPage } from "../../../checklist/machine-ng/$machineId";

export const Route = createFileRoute("/report/checklist/machine-ng/$machineId")({
  head: () => ({ meta: [{ title: "Detail Machine NG" }] }),
  component: MachineNgDetailPage,
});