import { Loader2 } from "lucide-react";

export const Spinner = () => {
    return (
        <div className="w-full h-40 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-[rgba(var(--color-foreground),0.5)]" />
        </div>
    );
};
