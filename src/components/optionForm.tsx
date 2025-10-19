import * as React from "react";
import { FaUser, FaCalendarAlt, FaDotCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./ui/input";

function OptionForm() {
  const [passengers, setPassengers] = React.useState(1);
  // const [openFrom, setOpenFrom] = React.useState("");
  // const [openTo, setOpenTo] = React.useState("");
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
      {/* for alignment purposes */}
      <div />
      {/* Leaving From */}

      <div className="w-auto flex items-center justify-center px-4 py-2 hover:bg-gray-100 transition text-sm font-medium text-gray-600 ">
        <FaDotCircle className="text-gray-500" />
        <Input type="search" placeholder="Leaving from" className="shadow-none border-0 w-31 outline-none focus-visible:ring-0 focus-visible:ring-offset-0" style={{textAlign:"center"}} />
        {/* <input
          type="text"
          placeholder="Leaving from"
          className="outline-none bg-transparent text-gray-600 placeholder-gray-500"
          style={{textAlign:"center"}}
        /> */}
      </div>

      <div className="h-6 border-l border-gray-300" />

      {/* Going To */}

      <div className=" flex items-center px-4 py-2 hover:bg-gray-100 transition text-sm font-medium text-gray-600 cursor-pointer">
        <FaDotCircle className="text-gray-500" />
        <Input type="search" placeholder="Going to" className="shadow-none border-0 w-25 outline-none focus-visible:ring-0 focus-visible:ring-offset-0" style={{textAlign:"center"}} />
        {/* <input
          type="text"
          placeholder="Going to"
          className="outline-none bg-transparent text-gray-600 placeholder-gray-500"
        /> */}
      </div>

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
