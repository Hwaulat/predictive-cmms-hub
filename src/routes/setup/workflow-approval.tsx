import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Edit, Trash2, Plus, Settings } from "lucide-react";
import { PageHeader, TablePagination } from "@/components/ui-kit/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ConfirmDialog } from "@/components/ui-kit/confirm-dialog";
import { mockUsers } from "@/lib/mock-data";

export const Route = createFileRoute("/setup/workflow-approval")({
  component: WorkflowApprovalPage,
});

function WorkflowApprovalPage() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Initial workflow state
  const [workflows, setWorkflows] = useState([
    { position: "Section Head", approvals: ["admin", "Tester01"] },
    { position: "Group Head", approvals: ["Tester01", "admin"] },
    { position: "Team Leader", approvals: ["Tester01", "admin"] },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleRemoveApproval = (positionIdx: number, userIdx: number) => {
    const updated = [...workflows];
    const target = updated[positionIdx];
    if (target) {
      target.approvals.splice(userIdx, 1);
      setWorkflows(updated);
    }
  };

  const handleUpdateApproval = (positionIdx: number, userIdx: number, newUser: string) => {
    const updated = [...workflows];
    const target = updated[positionIdx];
    if (target) {
      target.approvals[userIdx] = newUser;
      setWorkflows(updated);
    }
  };

  const handleAddApproval = (positionIdx: number) => {
    const updated = [...workflows];
    const target = updated[positionIdx];
    if (target) {
      target.approvals.push("Tester01"); // default add
      setWorkflows(updated);
    }
  };

  const filteredWorkflows = workflows.filter(w => 
    w.approvals.some(a => a.toLowerCase().includes(searchTerm.toLowerCase())) ||
    w.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 w-full pb-20 animate-in fade-in-50 duration-500">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="size-6 text-foreground" />
        <h1 className="text-2xl font-bold text-foreground">Workflow Approval</h1>
      </div>

      <div className="bg-white rounded-xl border shadow-sm flex flex-col min-h-[500px]">
        {/* Top Control Bar */}
        <div className="p-4 border-b flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input 
              placeholder="Search by approval name" 
              className="pl-9 bg-slate-50/50" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="shrink-0 flex items-center gap-3">
            {isEditMode ? (
              <>
                <Button 
                  variant="destructive" 
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => setIsEditMode(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-[#2563eb] hover:bg-[#1d4ed8]"
                  onClick={() => setIsConfirmOpen(true)}
                >
                  Update
                </Button>
              </>
            ) : (
              <Button 
                className="bg-[#2563eb] hover:bg-[#1d4ed8]"
                onClick={() => setIsEditMode(true)}
              >
                <Edit className="size-4 mr-2" /> Edit Data Workflow
              </Button>
            )}
          </div>
        </div>

        {/* Data Table */}
        <div className="flex-1">
          <table className="w-full text-sm">
            <thead className="bg-slate-100/50">
              <tr className="text-slate-500 uppercase text-xs font-bold tracking-wider border-b">
                <th className="py-4 px-6 text-left w-1/3 font-semibold">Position Name</th>
                <th className="py-4 px-6 text-left w-2/3 font-semibold">Approval Name</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredWorkflows.map((workflow, pIdx) => (
                <tr key={workflow.position} className="align-top">
                  <td className="py-6 px-6 font-semibold text-slate-700">
                    {workflow.position}
                  </td>
                  <td className="py-6 px-6">
                    {isEditMode ? (
                      <div className="space-y-3 w-full">
                        {workflow.approvals.map((approver, aIdx) => (
                          <div key={aIdx} className="flex items-center gap-3 w-full">
                            <Select 
                              value={approver} 
                              onValueChange={(val) => handleUpdateApproval(pIdx, aIdx, val)}
                            >
                              <SelectTrigger className="bg-white">
                                <SelectValue placeholder="Select user" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="admin">admin</SelectItem>
                                <SelectItem value="Tester01">Tester01</SelectItem>
                                {mockUsers.map(u => (
                                  <SelectItem key={u.id} value={u.username}>{u.username}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="shrink-0 text-slate-400 hover:text-destructive"
                              onClick={() => handleRemoveApproval(pIdx, aIdx)}
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          </div>
                        ))}
                        <Button 
                          variant="default" 
                          size="sm" 
                          className="bg-[#1e40af] hover:bg-[#1e3a8a] text-white mt-2"
                          onClick={() => handleAddApproval(pIdx)}
                        >
                          <Plus className="size-4 mr-2" /> Add New User
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2 text-slate-600">
                        {workflow.approvals.map((approver, aIdx) => (
                          <div key={aIdx}>
                            {aIdx + 1}. {approver}
                          </div>
                        ))}
                        {workflow.approvals.length === 0 && (
                          <div className="text-muted-foreground italic">- No approvers -</div>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TablePagination />
      </div>

      <ConfirmDialog
        open={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        title="Update Workflow Approval"
        description="Are you sure you want to update the workflow approval?"
        actionText="Update"
        onConfirm={() => {
          setIsEditMode(false);
          // additional save logic here
        }}
      />
    </div>
  );
}
