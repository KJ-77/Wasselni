import homePic from "../assets/homeWallpaper/final.png";
import OptionForm from "@/components/optionForm";
import { Carousel } from "@/components/carousel";

const Home = () => {

  return (
    <div>
      <div
        className=" relative flex items-center justify-center w-full 
                min-h-120 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${homePic})` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Foreground content */}
        <div className="relative z-10 text-white text-center select-none">
          <h1 className="text-4xl font-bold mb-4 ">
            One Lebanon. One Route. One Ride.
          </h1>
          <p className="text-lg">
            From the Mountains to the Sea — Ride Together..
          </p>
        </div>

        <div className="absolute rounded-full top-[450px] left-1/2 transform -translate-x-1/2 w-11/12  bg-white shadow-lg ring-1 ring-gray-100 p-2 max-w-full">
          <OptionForm />
        </div>
      </div>
      {/* div for positioning */}
      <div className="h-5 md:h-28 lg:h-32" aria-hidden="true"></div>

      {/* Carousel section */}
      <div className="mb-20 flex flex-wrap items-center justify-center gap-16">
        <div className="w-[400px] h-auto flex justify-center">
          <Carousel
            baseWidth={400}
            autoplay={true}
            autoplayDelay={3000}
            pauseOnHover={true}
            loop={true}
            round={false}
          />
        </div>

        <div className="w-[400px] h-auto flex justify-center">
          <Carousel
            baseWidth={400}
            autoplay={true}
            autoplayDelay={3000}
            pauseOnHover={true}
            loop={true}
            round={false}
          />
        </div>

        <div className="w-[400px] h-auto flex justify-center">
          <Carousel
            baseWidth={400}
            autoplay={true}
            autoplayDelay={3000}
            pauseOnHover={true}
            loop={true}
            round={false}
          />
        </div>
      </div>
      
      {/* <Calendar /> */}
      
    </div>
  );
};

export default Home;
