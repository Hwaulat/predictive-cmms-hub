import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel } from "@/components/ui-kit/page";
import { breakdownAnalysis } from "@/lib/mock-data";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export const Route = createFileRoute("/dashboard/breakdown")({
  component: BreakdownPage,
});

function BreakdownPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Predictive Breakdown Causes"
        description="AI analyzed fault root causes for predictive maintenance"
      />

      <Panel>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={breakdownAnalysis}
                cx="50%"
                cy="50%"
                innerRadius={100}
                outerRadius={140}
                paddingAngle={5}
                dataKey="count"
                nameKey="cause"
                label
              >
                {breakdownAnalysis.map((entry, index) => {
                  const colors = [
                    "var(--color-chart-1)",
                    "var(--color-chart-2)",
                    "var(--color-chart-3)",
                    "var(--color-chart-4)",
                    "var(--color-chart-5)",
                  ];
                  return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                })}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Panel>
    </div>
  );
}
