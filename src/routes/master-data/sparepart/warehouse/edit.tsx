import { createFileRoute } from "@tanstack/react-router";
import { WarehouseFormPage } from "./new";

export const Route = createFileRoute("/master-data/sparepart/warehouse/edit")({
  head: () => ({
    meta: [{ title: "Edit Location" }],
  }),
  component: EditLocationPage,
});

function EditLocationPage() {
  return <WarehouseFormPage mode="edit" />;
}