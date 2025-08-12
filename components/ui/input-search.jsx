import * as React from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

const InputSearch = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <>
      {props.label && (
        <p className="mb-[12px] text-[14px] font-medium leading-[20px] text-[#DEDEDE]">
          {props.label}
        </p>
      )}
      <div className="relative flex items-center w-full sm:w-auto">
        <input
          type={type}
          style={props.style}
          className={cn(
            "flex h-[40px] w-full rounded-[10px] border bg-background px-10 py-2 text-[12px] font-[400] leading-[18px] text-[#B5B7C0] placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
        <Search className="absolute left-2 h-[24px] w-[24px] text-[#7E7E7E]" />
      </div>
    </>
  );
});
InputSearch.displayName = "InputSearch";

export { InputSearch };
