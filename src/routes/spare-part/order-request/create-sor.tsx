import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check, Trash2, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TablePagination } from "@/components/ui-kit/page";

export const Route = createFileRoute("/spare-part/order-request/create-sor")({
  head: () => ({
    meta: [
      { title: "Create SOR — Predictive CMMS Hub" },
      { name: "description", content: "Create Sparepart Order Request (SOR)" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>) => ({
    type: (search["type"] as string) || "repeat",
  }),
  component: CreateSorPage,
});

function CreateSorPage() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const orderType = search.type === "new" ? "New Order" : "Repeat Order";

  const [orderQty, setOrderQty] = useState("3");
  const [pricePr, setPricePr] = useState("0");

  return (
    <div className="space-y-6 pb-20 animate-in fade-in-50 duration-500">
      {/* Top Bar with Back, Title, and Submit */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="bg-white text-slate-700"
            onClick={() => navigate({ to: "/spare-part/order-request" })}
          >
            <ArrowLeft className="size-4 mr-2" /> Back
          </Button>
          <div className="flex items-center gap-2">
            <Check className="size-5 text-slate-700" />
            <h1 className="text-xl font-bold text-slate-800 font-display">
              Create SOR ({orderType})
            </h1>
          </div>
        </div>

        <Button className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white px-8 font-semibold">
          Submit
        </Button>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-xl border shadow-sm p-6 space-y-8">
        {/* Top Form Fields: PR. No, PR. Name, Request Delivery Date */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-slate-700">
              PR. No <span className="text-destructive">*</span>
            </Label>
            <Input placeholder="Input PR No" className="bg-white" />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-semibold text-slate-700">
              PR. Name <span className="text-destructive">*</span>
            </Label>
            <Input placeholder="Input PR Name" className="bg-white" />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-semibold text-slate-700">
              Request Delivery Date <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Input
                type="date"
                defaultValue="2026-09-09"
                className="bg-white text-slate-700 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Section: List Repeat Order / New Order */}
        <div className="space-y-4">
          <h2 className="font-bold text-base text-slate-800">List {orderType}</h2>

          <div className="border rounded-lg overflow-x-auto w-full bg-white">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100/80 border-b text-slate-600 uppercase text-[11px] font-bold tracking-wider whitespace-nowrap text-left">
                  <th className="py-3 px-4 text-center w-12">ACTION</th>
                  <th className="py-3 px-4">NO.</th>
                  <th className="py-3 px-4 min-w-[140px]">
                    SPAREPART CODE <span className="text-destructive">*</span>
                  </th>
                  <th className="py-3 px-4 min-w-[160px]">SPAREPART NAME</th>
                  <th className="py-3 px-4 min-w-[130px]">
                    ORDER QUANTITY <span className="text-destructive">*</span>
                  </th>
                  <th className="py-3 px-4 min-w-[130px]">
                    PRICE PR <span className="text-destructive">*</span>
                  </th>
                  <th className="py-3 px-4 min-w-[120px]">TOTAL PRICE PR</th>
                  <th className="py-3 px-4 min-w-[100px]">PR NO</th>
                  <th className="py-3 px-4 min-w-[140px]">DELIVERY PLAN</th>
                  <th className="py-3 px-4 min-w-[260px]">UPLOAD DOCUMENT</th>
                  <th className="py-3 px-4 min-w-[140px]">SPECIFICATION</th>
                  <th className="py-3 px-4 min-w-[120px]">DRAWING NO.</th>
                  <th className="py-3 px-4 min-w-[100px]">IN USE QTY</th>
                  <th className="py-3 px-4 min-w-[120px]">CURRENT STOCK</th>
                  <th className="py-3 px-4 min-w-[90px]">MIN QTY</th>
                  <th className="py-3 px-4 min-w-[90px]">MAX QTY</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                <tr className="hover:bg-slate-50/70 transition-colors whitespace-nowrap">
                  <td className="py-3 px-4 text-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-8 text-slate-400 hover:text-destructive border bg-white shadow-xs"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </td>
                  <td className="py-3 px-4 text-slate-700">1</td>
                  <td className="py-3 px-4 font-mono font-medium text-slate-800">SPR000007</td>
                  <td className="py-3 px-4 font-medium text-slate-800">SOLENOID VALVE</td>
                  <td className="py-3 px-4">
                    <Input
                      value={orderQty}
                      onChange={(e) => setOrderQty(e.target.value)}
                      className="w-20 h-9 bg-white text-center"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-slate-500 font-medium">Rp.</span>
                      <Input
                        value={pricePr}
                        onChange={(e) => setPricePr(e.target.value)}
                        className="w-24 h-9 bg-white"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Input
                      placeholder="Autofill"
                      disabled
                      className="w-24 h-9 bg-slate-50 text-slate-400"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="inline-flex items-center px-3 py-1.5 bg-slate-200/80 rounded-md text-slate-700 text-xs font-semibold">
                      Rp. 0
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 border rounded-md bg-white text-xs text-slate-700 shadow-xs">
                      <Calendar className="size-3.5 text-slate-400" />
                      <span>27/08/2026</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex w-64">
                      <div className="flex items-center justify-center border border-r-0 border-border bg-slate-50 px-2.5 rounded-l-md text-muted-foreground">
                        <FileText className="size-4" />
                      </div>
                      <div className="flex-1 border-y border-border px-3 py-1.5 text-xs text-muted-foreground bg-white truncate">
                        No document selected
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-l-none border-l-0 text-slate-700 bg-white h-9"
                      >
                        Browse
                      </Button>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-700">VNA-15-L</td>
                  <td className="py-3 px-4 text-slate-500">-</td>
                  <td className="py-3 px-4 text-slate-700 font-medium">4</td>
                  <td className="py-3 px-4 text-slate-700 font-medium">2</td>
                  <td className="py-3 px-4 text-slate-700 font-medium">3</td>
                  <td className="py-3 px-4 text-slate-700 font-medium">4</td>
                </tr>
              </tbody>
            </table>
          </div>

          <TablePagination />
        </div>
      </div>
    </div>
  );
}
