import { Badge } from "@/app/components/ui/badge"
import { cn } from "@/lib/utils"
import { ArrowDownLeft, ArrowUpRight } from "lucide-react"

const transactions = [
    {
        id: 1,
        type: 'Income',
        category: 'Direct Sales',
        amount: '+$1,200.00',
        date: 'Oct 24, 2023',
        status: 'Completed',
    },
    {
        id: 2,
        type: 'Expense',
        category: 'Rent',
        amount: '-$2,500.00',
        date: 'Oct 22, 2023',
        status: 'Pending',
    },
    {
        id: 3,
        type: 'Income',
        category: 'Consulting',
        amount: '+$850.00',
        date: 'Oct 20, 2023',
        status: 'Completed',
    },
    {
        id: 4,
        type: 'Expense',
        category: 'Utilities',
        amount: '-$120.00',
        date: 'Oct 18, 2023',
        status: 'Completed',
    },
]

export function TransactionsTable() {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-border">
                        <th className="px-6 py-4 text-[10px] italic font-black text-muted-foreground uppercase tracking-wider">Transaction</th>
                        <th className="px-6 py-4 text-[10px] italic font-black text-muted-foreground uppercase tracking-wider">Category</th>
                        <th className="px-6 py-4 text-[10px] italic font-black text-muted-foreground uppercase tracking-wider">Date</th>
                        <th className="px-6 py-4 text-[10px] italic font-black text-muted-foreground uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-4 text-[10px] italic font-black text-muted-foreground uppercase tracking-wider">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    {transactions.map((tx) => (
                        <tr key={tx.id} className="group hover:bg-accent/50 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "size-9 rounded-xl flex items-center justify-center",
                                        tx.type === 'Income' ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
                                    )}>
                                        {tx.type === 'Income' ? <ArrowUpRight className="size-4" /> : <ArrowDownLeft className="size-4" />}
                                    </div>
                                    <span className="text-sm italic font-extrabold text-foreground">{tx.category}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <Badge variant="outline" className="rounded-lg">{tx.category}</Badge>
                            </td>
                            <td className="px-6 py-4 text-sm text-muted">{tx.date}</td>
                            <td className={cn(
                                "px-6 py-4 text-sm italic font-black",
                                tx.type === 'Income' ? "text-success" : "text-foreground"
                            )}>
                                {tx.amount}
                            </td>
                            <td className="px-6 py-4">
                                <Badge
                                    variant={tx.status === 'Completed' ? 'success' : 'warning'}
                                    className="rounded-lg"
                                >
                                    {tx.status}
                                </Badge>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
