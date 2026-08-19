import { cn } from "@/src/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="skeleton"
            className={cn("bg-[var(--shimmer-color)] rounded-[var(--border-radius)] animate-pulse", className)}
            {...props}
        />
    )
}

export { Skeleton }
