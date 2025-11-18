import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPinIcon, SearchIcon, ArrowLeftIcon, ArrowRightIcon, UserIcon } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import {
  MiniCalendar,
  MiniCalendarDay,
  MiniCalendarDays,
  MiniCalendarNavigation,
} from "@/components/ui/shadcn-io/mini-calendar";
import { FaCalendarAlt } from "react-icons/fa";

function OptionForm() {
  const [passengers, setPassengers] = React.useState(1);
  const [openDate, setOpenDate] = React.useState(false);
  const [openPassengers, setOpenPassengers] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());

  const increment = () => setPassengers((p) => p + 1);
  const decrement = () => setPassengers((p) => (p > 1 ? p - 1 : 1));

  return (
    <div className="w-full flex justify-center py-10 px-4">
      <Card className="w-full  max-w-4xl h-full shadow-lg border-0 ">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Find a Ride
          </CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Leaving From */}
          <div className="flex flex-col space-y-2">
            <Label className="text-lg font-medium">Leaving from</Label>
            <div className="relative">
              <MapPinIcon className="absolute left-3 top-3 size-5 text-muted-foreground" />
              <Input placeholder="Beirut Downtown" className="pl-10" />
            </div>
          </div>

          {/* Going To */}
          <div className="flex flex-col space-y-2">
            <Label className="text-lg font-medium">Going to</Label>
            <div className="relative">
              <MapPinIcon className="absolute left-3 top-3 size-5 text-muted-foreground" />
              <Input placeholder="Jounieh Marina" className="pl-10" />
            </div>
          </div>

          {/* Date */}
          <div className="flex flex-col space-y-2">
            <Label className="text-lg font-medium">Pick a date</Label>

            <Popover open={openDate} onOpenChange={setOpenDate}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-start font-normal"
                >
                  <FaCalendarAlt className="mr-2 " />
                  {selectedDate
                    ? selectedDate.toLocaleDateString()
                    : "Select date"}
                </Button>
              </PopoverTrigger>

              <PopoverContent
                align="start"
                className="w-auto overflow-hidden p-0 bg-transparent shadow-none border-0"
              >
                <div className="space-y-4 p-4">
                  <MiniCalendar
                    value={selectedDate}
                    onValueChange={setSelectedDate}
                  >
                    <MiniCalendarNavigation asChild direction="prev">
                      <Button size="icon" variant="outline">
                        <ArrowLeftIcon className="h-4 w-4" />
                      </Button>
                    </MiniCalendarNavigation>

                    <MiniCalendarDays>
                      {(date) => (
                        <MiniCalendarDay key={date.toISOString()} date={date} />
                      )}
                    </MiniCalendarDays>

                    <MiniCalendarNavigation asChild direction="next">
                      <Button size="icon" variant="outline">
                        <ArrowRightIcon className="size-4" />
                      </Button>
                    </MiniCalendarNavigation>
                  </MiniCalendar>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Passengers */}
          <div className="flex flex-col space-y-2">
            <Label className="text-lg font-medium">Passengers</Label>

            <Popover open={openPassengers} onOpenChange={setOpenPassengers}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start font-normal">
                  <UserIcon className="mr-2 size-5" />
                  {passengers} Passenger{passengers > 1 ? "s" : ""}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-52 p-4" align="start">
                <div className="flex items-center justify-between">
                  <Button size="icon" variant="outline" onClick={decrement}>
                    –
                  </Button>

                  <Input
                    value={passengers}
                    readOnly
                    className="w-12 text-center"
                  />

                  <Button size="icon" variant="default" onClick={increment}>
                    +
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Search Button Full Width */}
          <div className="col-span-full">
            <Button
              size="lg"
              className="w-full rounded-xl font-medium text-lg py-6 bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow"
            >
              <SearchIcon className="mr-2 size-5" />
              Search Rides
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default OptionForm;
