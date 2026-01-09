"use client"

import { Skeleton } from "./skeleton"

export function ProductSkeleton() {
    return (
        <div className="mb-3 block">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                <Skeleton className="h-full w-full" />
            </div>
            <div className="mt-2 space-y-2">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
            </div>
        </div>
    )
}
