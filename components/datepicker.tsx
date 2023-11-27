import { CalendarIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface TimeProps {
  title: string;
  value: Date | undefined;
  disabled: boolean;
  onChange: (value: any) => void;
  className: string | undefined;
}

export default function DatePicker({
  title,
  value,
  disabled,
  onChange,
  className = ""
}: TimeProps) {
  /*call api */

  return (
    <>
      <div
        className={cn(
          "flex items-center justify-center space-x-10 mt-4 h-[32px]",
          className
        )}
      >
        {title !== "" && <span className="text-xs font-medium">{title} :</span>}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[268px] justify-start text-left font-normal h-8 text-xs",
                !value && "text-muted-foreground"
              )}
              disabled={disabled}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {value ? format(value, "dd/MM/yyyy") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={value}
              onSelect={onChange}
              initialFocus
              className="p-1"
              disabled={{ before: new Date() }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
