import OptionForm from "@/components/optionForm";
import Filters from "@/components/ridesComp/filtersPanel";
import RouteMap from "@/components/ridesComp/routeMap";

import RideList from "@/components/ridesComp/ridesList";





// Added required props for RouteMap and dummy data
export default function Rides() {
  const dummyRoute: { distance: number; duration: string; traffic: "Light" | "Moderate" | "Heavy"; } = {
    distance: 85,
    duration: "2h 15m",
    traffic: "Light",
  };

  return (
    <div className="min-h-screen">
      <div className="w-full pt-7 pb-10 px-4 md:px-8 lg:px-16"></div>


      <div className="flex">
        {/* Left column: Filters */}
        <aside className="h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto border-r border-primary">
          <Filters />
        </aside>


        <main className="flex-1 p-6">
          {/* Sticky OptionForm */}
          <div className="sticky top-4 z-40 pb-4">
            <OptionForm />
          </div>

          {/* Scrollable rides list */}
          <RideList />

          
        </main>
                {/* Right column: RouteMap */}
        <aside className=" w-1/4 top-160 relative pb-100 pr-20">
          <div className="sticky top-1/2 -translate-y-1/2 ">
            <RouteMap {...({ routeInfo: dummyRoute } as any)} />
          </div>
        </aside>
      </div>

     
          </div>
        
  );
} 