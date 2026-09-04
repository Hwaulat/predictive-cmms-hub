import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { DataTable, PageHeader, Panel, StatusPill } from "@/components/ui-kit/page";
import { purchaseReminders } from "@/lib/mock-data";

export const Route = createFileRoute("/spare-part/purchase-reminder")({
  head: () => ({
    meta: [
      { title: "Purchase Reminder — Maintenance Monitoring System" },
      {
        name: "description",
        content:
          "AI-driven sparepart reorder recommendations based on consumption prediction and supplier lead time.",
      },
      { property: "og:title", content: "Purchase Reminder — CMMS" },
      {
        property: "og:description",
        content: "Automatic purchase reminders based on predictive analysis.",
      },
    ],
  }),
  component: PurchaseReminderPage,
});

function PurchaseReminderPage() {
  const urgent = purchaseReminders.filter((p) => p.action !== "Monitor").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Purchase Reminder"
        description="AI-driven sparepart purchase recommendations based on consumption prediction"
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total Reminders", value: purchaseReminders.length },
          { label: "Urgent PO Required", value: `${urgent} items` },
          { label: "Monitor", value: `${purchaseReminders.length - urgent} items` },
        ].map((s) => (
          <div key={s.label} className="card-surface p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="mt-2 font-display text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <Panel
        title="Reorder Recommendations"
        description="Based on consumption prediction + supplier lead time"
      >
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-primary/8 px-4 py-2.5">
          <Sparkles className="size-4 text-primary" />
          <span className="text-sm font-medium text-primary">Powered by AI Predictive Engine</span>
        </div>
        <DataTable
          columns={["Sparepart", "Stock", "Min", "Lead Time", "Predicted Depletion", "Recommendation"]}
          rows={purchaseReminders.map((p) => [
            <span className="font-medium">{p.part}</span>,
            <span className={p.stock < p.min ? "font-semibold text-destructive" : ""}>{p.stock}</span>,
            p.min,
            p.leadTime,
            <StatusPill label={p.predicted} tone="warning" />,
            <StatusPill
              label={p.action}
              tone={p.action === "Monitor" ? "warning" : "destructive"}
            />,
          ])}
        />
      </Panel>
    </div>
  );
}
