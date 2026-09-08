import { Calendar } from "lucide-react";
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
        actions={
          <div className="flex flex-wrap items-center gap-4 w-full">
            <SearchBar placeholder="Search transaction / part..." />
            <select className="h-10 rounded-lg border border-input bg-surface px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20">
              <option>Filter by type</option>
            </select>
            <select className="h-10 rounded-lg border border-input bg-surface px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20">
              <option>Filter by status</option>
            </select>
            <div className="h-10 rounded-lg border border-input bg-surface px-3 text-sm flex items-center justify-center text-muted-foreground ml-auto">
               <Calendar className="mr-2 size-4" /> dd/mm/yyyy - dd/mm/yyyy
            </div>
          </div>
        }
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
