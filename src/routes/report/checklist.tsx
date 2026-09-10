import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/report/checklist")({
  component: () => <Outlet />,
});