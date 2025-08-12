"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import * as React from "react";

export function TableSortComboBox({
  data,
  field,
  label,
  width = "145px",
  value,
  onChange,
}) {
  const [open, setOpen] = React.useState(false);

  // Create a style object for consistent width
  const widthStyle = React.useMemo(
    () => ({
      width: width,
      minWidth:
        typeof width === "string" && width.includes("px") ? width : undefined,
    }),
    [width],
  );

  // Dynamically extract unique values for the given field
  const options = React.useMemo(() => {
    const uniqueValues = [...new Set(data.map((item) => item[field]))];
    return uniqueValues.sort();
  }, [data, field]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          style={widthStyle}
          className="h-[38px] w-full sm:justify-between rounded-[10px] bg-blue-50 hover:bg-blue-50 lg:w-auto"
        >
          {value ? (
            value
          ) : (
            <p className="text-[12px] font-[400] leading-[18px] text-[#7E7E7E]">
              <span className="font-[600] text-[#3D3C42]">{`${label}`}</span>
            </p>
          )}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        style={widthStyle}
        className="z-10 w-full p-0 lg:w-auto"
        align="start"
      >
        <Command>
          <CommandInput
            placeholder={`Search ${label.toLowerCase()}`}
            className="h-9 text-[12px] font-[400] leading-[18px] text-[#7E7E7E]"
          />
          <CommandList>
            <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {option}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === option ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
