import OptionForm from "@/components/optionForm";
import Filters from "@/components/ridesComp/filtersPanel";
import RouteMap from "@/components/ridesComp/routeMap";
// import SearchBar from "@/components/ridesComp/searchBar";
import RideList from "@/components/ridesComp/ridesList";




// Added required props for RouteMap and dummy data
export default function Rides() {
  const dummyRoute: { distance: number; duration: string; traffic: "Light" | "Moderate" | "Heavy"; } = {
    distance: 85,
    duration: "2h 15m",
    traffic: "Light",
  };

  return (
    <div className="w-full min-h-screen pt-24 p-6 grid grid-cols-12 gap-4">
      {/* Filters */}
      <div className="col-span-3">
        <Filters />
      </div>

      {/* Search Bar */}
      <div className="col-span-12">
        {/* <SearchBar
        mapVisible={false}
        onToggleMap={() => {}}
        /> */}
        <OptionForm />
      </div>



      {/* Rides List */}
      <div className="col-span-6 flex flex-col gap-4">
      <RideList />
        <button className="mx-auto mt-4 px-6 py-2 rounded-xl bg-blue-600 text-sm shadow">
          Load More Rides (20 more available)
        </button>
      </div>

      {/* Right Route Map */}
      <div className="col-span-3">
        <RouteMap
          distance={dummyRoute.distance}
          duration={dummyRoute.duration}
          traffic={dummyRoute.traffic}
        />
      </div>
    </div>
  );
}