import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function FiltersPanel() {
  const [collapsed, setCollapsed] = useState(false);
  const [price, setPrice] = useState([15]);
  const [departureTimes] = useState({ afternoon: true });

  return (
    <div
      className={`transition-all duration-300 h-[calc(100vh-70px)] sticky top-[70px]  shadow-md border-r border-primary overflow-y-auto z-30
      ${collapsed ? "w-25" : "w-72"}`}
    >
      {/* Collapse Button */}
      <div className="pr-8 border-b flex justify-end">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => setCollapsed(!collapsed)}
        > Filters
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={40} />}
        </Button>
      </div>

      {/* Collapsed Mode */}
      {collapsed ? (
        <div className="flex flex-col items-center gap-4 p-3 text-xs">
  
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6 p-4"
        >
          {/* Active Tag Example */}
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm cursor-pointer">
              Afternoon ✕
            </span>
          </div>

          {/* Sort By */}
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-4 space-y-2">
              <p className="font-semibold text-gray-700">Sort By</p>
              <Select>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Earliest Departure" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="early">Earliest Departure</SelectItem>
                  <SelectItem value="late">Latest Departure</SelectItem>
                  <SelectItem value="lowPrice">Lowest Price</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Price Range */}
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-4 space-y-4">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-700 flex items-center gap-1">💲 Price Range</p>
                <button className="text-blue-600 text-sm">Reset</button>
              </div>

              <Slider value={price} onValueChange={setPrice} min={0} max={20} step={1} />

              <div className="flex justify-between text-sm text-gray-600">
                <span>$0</span>
                <span className="text-green-600 font-medium">Max: ${price}</span>
                <span>$20</span>
              </div>
            </CardContent>
          </Card>

          {/* Departure Time */}
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-4 space-y-3">
              <p className="font-semibold text-gray-700">⏰ Departure Time</p>
              <div className="flex items-center gap-2"><Checkbox /><span className="text-sm">Morning (6 AM - 12 PM)</span></div>
              <div className="flex items-center gap-2"><Checkbox checked={departureTimes.afternoon} /><span className="text-sm">Afternoon (12 PM - 6 PM)</span></div>
              <div className="flex items-center gap-2"><Checkbox /><span className="text-sm">Evening (6 PM - 12 AM)</span></div>
            </CardContent>
          </Card>

          {/* Vehicle & Comfort */}
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-4 space-y-3">
              <p className="font-semibold text-gray-700">🚗 Vehicle & Comfort</p>
              {["Sedan", "SUV", "Air Conditioning", "Music Allowed", "No Smoking"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Checkbox />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Driver Preferences */}
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-4 space-y-4">
              <p className="font-semibold text-gray-700">👤 Driver Preferences</p>
              <div>
                <label className="text-sm text-gray-600">Minimum Rating</label>
                <Select>
                  <SelectTrigger className="rounded-xl mt-1">
                    <SelectValue placeholder="Any Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Rating</SelectItem>
                    <SelectItem value="4">4+ Stars</SelectItem>
                    <SelectItem value="5">5 Stars Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {["Verified Only", "University Students", "Women Only"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Checkbox />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Booking Type */}
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-4 space-y-3">
              <p className="font-semibold text-gray-700">📄 Booking Type</p>
              <RadioGroup defaultValue="instant">
                <div className="flex items-center gap-2"><RadioGroupItem value="instant" /><span className="text-sm">Instant Book</span></div>
                <div className="flex items-center gap-2"><RadioGroupItem value="request" /><span className="text-sm">Request to Book</span></div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Clear Filters */}
          <Button variant="outline" className="w-full py-5 rounded-xl text-sm font-semibold">
            Clear All Filters
          </Button>
        </motion.div>
      )}
    </div>
  );
}