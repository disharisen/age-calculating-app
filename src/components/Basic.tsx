"use client";

import {
  format,
  formatDistanceToNow,
  isBefore,
  startOfTomorrow,
} from "date-fns";
import { useState } from "react";
import { Button } from "./shadcnui/button";
import { Calendar } from "./shadcnui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./shadcnui/popover";
import { CalendarDaysIcon } from "lucide-react";

const Basic = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <div className="grid gap-4">
      <h1 className="text-center text-lg">
        {date ?
          isBefore(date, startOfTomorrow()) ?
            `You are ${formatDistanceToNow(date)} old`
          : `You will be ${formatDistanceToNow(date)} old`
        : "Select your date of birth"}
      </h1>

      <Popover
        open={open}
        onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              id="date"
              className="justify-between">
              {date ? format(date, "PPPP") : "Select date"} <CalendarDaysIcon />
            </Button>
          }
        />

        <PopoverContent
          className="w-auto overflow-hidden p-0"
          align="center">
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
