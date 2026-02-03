import { TrendingDown, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/app/components/ui/card"
import { cn } from "@/lib/utils"

interface KPICardProps {
    title: string
    value: string
    change: string
    changeType: 'positive' | 'negative' | 'neutral'
    icon?: React.ReactNode
    chart?: React.ReactNode
}

export function KPICard({ title, value, change, changeType, icon, chart }: KPICardProps) {
    return (
        <Card className="overflow-hidden group hover:border-primary/30 transition-all duration-300">
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        {icon && (
                            <div className="size-10 rounded-xl bg-accent/50 flex items-center justify-center text-primary">
                                {icon}
                            </div>
                        )}
                        <div>
                            <div>
                                <p className="text-[10px] italic font-black uppercase tracking-wider text-muted-foreground">{title}</p>
                                <h3 className="text-2xl italic font-black text-foreground mt-1 tracking-tight">{value}</h3>
                            </div>
                        </div>
                    </div>
                    <div className={cn(
                        "flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold",
                        changeType === 'positive' ? "bg-success/10 text-success" :
                            changeType === 'negative' ? "bg-danger/10 text-danger" :
                                "bg-muted/10 text-muted"
                    )}>
                        {changeType === 'positive' ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                        {change}
                    </div>
                </div>

                {chart ? (
                    <div className="h-16 w-full mt-4">
                        {chart}
                    </div>
                ) : (
                    <div className="mt-4 h-1 w-full bg-accent/50 rounded-full overflow-hidden">
                        <div
                            className={cn(
                                "h-full brand-gradient transition-all duration-500",
                                changeType === 'negative' && "bg-danger"
                            )}
                            style={{ width: '65%' }}
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
