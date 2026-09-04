import { createFileRoute } from "@tanstack/react-router";
import { DataTable, PageHeader, Panel, SearchBar, StatusPill } from "@/components/ui-kit/page";
import { stockTransactions } from "@/lib/mock-data";

export const Route = createFileRoute("/spare-part/stock-transaction")({
  head: () => ({
    meta: [
      { title: "Stock Transactions — Maintenance Monitoring System" },
      {
        name: "description",
        content: "Complete record of all stock in, out, and adjustment transactions for spareparts.",
      },
      { property: "og:title", content: "Stock Transactions — CMMS" },
      {
        property: "og:description",
        content: "Sparepart stock transaction log: in, out, and adjustments.",
      },
    ],
  }),
  component: StockTransactionPage,
});

const typeTone = (t: string) =>
  t === "In" ? "success" : t === "Out" ? "destructive" : "warning";

function StockTransactionPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Stock Transactions"
        description="All sparepart stock movements — in, out, and adjustments"
      />

      <Panel
        title="Transaction History"
        actions={<SearchBar placeholder="Search transaction / part..." />}
      >
        <DataTable
          columns={["Transaction ID", "Date", "Type", "Part Name", "Qty", "Reference", "By"]}
          rows={stockTransactions.map((t) => [
            <span className="font-medium">{t.id}</span>,
            t.date,
            <StatusPill label={t.type} tone={typeTone(t.type)} />,
            t.part,
            <span className={t.qty < 0 ? "font-semibold text-destructive" : "font-semibold text-success"}>
              {t.qty > 0 ? `+${t.qty}` : t.qty}
            </span>,
            t.ref,
            t.by,
          ])}
        />
      </Panel>
    </div>
  );
}
