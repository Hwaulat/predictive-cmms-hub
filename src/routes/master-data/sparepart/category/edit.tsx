import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, CircleDot, Droplets, Plug, Settings, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categoryOptions: { id: string; title: string; icon: LucideIcon }[] = [
  { id: "mechanical", title: "Mechanical", icon: Settings },
  { id: "electrical", title: "Electrical", icon: Plug },
  { id: "fasteners", title: "Fasteners", icon: Wrench },
  { id: "shaft-part", title: "Shaft Part", icon: Wrench },
  { id: "o-ring-seal", title: "O-Ring & Seal", icon: CircleDot },
  { id: "oil-grease", title: "Oil and Grease", icon: Droplets },
];

export const Route = createFileRoute("/master-data/sparepart/category/edit")({
  validateSearch: (search: Record<string, unknown>) => ({
    category: typeof search.category === "string" ? search.category : "electrical",
  }),
  head: () => ({
    meta: [{ title: "Edit Category" }],
  }),
  component: EditCategoryPage,
});

function EditCategoryPage() {
  const { category } = Route.useSearch();
  const selectedCategory = categoryOptions.find((item) => item.id === category) ?? categoryOptions[1];
  const [selectedIcon, setSelectedIcon] = useState(selectedCategory.id);

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <Link to="/master-data/sparepart" search={{}} hash="category">
            <Button variant="outline" className="text-slate-700 bg-white">
              <ArrowLeft className="size-4 mr-2" /> Back
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-slate-800">Edit Category</h1>
        </div>
      </div>

      <div className="bg-white rounded-xl border shadow-sm p-6 space-y-6 w-full">
        <div className="space-y-2">
          <label htmlFor="category-title" className="text-sm font-medium text-slate-700">Category Title</label>
          <Input id="category-title" defaultValue={selectedCategory.title} className="bg-white" />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">Select Category Image</span>
            <button type="button" className="text-sm font-medium text-blue-600 hover:underline">+ Add Image</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categoryOptions.map(({ id, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setSelectedIcon(id)}
                className={`h-28 rounded-lg border p-3 flex flex-col items-center justify-center gap-2 transition-colors ${
                  selectedIcon === id ? "border-blue-600 ring-1 ring-blue-600" : "border-slate-200 hover:border-blue-300"
                }`}
              >
                <Icon className="size-10 text-sky-400" strokeWidth={1.5} />
                <span className="text-xs text-slate-500">Select</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-10">Update</Button>
        </div>
      </div>
    </div>
  );
}