import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { 
  Users, UserCheck, UserX, Search, Eye, RotateCcw, Edit2, Trash2, Plus, 
  Image as ImageIcon
} from "lucide-react";
import { PageHeader } from "@/components/ui-kit/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  mockUsers,
  mockRoles,
  mockRolePermissions
} from "@/lib/mock-data";

export const Route = createFileRoute("/users-management")({
  component: UsersManagementPage,
});

function UsersManagementPage() {
  const [activeTab, setActiveTab] = useState("account");

  // User details modal state
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // Role permissions state
  const [selectedRole, setSelectedRole] = useState(mockRoles[0]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20 animate-in fade-in-50 duration-500">
      <PageHeader
        title="Users Management"
        description="Manage users, roles, and permissions"
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="bg-white p-1 rounded-xl border w-max mb-6">
          <TabsList className="bg-transparent h-10">
            <TabsTrigger 
              value="account" 
              className="data-[state=active]:bg-slate-100 data-[state=active]:text-primary rounded-lg px-6"
            >
              User Account
            </TabsTrigger>
            <TabsTrigger 
              value="permission"
              className="data-[state=active]:bg-slate-100 data-[state=active]:text-primary rounded-lg px-6"
            >
              Role Permission
            </TabsTrigger>
          </TabsList>
        </div>

        {/* TAB 1: USER ACCOUNT */}
        <TabsContent value="account" className="space-y-6 mt-0">
          
          {/* Top Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border p-5 flex items-center gap-4 shadow-sm">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                <Users className="size-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-muted-foreground">Total Users</p>
                <p className="text-3xl font-bold mt-1 text-blue-600">3</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border p-5 flex items-center gap-4 shadow-sm">
              <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
                <UserCheck className="size-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-muted-foreground">Active Users</p>
                <p className="text-3xl font-bold mt-1 text-green-600">3</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border p-5 flex items-center gap-4 shadow-sm">
              <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl">
                <UserX className="size-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-muted-foreground">Inactive Users</p>
                <p className="text-3xl font-bold mt-1 text-orange-600">0</p>
              </div>
            </div>
          </div>

          {/* Table Area */}
          <div className="bg-white border rounded-xl shadow-sm flex flex-col">
            {/* Filter Bar */}
            <div className="p-4 border-b flex flex-wrap md:flex-nowrap items-center gap-4 justify-between">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input placeholder="Search by username or email" className="pl-9 bg-slate-50/50" />
              </div>
              
              <div className="flex items-center gap-3">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[120px] bg-white">
                    <SelectValue placeholder="All Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Role</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px] bg-white">
                    <SelectValue placeholder="All Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Department</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[120px] bg-white">
                    <SelectValue placeholder="All Position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Position</SelectItem>
                  </SelectContent>
                </Select>
                
                {/* Create New User Modal */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white ml-2">
                      <Plus className="size-4 mr-2" /> Create New User
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2 text-xl pb-4 border-b">
                        <div className="p-1.5 bg-blue-50 text-blue-600 rounded-full">
                          <Plus className="size-5" />
                        </div>
                        Create New User
                      </DialogTitle>
                    </DialogHeader>
                    
                    <div className="grid grid-cols-2 gap-6 py-4">
                      <div className="space-y-2">
                        <Label>Username<span className="text-destructive">*</span></Label>
                        <Input placeholder="ex. andre" />
                      </div>
                      <div className="space-y-2">
                        <Label>Email<span className="text-destructive">*</span></Label>
                        <Input placeholder="ex. jsgi18@gmail.com" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Role<span className="text-destructive">*</span></Label>
                        <Select>
                          <SelectTrigger><SelectValue placeholder="Choose role" /></SelectTrigger>
                          <SelectContent><SelectItem value="user">User</SelectItem></SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Department<span className="text-destructive">*</span></Label>
                        <Select>
                          <SelectTrigger><SelectValue placeholder="Choose department" /></SelectTrigger>
                          <SelectContent><SelectItem value="mech">Mechanical</SelectItem></SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Position<span className="text-destructive">*</span></Label>
                        <Select>
                          <SelectTrigger><SelectValue placeholder="Choose position" /></SelectTrigger>
                          <SelectContent><SelectItem value="mgr">Manager</SelectItem></SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Phone<span className="text-destructive">*</span></Label>
                        <Input placeholder="ex. 0812-3456-7890" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Country</Label>
                        <Select>
                          <SelectTrigger><SelectValue placeholder="Choose country" /></SelectTrigger>
                          <SelectContent><SelectItem value="id">Indonesia</SelectItem></SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>City</Label>
                        <Select>
                          <SelectTrigger><SelectValue placeholder="Choose city" /></SelectTrigger>
                          <SelectContent><SelectItem value="bks">Bekasi</SelectItem></SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2 col-span-2">
                        <Label>Zip Code</Label>
                        <Input placeholder="Input zip code" />
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-3 pt-4 border-t">
                      <Button variant="outline">Cancel</Button>
                      <Button className="bg-slate-100 text-slate-400 hover:bg-slate-200" disabled>Save</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* User Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-500 uppercase text-xs font-bold tracking-wider">
                    <th className="py-4 px-4 text-left font-semibold">Action</th>
                    <th className="py-4 px-4 text-left font-semibold">Status</th>
                    <th className="py-4 px-4 text-left font-semibold">Username</th>
                    <th className="py-4 px-4 text-left font-semibold">Role</th>
                    <th className="py-4 px-4 text-left font-semibold">Department</th>
                    <th className="py-4 px-4 text-left font-semibold">Position</th>
                    <th className="py-4 px-4 text-left font-semibold">Phone</th>
                    <th className="py-4 px-4 text-left font-semibold">City</th>
                    <th className="py-4 px-4 text-left font-semibold">Country</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {mockUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8 text-slate-400 hover:text-primary"
                            onClick={() => {
                              setSelectedUser(user);
                              setIsDetailsOpen(true);
                            }}
                          >
                            <Eye className="size-4" />
                          </Button>
                          <Button variant="outline" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary">
                            <RotateCcw className="size-4" />
                          </Button>
                          <Button variant="outline" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary">
                            <Edit2 className="size-4" />
                          </Button>
                          <Button variant="outline" size="icon" className="h-8 w-8 text-slate-400 hover:text-destructive">
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Switch checked={user.status} />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="size-9 border shadow-sm">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.username[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-slate-800 leading-tight">{user.username}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{user.role}</td>
                      <td className="py-3 px-4 text-slate-600">{user.department}</td>
                      <td className="py-3 px-4 text-slate-600">{user.position}</td>
                      <td className="py-3 px-4 text-slate-600">{user.phone}</td>
                      <td className="py-3 px-4 text-slate-600">{user.city}</td>
                      <td className="py-3 px-4 text-slate-600">{user.country}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* TAB 2: ROLE PERMISSION */}
        <TabsContent value="permission" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Roles List */}
            <div className="md:col-span-4 bg-white border rounded-xl shadow-sm p-4 flex flex-col h-[600px]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Roles</h3>
                
                {/* Create New Role Modal */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white">
                      <Plus className="size-4 mr-2" /> Create New Role
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2 text-xl pb-4 border-b">
                        <div className="p-1.5 bg-blue-50 text-blue-600 rounded-full">
                          <Plus className="size-5" />
                        </div>
                        Create New Role
                      </DialogTitle>
                    </DialogHeader>
                    <div className="py-4 space-y-2">
                      <Label>Role Name</Label>
                      <Input placeholder="e.g. super admin" />
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t">
                      <Button variant="outline">Cancel</Button>
                      <Button className="bg-slate-100 text-slate-400 hover:bg-slate-200" disabled>Submit</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="space-y-2 overflow-y-auto pr-2">
                {mockRoles.map((role) => (
                  <div 
                    key={role.id}
                    onClick={() => setSelectedRole(role)}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedRole.id === role.id 
                        ? 'bg-[#1e3a8a] border-[#1e3a8a] text-white' 
                        : 'bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <h4 className="font-bold text-sm leading-tight">{role.name}</h4>
                      <p className={`text-xs mt-0.5 ${selectedRole.id === role.id ? 'text-blue-200' : 'text-muted-foreground'}`}>
                        {role.usersCount} users
                      </p>
                    </div>
                    <div className="flex items-center gap-1 opacity-80">
                      <Button variant="ghost" size="icon" className={`size-7 ${selectedRole.id === role.id ? 'hover:bg-blue-800 text-white' : ''}`}>
                        <Edit2 className="size-3.5" />
                      </Button>
                      <Button variant="destructive" size="icon" className="size-7 bg-red-500 hover:bg-red-600 text-white border-0">
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Permission Table */}
            <div className="md:col-span-8 bg-white border rounded-xl shadow-sm h-[600px] flex flex-col overflow-hidden">
              <div className="p-5 border-b shrink-0">
                <h3 className="font-bold text-xl uppercase tracking-wider text-slate-800">{selectedRole.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">Manage permissions for this role</p>
              </div>
              
              <div className="overflow-y-auto flex-1">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-slate-100 z-10">
                    <tr className="text-slate-500 uppercase text-xs font-bold tracking-wider">
                      <th className="py-4 px-5 text-left font-semibold">Menu</th>
                      <th className="py-4 px-2 text-center font-semibold">All Access</th>
                      <th className="py-4 px-2 text-center font-semibold">Create</th>
                      <th className="py-4 px-2 text-center font-semibold">Update</th>
                      <th className="py-4 px-2 text-center font-semibold">Delete</th>
                      <th className="py-4 px-2 text-center font-semibold">Only View</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {mockRolePermissions.map((perm, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="py-4 px-5 font-medium text-slate-700">{perm.menu}</td>
                        <td className="py-4 px-2 text-center">
                          <Checkbox checked={perm.allAccess} className="data-[state=checked]:bg-[#1e3a8a] data-[state=checked]:border-[#1e3a8a]" />
                        </td>
                        <td className="py-4 px-2 text-center">
                          <Checkbox checked={perm.create} className="data-[state=checked]:bg-[#1e3a8a] data-[state=checked]:border-[#1e3a8a]" />
                        </td>
                        <td className="py-4 px-2 text-center">
                          <Checkbox checked={perm.update} className="data-[state=checked]:bg-[#1e3a8a] data-[state=checked]:border-[#1e3a8a]" />
                        </td>
                        <td className="py-4 px-2 text-center">
                          <Checkbox checked={perm.delete} className="data-[state=checked]:bg-[#1e3a8a] data-[state=checked]:border-[#1e3a8a]" />
                        </td>
                        <td className="py-4 px-2 text-center">
                          <Checkbox checked={perm.onlyView} className="data-[state=checked]:bg-[#1e3a8a] data-[state=checked]:border-[#1e3a8a]" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </TabsContent>
      </Tabs>

      {/* User Details Modal (External to Table to avoid nesting issues) */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl overflow-hidden p-0 gap-0">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-2 text-xl font-bold">
              <div className="p-1.5 bg-blue-50 text-blue-600 rounded-full">
                <Eye className="size-5" />
              </div>
              Details
            </div>
            {/* Close button is handled by DialogContent internally, but we can style it if needed */}
          </div>
          
          {selectedUser && (
            <div className="flex flex-col md:flex-row p-6 gap-8 bg-slate-50/50">
              {/* Left Side: Avatar */}
              <div className="w-full md:w-[240px] flex flex-col shrink-0 gap-4">
                <div className="aspect-square rounded-2xl overflow-hidden border-2 shadow-sm bg-slate-100 flex items-center justify-center">
                  {selectedUser.avatar ? (
                    <img src={selectedUser.avatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="size-16 text-slate-300" />
                  )}
                </div>
                <Button variant="outline" className="w-full bg-white">
                  <ImageIcon className="size-4 mr-2" /> Change Photo
                </Button>
              </div>
              
              {/* Right Side: Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Status</p>
                    <p className="font-semibold text-green-600">Active</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Username</p>
                    <p className="font-semibold">{selectedUser.username}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Email</p>
                    <p className="font-semibold">{selectedUser.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Role</p>
                    <p className="font-semibold">{selectedUser.role}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Department</p>
                    <p className="font-semibold">{selectedUser.department}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Position</p>
                    <p className="font-semibold">{selectedUser.position}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Phone</p>
                    <p className="font-semibold">{selectedUser.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Country</p>
                    <p className="font-semibold">{selectedUser.country}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">City</p>
                    <p className="font-semibold">{selectedUser.city}</p>
                  </div>
                  <div className="md:col-span-2 grid grid-cols-2 gap-x-6">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Address</p>
                      <p className="font-semibold">-</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">ZIP Code</p>
                      <p className="font-semibold">-</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-8">
                  <Button className="bg-[#10b981] hover:bg-[#059669]">
                    <RotateCcw className="size-4 mr-2" /> Reset Password
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
