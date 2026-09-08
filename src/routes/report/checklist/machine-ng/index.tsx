import { createFileRoute } from "@tanstack/react-router";
import { MachineNgListPage } from "../../../checklist/machine-ng";

export const Route = createFileRoute("/report/checklist/machine-ng/")({
  head: () => ({ meta: [{ title: "List Machine NG" }] }),
  component: MachineNgListPage,
});