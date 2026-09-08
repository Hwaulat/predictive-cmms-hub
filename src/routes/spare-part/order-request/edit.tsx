import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Edit2,
  Calendar,
  FileText,
  Trash2,
  X,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TablePagination } from "@/components/ui-kit/page";

export const Route = createFileRoute("/spare-part/order-request/edit")({
  head: () => ({
    meta: [
      { title: "Edit Order Request — Predictive CMMS Hub" },
      { name: "description", content: "Edit Sparepart Order Request" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>) => ({
    id: (search["id"] as string) || "1",
  }),
  component: EditOrderRequestPage,
});

function EditOrderRequestPage() {
  const navigate = useNavigate();
  const search = Route.useSearch();

  // Form State
  const [prNo, setPrNo] = useState("hgghfgh");
  const [prName, setPrName] = useState("hyfghfgfgf");
  const [deliveryDate, setDeliveryDate] = useState("2026-09-04");
  const [orderQty, setOrderQty] = useState("20");
  const [pricePr, setPricePr] = useState("20.000");
  const [pricePo, setPricePo] = useState("");
  const [poNo, setPoNo] = useState("");
  const [supplier, setSupplier] = useState("");

  return (
    <div className="space-y-6 pb-20 animate-in fade-in-50 duration-500">
      {/* Top Header Bar */}
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
            <Edit2 className="size-5 text-slate-700" />
            <h1 className="text-xl font-bold text-slate-800 font-display">Edit Order Request</h1>
          </div>
        </div>

        <Button className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white px-8 font-semibold">
          Update
        </Button>
      </div>

      {/* Main Container Card */}
      <div className="bg-white rounded-xl border shadow-sm p-6 space-y-8">
        {/* Top 5 Field Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-slate-700">
              PR. No <span className="text-destructive">*</span>
            </Label>
            <Input
              value={prNo}
              onChange={(e) => setPrNo(e.target.value)}
              className="bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-semibold text-slate-700">
              PR. Name <span className="text-destructive">*</span>
            </Label>
            <Input
              value={prName}
              onChange={(e) => setPrName(e.target.value)}
              className="bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-semibold text-slate-700">
              Submit Date to Purchase <span className="text-destructive">*</span>
            </Label>
            <div className="flex items-center gap-2 border rounded-md px-3 h-10 bg-white text-sm text-slate-400 cursor-pointer hover:bg-slate-50">
              <Calendar className="size-4 text-slate-400" />
              <span>Select date</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-semibold text-slate-700">
              Final Document PR <span className="text-destructive">*</span>
            </Label>
            <div className="flex">
              <div className="flex items-center justify-center border border-r-0 border-border bg-slate-50 px-2.5 rounded-l-md text-muted-foreground">
                <FileText className="size-4" />
              </div>
              <div className="flex-1 border-y border-border px-3 py-2 text-xs text-muted-foreground bg-white truncate">
                No docu...
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-l-none border-l-0 text-slate-700 bg-white h-10"
              >
                Browse
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-semibold text-slate-700">
              Request Delivery Date <span className="text-destructive">*</span>
            </Label>
            <div className="flex items-center justify-between border rounded-md px-3 h-10 bg-white text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-slate-400" />
                <span>04/09/2026</span>
              </div>
              <X className="size-4 text-slate-400 cursor-pointer hover:text-slate-600" />
            </div>
          </div>
        </div>

        {/* Section: List Order Request */}
        <div className="space-y-4">
          <h2 className="font-bold text-base text-slate-800">List Order Request</h2>

          <div className="border rounded-lg overflow-x-auto w-full bg-white">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100/50 border-b text-slate-500 uppercase text-xs font-bold tracking-wider whitespace-nowrap text-left">
                  <th className="py-4 px-4 text-center w-12">ACTION</th>
                  <th className="py-4 px-4">NO.</th>
                  <th className="py-4 px-4 min-w-[130px]">REQUESTED BY</th>
                  <th className="py-4 px-4 min-w-[130px]">ITEM CODE</th>
                  <th className="py-4 px-4 min-w-[140px]">DELIVERY ACTUAL</th>
                  <th className="py-4 px-4 min-w-[200px]">SPAREPART CODE (ACTUAL)</th>
                  <th className="py-4 px-4 min-w-[260px]">SPAREPART DETAILS</th>
                  <th className="py-4 px-4 min-w-[150px]">PO. NUMBER</th>
                  <th className="py-4 px-4 min-w-[140px]">PO. DATE</th>
                  <th className="py-4 px-4 min-w-[160px]">SUPPLIER</th>
                  <th className="py-4 px-4 min-w-[100px]">ORDER QTY</th>
                  <th className="py-4 px-4 min-w-[140px]">PRICE PR</th>
                  <th className="py-4 px-4 min-w-[140px]">TOTAL PRICE PR</th>
                  <th className="py-4 px-4 min-w-[130px]">PR NO</th>
                  <th className="py-4 px-4 min-w-[140px]">PRICE PO</th>
                  <th className="py-4 px-4 min-w-[140px]">TOTAL PRICE PO</th>
                  <th className="py-4 px-4 min-w-[100px]">IN USE QTY</th>
                  <th className="py-4 px-4 min-w-[120px]">CURRENT STOCK</th>
                  <th className="py-4 px-4 min-w-[90px]">MIN QTY</th>
                  <th className="py-4 px-4 min-w-[90px]">MAX QTY</th>
                  <th className="py-4 px-4 min-w-[140px]">DELIVERY PLAN</th>
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
                  <td className="py-3 px-4 text-slate-800 font-medium">admin</td>
                  <td className="py-3 px-4 font-mono text-slate-800 font-medium">SPR010781</td>
                  <td className="py-3 px-4 text-slate-500">-</td>
                  <td className="py-3 px-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 border rounded-full text-xs font-semibold bg-white text-slate-800 shadow-xs">
                      <span>SPR010781</span>
                      <X className="size-3 text-slate-400 cursor-pointer hover:text-slate-600" />
                      <ChevronDown className="size-3 text-slate-400" />
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-700 max-w-md truncate">
                    GASKET / 1050FF BLACK T=3MM / JIS10K x 100 A / EPDM / MECHANICAL / MKR000456
                  </td>
                  <td className="py-3 px-4">
                    <Input
                      placeholder="Input PO No"
                      value={poNo}
                      onChange={(e) => setPoNo(e.target.value)}
                      className="w-32 bg-white h-9 text-xs"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 border rounded-md bg-white text-xs text-slate-400 cursor-pointer hover:bg-slate-50">
                      <Calendar className="size-3.5 text-slate-400" />
                      <span>Select date</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Select defaultValue="supplier">
                      <SelectTrigger className="w-36 h-9 bg-white text-xs">
                        <SelectValue placeholder="Select Supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="supplier">Select Supplier</SelectItem>
                        <SelectItem value="sup1">PT Sumber Makmur</SelectItem>
                        <SelectItem value="sup2">PT Jaya Mandiri</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="py-3 px-4 text-slate-800 font-semibold">{orderQty}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-slate-500 font-medium">Rp.</span>
                      <Input
                        value={pricePr}
                        onChange={(e) => setPricePr(e.target.value)}
                        className="w-24 bg-white h-9 text-xs font-medium"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="inline-flex items-center px-3 py-1.5 bg-slate-200/80 rounded-md text-slate-700 text-xs font-semibold gap-1">
                      <span>Rp.</span> 400.000
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Input defaultValue="hgghfgh" className="w-28 bg-white h-9 text-xs font-mono" />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-slate-500 font-medium">Rp.</span>
                      <Input
                        placeholder="Price PO"
                        value={pricePo}
                        onChange={(e) => setPricePo(e.target.value)}
                        className="w-24 bg-white h-9 text-xs"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="inline-flex items-center px-3 py-1.5 bg-slate-200/80 rounded-md text-slate-700 text-xs font-semibold gap-1">
                      <span>Rp.</span> Total PO 0
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-500">-</td>
                  <td className="py-3 px-4 text-slate-800 font-semibold">54</td>
                  <td className="py-3 px-4 text-slate-600">100</td>
                  <td className="py-3 px-4 text-slate-600">200</td>
                  <td className="py-3 px-4 text-slate-700 font-medium">04/09/2026</td>
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
