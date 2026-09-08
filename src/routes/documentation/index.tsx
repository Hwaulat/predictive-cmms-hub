import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Eye, Search } from "lucide-react";
import { PageHeader, TablePagination } from "@/components/ui-kit/page";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { docMachines } from "@/lib/mock-data";

export const Route = createFileRoute("/documentation/")({
  component: DocumentationList,
});

function DocumentationList() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 w-full pb-20 animate-in fade-in-50 duration-500">
      <PageHeader
        title="Documentation"
        description="List of machines and equipment documentation"
      />

      <div className="bg-white border rounded-xl shadow-sm">
        <div className="p-4 border-b flex flex-wrap md:flex-nowrap items-center gap-4 justify-between bg-slate-50/50 rounded-t-xl">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-9 bg-white" />
          </div>
          
          <div className="flex items-center gap-3">
            <Select defaultValue="all">
              <SelectTrigger className="w-[200px] bg-white text-muted-foreground">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Filter by department</SelectItem>
                <SelectItem value="depA">Department A</SelectItem>
                <SelectItem value="depB">Department B</SelectItem>
                <SelectItem value="depC">Department C</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px] bg-white text-muted-foreground">
                <SelectValue placeholder="Filter by area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Filter by area</SelectItem>
                <SelectItem value="bA">Building A</SelectItem>
                <SelectItem value="bB">Building B</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white text-slate-500 font-semibold border-b">
                <th className="py-4 px-6 text-left">Action</th>
                <th className="py-4 px-6 text-left">Machine Code</th>
                <th className="py-4 px-6 text-left">Machine Name</th>
                <th className="py-4 px-6 text-left">Department</th>
                <th className="py-4 px-6 text-left">Area</th>
                <th className="py-4 px-6 text-left">Line</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {docMachines.map((machine) => (
                <tr key={machine.id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-6">
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 text-slate-400 hover:text-primary"
                        onClick={() => navigate({ to: `/documentation/${machine.id}` })}
                      >
                        <Eye className="size-4" />
                      </Button>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-600">{machine.id}</td>
                  <td className="py-4 px-6 text-slate-600">{machine.name}</td>
                  <td className="py-4 px-6 text-slate-600">{machine.department}</td>
                  <td className="py-4 px-6 text-slate-600">{machine.area}</td>
                  <td className="py-4 px-6 text-slate-600">{machine.line}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <TablePagination />
      </div>
    </div>
  );
}
