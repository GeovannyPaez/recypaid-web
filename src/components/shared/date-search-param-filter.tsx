"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarClock, RotateCcw } from "lucide-react";
import { DateRange } from "react-day-picker";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";

export default function DateSearchParamFilter() {
    const { handleReset, handleUpdateSearchParams } = useUpdateSearchParams({
        searchParamsInPage: ["initDate", "endDate"],
    });

    const [selectedRange, setSelectedRange] = useState<DateRange>({
        from: new Date(),
        to: new Date(),
    });

    const handleUpdateDateParams = (initDate: Date, endDate: Date) => {
        handleUpdateSearchParams([
            { key: "initDate", value: initDate.toISOString() },
            { key: "endDate", value: endDate.toISOString() },
        ]);
    };

    const handleToday = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const end = new Date();
        end.setHours(23, 59, 59, 999);
        handleUpdateDateParams(today, end);
    };

    const handleThisMonth = () => {
        const date = new Date();
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        setSelectedRange({ from: firstDay, to: lastDay });
        handleUpdateDateParams(firstDay, lastDay);
    };

    const handleDateChange = ({ from, to }: DateRange) => {
        setSelectedRange({ from, to });
        if (from && to) {
            handleUpdateDateParams(from, to);
        }
    };

    return (
        <div className="ml-auto flex items-center gap-2">
            <Button
                onClick={() => handleReset([])}
                className="flex"
                variant="outline"
            >
                <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
                onClick={handleToday}
                className="hidden sm:flex"
                variant="outline"
            >
                Hoy
            </Button>
            <Button
                onClick={handleThisMonth}
                className="hidden md:flex"
                variant="outline"
            >
                Este mes
            </Button>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        className="w-[280px] justify-start text-left font-normal"
                        id="date"
                        variant="outline"
                    >
                        <CalendarClock className="mr-2 h-4 w-4" />
                        {selectedRange.from && selectedRange.to && (
                            <>
                                {selectedRange.from.toLocaleDateString()} -{" "}
                                {selectedRange.to.toLocaleDateString()}
                            </>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-auto p-0">
                    <Calendar
                        selected={selectedRange}
                        mode="range"
                        onSelect={(e) => {
                            if (e) {
                                handleDateChange(e);
                            }
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
