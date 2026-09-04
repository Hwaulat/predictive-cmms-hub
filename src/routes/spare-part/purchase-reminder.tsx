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
          "Rekomendasi reorder sparepart dari AI berdasarkan prediksi konsumsi dan lead time supplier.",
      },
      { property: "og:title", content: "Purchase Reminder — CMMS" },
      {
        property: "og:description",
        content: "Pengingat pembelian otomatis berdasarkan analisis prediktif.",
      },
    ],
  }),
  component: PurchaseReminderPage,
});

function PurchaseReminderPage() {
  const urgent = purchaseReminders.filter((p) => p.action !== "Pantau").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Purchase Reminder"
        description="Rekomendasi pembelian sparepart dari AI berdasarkan prediksi konsumsi"
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total Reminder", value: purchaseReminders.length },
          { label: "Perlu PO Segera", value: `${urgent} item` },
          { label: "Pantau", value: `${purchaseReminders.length - urgent} item` },
        ].map((s) => (
          <div key={s.label} className="card-surface p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="mt-2 font-display text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <Panel
        title="Rekomendasi Reorder"
        description="Disusun dari prediksi konsumsi + lead time supplier"
      >
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-primary/8 px-4 py-2.5">
          <Sparkles className="size-4 text-primary" />
          <span className="text-sm font-medium text-primary">Powered by AI Predictive Engine</span>
        </div>
        <DataTable
          columns={["Sparepart", "Stok", "Min", "Lead Time", "Prediksi Habis", "Rekomendasi"]}
          rows={purchaseReminders.map((p) => [
            <span className="font-medium">{p.part}</span>,
            <span className={p.stock < p.min ? "font-semibold text-destructive" : ""}>{p.stock}</span>,
            p.min,
            p.leadTime,
            <StatusPill label={p.predicted} tone="warning" />,
            <StatusPill
              label={p.action}
              tone={p.action === "Pantau" ? "warning" : "destructive"}
            />,
          ])}
        />
      </Panel>
    </div>
  );
}
