import * as React from "react";
import { FaUser, FaCalendarAlt, FaDotCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function OptionForm() {
  const [passengers, setPassengers] = React.useState(1);
  const [openFrom, setOpenFrom] = React.useState(false);
  const [openTo, setOpenTo] = React.useState(false);
  const [openDate, setOpenDate] = React.useState(false);
  const [openPassengers, setOpenPassengers] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  const increment = () => setPassengers((p) => p + 1);
  const decrement = () => setPassengers((p) => (p > 1 ? p - 1 : 1));

  return (
    <div
      className="flex items-center justify-between w-full max-w-[2000px]
      bg-white rounded-[15px] shadow-sm border border-gray-200 overflow-hidden select-none"
    >
      {/* Leaving From */}
      <Popover open={openFrom} onOpenChange={setOpenFrom}>
        <PopoverTrigger asChild>
          <div className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 transition text-sm font-medium text-gray-600 cursor-pointer">
            <FaDotCircle className="text-gray-500" />
            <input
              type="text"
              placeholder="Leaving from"
              readOnly
              className="outline-none bg-transparent text-gray-600 placeholder-gray-500"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          {/* Temporary Calendar for demonstration */}
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => {
              setDate(d);
              setOpenFrom(false);
            }}
          />
        </PopoverContent>
      </Popover>

      <div className="h-6 border-l border-gray-300" />

      {/* Going To */}
      <Popover open={openTo} onOpenChange={setOpenTo}>
        <PopoverTrigger asChild>
          <div className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 transition text-sm font-medium text-gray-600 cursor-pointer">
            <FaDotCircle className="text-gray-500" />
            <input
              type="text"
              placeholder="Going to"
              readOnly
              className="outline-none bg-transparent text-gray-600 placeholder-gray-500"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          {/* Temporary Calendar for demonstration */}
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => {
              setDate(d);
              setOpenTo(false);
            }}
          />
        </PopoverContent>
      </Popover>

      <div className="h-6 border-l border-gray-300" />

      {/* Date Picker */}
      <Popover open={openDate} onOpenChange={setOpenDate}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            id="date"
            className="flex items-center space-x-2 px-4 py-3 hover:bg-gray-100 transition text-sm font-medium text-gray-600"
          >
            <FaCalendarAlt className="text-gray-500" />
            {date ? date.toLocaleDateString() : "Select date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(d) => {
              setDate(d);
              setOpenDate(false);
            }}
          />
        </PopoverContent>
      </Popover>

      <div className="h-6 border-l border-gray-300" />

      {/* Passengers */}
      <Popover open={openPassengers} onOpenChange={setOpenPassengers}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center space-x-2 px-4 py-3 hover:bg-gray-100 transition text-sm font-medium text-gray-600"
          >
            <FaUser className="text-gray-500" />
            <span>
              {passengers} Passenger{passengers > 1 ? "s" : ""}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4" align="start">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-600">Passenger</span>
            <button
              onClick={decrement}
              className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center text-gray-500 hover:bg-gray-100"
            >
              −
            </button>
            <span className="w-4 text-center">{passengers}</span>
            <button
              onClick={increment}
              className="w-6 h-6 rounded-full border border-blue-400 flex items-center justify-center text-blue-500 hover:bg-blue-50"
            >
              +
            </button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Search Button */}
      <button className="bg-green-900 hover:bg-green-950 text-white font-semibold text-sm px-6 py-3 rounded-r-[15px] transition">
        Search
      </button>
    </div>
  );
}

export default OptionForm;
