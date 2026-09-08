import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Plus,
  Trash2,
  BookOpen,
  Search,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/spare-part/stock-transaction/create")({
  head: () => ({
    meta: [
      { title: "Create New (Inventory IN) — Predictive CMMS Hub" },
      { name: "description", content: "Create Inventory IN and Confirm Location" },
    ],
  }),
  component: CreateInventoryInPage,
});

interface SparepartRow {
  id: string;
  no: number;
  sparepartCode: string;
  sparepartDetail: string;
  quantity: number;
  price: string;
  remarks: string;
}

const initialSparepartRows: SparepartRow[] = [
  {
    id: "1",
    no: 1,
    sparepartCode: "",
    sparepartDetail: "Choose sparepart code",
    quantity: 0,
    price: "0",
    remarks: "",
  },
];

const storeLocations = [
  { id: "wh", name: "WH", racks: "1 Rack" },
  { id: "cct", name: "CCT", racks: "0 Rack" },
  { id: "orphaned", name: "ORPHANED", racks: "529 Rack" },
  { id: "sp3", name: "SP3", racks: "0 Rack" },
  { id: "sp2", name: "SP2", racks: "12 Rack" },
  { id: "sp1", name: "SP1", racks: "5 Rack" },
];

const rackLocations = [
  { id: "1", name: "RCK000784 - 02-1" },
  { id: "2", name: "RCK000783 - 02-2" },
  { id: "3", name: "RCK000782 - 02-4" },
  { id: "4", name: "RCK000779 - 02-6" },
  { id: "5", name: "RCK000781 - 02-7" },
  { id: "6", name: "RCK000780 - 02-8" },
  { id: "7", name: "RCK000778 - 02-9" },
];

