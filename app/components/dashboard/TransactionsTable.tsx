import { Badge } from "@/app/components/ui/badge"
import { cn } from "@/lib/utils"
import { ArrowDownLeft, ArrowUpRight } from "lucide-react"

interface Transaction {
    id: string;
    type: string;
    amount: number;
    date: string;
    description?: string;
    category: {
        name: string;
    };
}

interface TransactionsTableProps {
    transactions?: Transaction[];
}

export function TransactionsTable({ transactions = [] }: TransactionsTableProps) {
    // Show empty state if no transactions
    if (transactions.length === 0) {
        return (
            <div className="p-12 text-center">
                <p className="text-muted text-sm">No transactions yet</p>
                <p className="text-muted text-xs mt-1">Start adding transactions to track your finances</p>
            </div>
        );
    }

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
                    {transactions.map((tx) => {
                        const isIncome = tx.type === 'income';
                        const formattedAmount = `${isIncome ? '+' : '-'}$${Math.abs(tx.amount).toFixed(2)}`;
                        const formattedDate = new Date(tx.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        });

                        return (
                            <tr key={tx.id} className="group hover:bg-accent/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "size-9 rounded-xl flex items-center justify-center",
                                            isIncome ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
                                        )}>
                                            {isIncome ? <ArrowUpRight className="size-4" /> : <ArrowDownLeft className="size-4" />}
                                        </div>
                                        <span className="text-sm italic font-extrabold text-foreground">
                                            {tx.description || tx.category.name}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <Badge variant="outline" className="rounded-lg">{tx.category.name}</Badge>
                                </td>
                                <td className="px-6 py-4 text-sm text-muted">{formattedDate}</td>
                                <td className={cn(
                                    "px-6 py-4 text-sm italic font-black",
                                    isIncome ? "text-success" : "text-foreground"
                                )}>
                                    {formattedAmount}
                                </td>
                                <td className="px-6 py-4">
                                    <Badge
                                        variant="success"
                                        className="rounded-lg"
                                    >
                                        Completed
                                    </Badge>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}
