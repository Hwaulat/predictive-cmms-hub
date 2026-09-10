import { createFileRoute } from "@tanstack/react-router";
import { SparePartFormPage } from "./new";

export const Route = createFileRoute("/master-data/sparepart/edit")({
  head: () => ({
    meta: [{ title: "Edit Spare Part" }],
  }),
  component: EditSparePartPage,
});

function EditSparePartPage() {
  return <SparePartFormPage mode="edit" />;
}