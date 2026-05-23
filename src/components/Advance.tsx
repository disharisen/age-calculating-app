"use client";

import { dobFormSchema, DobFormType } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError } from "./shadcnui/field";
import { Popover, PopoverContent, PopoverTrigger } from "./shadcnui/popover";
import { Button } from "./shadcnui/button";
import { CalendarDaysIcon, LoaderIcon, SendIcon } from "lucide-react";
import {
  format,
  formatDistanceToNow,
  isBefore,
  startOfTomorrow,
} from "date-fns";
import { Calendar } from "./shadcnui/calendar";
import { useState } from "react";

const Advance = () => {
  const [showDate, setShowDate] = useState<string | null>(null);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isValid },
    reset,
  } = useForm({
    resolver: zodResolver(dobFormSchema),
    defaultValues: {
      dob: undefined,
    },
    mode: "all",
  });

  const dobHandeler = async ({ dob }: DobFormType) => {
    await new Promise((r) => setTimeout(r, 1000));

    setShowDate(`You are ${formatDistanceToNow(dob)} old`);

    reset();
  };

  return (
    <>
      <h1 className="mb-4 text-center text-lg">
        {showDate ?? "Select your date of birth"}
      </h1>

      <form
        onSubmit={handleSubmit(dobHandeler)}
        className="grid gap-4"
        noValidate>
        <Controller
          control={control}
          name="dob"
          render={({ field, fieldState }) => (
            <Field className="flex flex-col">
              <Popover>
                <PopoverTrigger
                  render={
                    <Button
                      variant="outline"
                      id="date"
                      className="w-full justify-between font-normal">
                      {field.value ?
                        format(field.value, "PPPP")
                      : "Pick a date"}
                      <CalendarDaysIcon />
                    </Button>
                  }
                />

                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="center">
                  <Calendar
                    mode="single"
                    captionLayout="dropdown"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => !isBefore(date, startOfTomorrow())}
                  />
                </PopoverContent>
              </Popover>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button
          type="submit"
          className="cursor-pointer"
          disabled={isSubmitting || !isValid}>
          {isSubmitting ?
            <>
              <LoaderIcon /> Calculating...
            </>
          : <>
              <SendIcon /> Calculate Age
            </>
          }
        </Button>
      </form>
    </>
  );
};

export default Advance;
