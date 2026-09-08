import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Download, Plus, Eye, Edit2, Trash2, Search, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockRequestOrders } from "@/lib/mock-data";

export const Route = createFileRoute("/spare-part/request-order-list/")({
  component: RequestOrderList,
});

function getStatusColor(status: string) {
  if (status === "Approved") return "text-green-600 bg-green-50 border-green-200";
  if (status === "Completed") return "text-green-600 bg-green-50 border-green-200";
  if (status === "Ordered") return "text-blue-600 bg-blue-50 border-blue-200";
  if (status === "Rejected") return "text-red-600 bg-red-50 border-red-200";
  return "text-slate-600 bg-slate-50 border-slate-200";
}

function RequestOrderList() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 pb-20 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Plus className="size-5" /> Request Order List
        </h2>
        <div className="flex items-center gap-3">
          <Button className="bg-[#f97316] hover:bg-[#ea580c] text-white">
            <Download className="size-4 mr-2" /> Download Excel
          </Button>
          <Button 
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
            onClick={() => navigate({ to: "/spare-part/request-order-list/new" })}
          >
            <Plus className="size-4 mr-2" /> Add New Order
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border shadow-sm flex flex-col">
        {/* Filters */}
        <div className="p-4 border-b flex flex-wrap md:flex-nowrap items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input placeholder="Search by item name" className="pl-9 bg-slate-50/50" />
          </div>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px] bg-white">
              <SelectValue placeholder="All Status TL" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status TL</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-[160px] bg-white">
              <SelectValue placeholder="All Status Ordered" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status Ordered</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="ordered">Ordered</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="All Group In Charge" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Group In Charge</SelectItem>
              <SelectItem value="mech-entry">MECHANICAL - ENTRY</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex items-center">
            <Input type="date" className="w-[180px] bg-white text-muted-foreground" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-100/50 text-slate-500 uppercase text-xs font-bold tracking-wider">
                <th className="py-4 px-4 text-left font-semibold w-32">Action</th>
                <th className="py-4 px-4 text-left font-semibold">Team Leader</th>
                <th className="py-4 px-4 text-left font-semibold">Status Ordered</th>
                <th className="py-4 px-4 text-left font-semibold">Transaction Date</th>
                <th className="py-4 px-4 text-left font-semibold">Rev. No</th>
                <th className="py-4 px-4 text-left font-semibold">Group In Charge</th>
                <th className="py-4 px-4 text-left font-semibold">Item Name</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {mockRequestOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-9 w-9 rounded-xl bg-slate-50/50 border-slate-200 text-slate-500 hover:text-primary hover:bg-slate-100 shadow-sm transition-all"
                        onClick={() => navigate({ to: `/spare-part/request-order-list/${order.id}` })}
                      >
                        <Eye className="size-[18px]" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl bg-slate-50/50 border-slate-200 text-slate-500 hover:text-primary hover:bg-slate-100 shadow-sm transition-all">
                        <RotateCcw className="size-[18px]" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl bg-slate-50/50 border-slate-200 text-slate-500 hover:text-primary hover:bg-slate-100 shadow-sm transition-all">
                        <Edit2 className="size-[18px]" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl bg-slate-50/50 border-slate-200 text-slate-500 hover:text-destructive hover:bg-red-50 hover:border-red-200 shadow-sm transition-all">
                        <Trash2 className="size-[18px]" />
                      </Button>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.teamLeader)}`}>
                      {order.teamLeader}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.statusOrdered)}`}>
                      {order.statusOrdered}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{order.transactionDate}</td>
                  <td className="py-3 px-4 text-slate-600">{order.revNo}</td>
                  <td className="py-3 px-4 text-slate-600">{order.groupInCharge}</td>
                  <td className="py-3 px-4 text-slate-600 font-medium">{order.itemName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>Rows per page</span>
            <Select defaultValue="10">
              <SelectTrigger className="w-[70px] h-8 bg-slate-50">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectContent>
            </Select>
            <span className="ml-2">1-6 of 6</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" className="size-8 opacity-50 cursor-not-allowed">
              {"<<"}
            </Button>
            <Button variant="outline" size="icon" className="size-8 opacity-50 cursor-not-allowed">
              {"<"}
            </Button>
            <Button variant="outline" size="icon" className="size-8 bg-[#2563eb] text-white hover:bg-[#1d4ed8]">
              1
            </Button>
            <Button variant="outline" size="icon" className="size-8 opacity-50 cursor-not-allowed">
              {">"}
            </Button>
            <Button variant="outline" size="icon" className="size-8 opacity-50 cursor-not-allowed">
              {">>"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
