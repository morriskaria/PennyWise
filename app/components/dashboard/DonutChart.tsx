"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

const data = [
    { name: "Rent", value: 400, color: "#15803d" },
    { name: "Dining", value: 300, color: "#22c55e" },
    { name: "Travel", value: 300, color: "#84cc16" },
    { name: "Utilities", value: 200, color: "#06b6d4" },
]


export function DashboardDonutChart() {
    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend
                        verticalAlign="bottom"
                        height={36}
                        iconType="circle"
                        formatter={(value) => <span className="text-xs font-semibold text-muted">{value}</span>}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}
