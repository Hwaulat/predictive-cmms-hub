import { createFileRoute } from "@tanstack/react-router";
import { MachineFormPage } from "./new";

export const Route = createFileRoute("/master-data/machine/edit")({
  head: () => ({
    meta: [{ title: "Edit Machine/Equipment" }],
  }),
  component: EditMachinePage,
});

function EditMachinePage() {
  return <MachineFormPage mode="edit" />;
}