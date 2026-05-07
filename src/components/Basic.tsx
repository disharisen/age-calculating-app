"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./shadcnui/popover";
import { Button } from "./shadcnui/button";
import { Calendar } from "./shadcnui/calendar";

const Basic = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <div className="grid gap-4">
      <h1 className=""></h1>

      <Popover
        open={open}
        onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              id="date"
              className="justify-start font-normal">
              {date ? date.toLocaleDateString() : "Select date"}
            </Button>
          }
        />

        <PopoverContent
          className="w-auto overflow-hidden p-0"
          align="start">
          <Calendar
            mode="single"
            selected={date}
            defaultMonth={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Basic;
