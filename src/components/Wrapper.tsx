import { cn } from "@/lib/utils";

interface WrapperProps {
    children: React.ReactNode;
    className?: string;
}

const Wrapper = ({ children, className }: WrapperProps ) => {
    return (
        <div className={cn("container mx-auto px-4 py-8", className)}>
            {children}
        </div>
    )
}

export default Wrapper;