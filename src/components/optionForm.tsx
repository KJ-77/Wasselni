import { useState } from "react";
import { FaUser, FaCalendarAlt, FaDotCircle } from "react-icons/fa";

function OptionForm() {
  const [passengers, setPassengers] = useState(1);
  const [open, setOpen] = useState(false);

  const increment = () => {
    setPassengers(passengers + 1);
  };
  const decrement = () => {
    if (passengers > 1) {
      setPassengers(passengers - 1);
    } else {
      setPassengers(1);
    }
  };

  return (
    <div
      className="flex items-center justify-between w-full max-w-[2000px]
     bg-white rounded-[15px] shadow-sm border border-gray-200 overflow-hidden select-none"
    >
      <div
        className="flex items-center space-x-2 px-4 py-3
       hover:bg-gray-100 transition"
        onClick={() => setOpen(!open)}
      >
        <FaDotCircle className="text-gray-500" />
        <span className="text-sm font-medium text-gray-600">Leaving from</span>
      </div>

      <div className="h-6 border-l border-gray-300" />

      {/* going to */}

      <div
        className="flex items-center space-x-2 px-4 py-3
       hover:bg-gray-100 transition"
        onClick={() => setOpen(!open)}
      >
        <FaDotCircle className="text-gray-500" />
        <span className="text-sm font-medium text-gray-600">Going to</span>
      </div>
      <div className="h-6 border-l border-gray-300" />

      {/* date */}
      <div
        className="flex items-center space-x-2 px-4 py-3
       hover:bg-gray-100 transition"
        onClick={() => setOpen(!open)}
      >
        <FaCalendarAlt className="text-gray-500" />
        <span className="text-sm font-medium text-gray-600">Select date</span>
      </div>
      <div className="h-6 border-l border-gray-300" />

      {/* passengers */}
      <div
        className="flex items-center space-x-2 px-4 py-3
       hover:bg-gray-100 transition relative"
        onClick={() => setOpen(!open)}
      >
        <FaUser className="text-gray-500" />
        <span className="text-sm font-medium text-gray-600">
          {passengers} Passenger{passengers > 1 ? "s" : ""}
        </span>
        {open && (
          <div className="absolute right-0 top-14 bg-white shadow-lg rounded-xl border border-gray-200 px-5 py-3 flex items-center gap-4 z-10">
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
        )}
      </div>

      {/* Search button */}
      <button className="bg-green-900 hover:bg-green-950 text-white font-semibold text-sm px-6 py-3 rounded-r-[15px] transition">
        Search
      </button>
    </div>
  );
}

export default OptionForm;