function CreateInventoryInPage() {
  const navigate = useNavigate();

  // Current view step: "create" (SS 4) or "confirm-location" (SS 5)
  const [step, setStep] = useState<"create" | "confirm-location">("create");

  // Form State for Step 1
  const [items, setItems] = useState<SparepartRow[]>(initialSparepartRows);

  // Form State for Step 2
  const [selectedSparepartForLocation, setSelectedSparepartForLocation] = useState("SOLENOID VALVE (120)");
  const [selectedStore, setSelectedStore] = useState("orphaned");
  const [storeSearch, setStoreSearch] = useState("");
  const [rackSearch, setRackSearch] = useState("");
  const [rackQuantities, setRackQuantities] = useState<Record<string, string>>({});
  const [rackAllChecked, setRackAllChecked] = useState<Record<string, boolean>>({});

  const handleAddRow = () => {
    setItems((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        no: prev.length + 1,
        sparepartCode: "",
        sparepartDetail: "Choose sparepart code",
        quantity: 0,
        price: "0",
        remarks: "",
      },
    ]);
  };

  const handleDeleteRow = (id: string) => {
    if (items.length <= 1) return;
    setItems((prev) =>
      prev
        .filter((item) => item.id !== id)
        .map((item, index) => ({ ...item, no: index + 1 }))
    );
  };

  const handleCodeChange = (id: string, code: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          let detail = "Choose sparepart code";
          if (code === "SPR000007") detail = "SOLENOID VALVE / VNA-15-L / MECHANICAL";
          else if (code === "SPR010781") detail = "GASKET / 1050FF BLACK T=3MM / JIS10K x 100 A";
          else if (code === "SPR000566") detail = "OFFSET LINK CHAIN / RS40-1-OL / TSUBAKI";
          return { ...item, sparepartCode: code, sparepartDetail: detail };
        }
        return item;
      })
    );
  };

  const filteredStores = storeLocations.filter((s) =>
    s.name.toLowerCase().includes(storeSearch.toLowerCase())
  );

  const filteredRacks = rackLocations.filter((r) =>
    r.name.toLowerCase().includes(rackSearch.toLowerCase())
  );

  // ==========================================
  // VIEW: CONFIRM LOCATION (SS 5)
  // ==========================================
  if (step === "confirm-location") {
    return (
      <div className="space-y-6 pb-20 animate-in fade-in-50 duration-500">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="bg-white text-slate-700"
              onClick={() => setStep("create")}
            >
              <ArrowLeft className="size-4 mr-2" /> Back
            </Button>
            <div className="flex items-center gap-2">
              <BookOpen className="size-5 text-slate-700" />
              <h1 className="text-xl font-bold text-slate-800 font-display">Confirm Location</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button className="bg-[#f97316] hover:bg-[#ea580c] text-white px-6 font-medium shadow-sm">
              Draft
            </Button>
            <Button
              className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white px-6 font-medium shadow-sm"
              onClick={() => navigate({ to: "/spare-part/stock-transaction" })}
            >
              Submit
            </Button>
          </div>
        </div>

        {/* Top Section: List Sparepart Selection (SS 5) */}
        <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
          <h2 className="font-bold text-base text-slate-800">List Sparepart</h2>
          <div className="pt-1">
            <label className="inline-flex items-center gap-2.5 text-sm font-semibold text-slate-800 cursor-pointer">
              <input
                type="radio"
                name="sparepartLocation"
                checked={selectedSparepartForLocation === "SOLENOID VALVE (120)"}
                onChange={() => setSelectedSparepartForLocation("SOLENOID VALVE (120)")}
                className="size-4 text-blue-600 accent-blue-600 cursor-pointer"
              />
              <span>SOLENOID VALVE (120)</span>
            </label>
          </div>
        </div>

        {/* Bottom Split Section: Store Location & Rack Location (SS 5) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Card: Store Location */}
          <div className="lg:col-span-5 bg-white rounded-xl border shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-base text-slate-800">Store Location</h2>
              <div className="relative w-44">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
                <Input
                  placeholder="Search by store"
                  value={storeSearch}
                  onChange={(e) => setStoreSearch(e.target.value)}
                  className="pl-8 bg-white h-9 text-xs"
                />
              </div>
            </div>

            <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
              {filteredStores.map((store) => {
                const isSelected = selectedStore === store.id;
                return (
                  <div
                    key={store.id}
                    onClick={() => setSelectedStore(store.id)}
                    className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#1e3a8a] text-white border-[#1e3a8a] shadow-sm"
                        : "bg-slate-50/50 hover:bg-slate-100 border-border/60 text-slate-800"
                    }`}
                  >
                    <div className="font-bold text-sm leading-tight">{store.name}</div>
                    <div
                      className={`text-xs mt-0.5 ${
                        isSelected ? "text-slate-200" : "text-slate-500"
                      }`}
                    >
                      {store.racks}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Card: Rack Location */}
          <div className="lg:col-span-7 bg-white rounded-xl border shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-base text-slate-800">Rack Location</h2>
              <div className="relative w-48">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
                <Input
                  placeholder="Search by rack name"
                  value={rackSearch}
                  onChange={(e) => setRackSearch(e.target.value)}
                  className="pl-8 bg-white h-9 text-xs"
                />
              </div>
            </div>

            <div className="border rounded-lg overflow-x-auto w-full bg-white">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100/50 border-b text-slate-500 uppercase text-xs font-bold tracking-wider whitespace-nowrap text-left">
                    <th className="py-3 px-4">
                      <div className="inline-flex items-center gap-1 cursor-pointer">
                        RACK NAME <ArrowUpDown className="size-3 text-slate-400" />
                      </div>
                    </th>
                    <th className="py-3 px-4 text-center w-32">
                      <div className="inline-flex items-center gap-1 cursor-pointer">
                        ALL QUANTITY <ArrowUpDown className="size-3 text-slate-400" />
                      </div>
                    </th>
                    <th className="py-3 px-4 min-w-[160px]">
                      <div className="inline-flex items-center gap-1 cursor-pointer">
                        QUANTITY <ArrowUpDown className="size-3 text-slate-400" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredRacks.map((rack) => (
                    <tr key={rack.id} className="hover:bg-slate-50/70 transition-colors whitespace-nowrap">
                      <td className="py-3 px-4 font-mono font-medium text-slate-800 text-xs">
                        {rack.name}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Checkbox
                          checked={rackAllChecked[rack.id] || false}
                          onCheckedChange={(checked) =>
                            setRackAllChecked((prev) => ({
                              ...prev,
                              [rack.id]: Boolean(checked),
                            }))
                          }
                          className="size-4"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <Input
                          placeholder="ex. 10"
                          value={rackQuantities[rack.id] || ""}
                          onChange={(e) =>
                            setRackQuantities((prev) => ({
                              ...prev,
                              [rack.id]: e.target.value,
                            }))
                          }
                          className="w-32 bg-white h-8 text-xs"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: CREATE NEW (INVENTORY IN) (SS 4)
  // ==========================================
  return (
    <div className="space-y-6 pb-20 animate-in fade-in-50 duration-500">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="bg-white text-slate-700"
            onClick={() => navigate({ to: "/spare-part/stock-transaction" })}
          >
            <ArrowLeft className="size-4 mr-2" /> Back
          </Button>
          <div className="flex items-center gap-2">
            <Plus className="size-5 text-slate-700" />
            <h1 className="text-xl font-bold text-slate-800 font-display">
              Create New (Inventory IN)
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button className="bg-[#f97316] hover:bg-[#ea580c] text-white px-6 font-medium shadow-sm">
            Draft
          </Button>
          <Button
            className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white px-6 font-medium shadow-sm"
            onClick={() => setStep("confirm-location")}
          >
            Confirm Location
          </Button>
        </div>
      </div>

      {/* Main Container Card (SS 4) */}
      <div className="bg-white rounded-xl border shadow-sm p-6 space-y-6">
        <h2 className="font-bold text-base text-slate-800">List Sparepart</h2>

        {/* Table */}
        <div className="border rounded-lg overflow-x-auto w-full bg-white">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100/50 border-b text-slate-500 uppercase text-xs font-bold tracking-wider whitespace-nowrap text-left">
                <th className="py-4 px-4 text-center w-12">ACTION</th>
                <th className="py-4 px-4">NO.</th>
                <th className="py-4 px-4 min-w-[200px]">SPAREPART CODE</th>
                <th className="py-4 px-4 min-w-[280px]">SPAREPART DETAIL</th>
                <th className="py-4 px-4 min-w-[120px]">QUANTITY</th>
                <th className="py-4 px-4 min-w-[150px]">PRICE</th>
                <th className="py-4 px-4 min-w-[180px]">REMARKS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {items.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/70 transition-colors whitespace-nowrap">
                  <td className="py-3 px-4 text-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-8 text-slate-400 hover:text-destructive border bg-white shadow-xs"
                      onClick={() => handleDeleteRow(row.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </td>
                  <td className="py-3 px-4 text-slate-700">{row.no}</td>
                  <td className="py-3 px-4">
                    <Select
                      value={row.sparepartCode}
                      onValueChange={(val) => handleCodeChange(row.id, val)}
                    >
                      <SelectTrigger className="w-48 bg-white h-9 text-xs">
                        <SelectValue placeholder="Choose sparepar..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SPR000007">SPR000007 (SOLENOID VALVE)</SelectItem>
                        <SelectItem value="SPR010781">SPR010781 (GASKET)</SelectItem>
                        <SelectItem value="SPR000566">SPR000566 (OFFSET LINK)</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="py-3 px-4">
                    <div className="bg-slate-200/80 text-slate-600 rounded-md px-3 py-2 text-xs max-w-sm truncate">
                      {row.sparepartDetail}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Input
                      type="number"
                      value={row.quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        setItems((prev) =>
                          prev.map((it) => (it.id === row.id ? { ...it, quantity: val } : it))
                        );
                      }}
                      className="w-24 bg-white h-9 text-xs"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-slate-500 font-medium">Rp.</span>
                      <Input
                        value={row.price}
                        onChange={(e) => {
                          const val = e.target.value;
                          setItems((prev) =>
                            prev.map((it) => (it.id === row.id ? { ...it, price: val } : it))
                          );
                        }}
                        className="w-28 bg-white h-9 text-xs"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Input
                      placeholder="Remarks"
                      value={row.remarks}
                      onChange={(e) => {
                        const val = e.target.value;
                        setItems((prev) =>
                          prev.map((it) => (it.id === row.id ? { ...it, remarks: val } : it))
                        );
                      }}
                      className="w-36 bg-white h-9 text-xs"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add New Button */}
        <div>
          <Button
            onClick={handleAddRow}
            className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white font-medium px-5 shadow-sm"
          >
            <Plus className="size-4 mr-1.5" /> Add New
          </Button>
        </div>
      </div>
    </div>
  );
}
