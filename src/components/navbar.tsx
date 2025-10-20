import { NavLink } from 'react-router-dom';

import logo from '../assets/logo/wasselni_logo_transparent.png';
import { ModeToggle} from './mode-toggle';
import { CircleUserRound, Search, BadgePlus, Bus, Car } from 'lucide-react';

const Navbar = () => {
const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
        ? 'bg-gray-200 text-green-600 font-semibold hover:bg-gray-200 hover:text-green-800 rounded-md px-3 py-2 whitespace-nowrap select-none'  // true case
        : 'text-green-900 hover:bg-gray-200 hover:text-black rounded-md px-3 py-2 whitespace-nowrap select-none'; // false case

  return (
      <nav className="bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main container: 3 equal sections */}
        <div className="flex items-center justify-between h-24">

          
          {/* Left side links */}
          <div className="flex items-center space-x-3">
            <NavLink to="/" className={linkClass}>
            <Car className="inline-block mr-1 " size={28} />
              Carpool
            </NavLink>
            <NavLink to="/Frontpage" className={linkClass}>
            <Bus className="inline-block mr-1 " size={28} />
              Bus
            </NavLink>
          <ModeToggle />

          </div>

          {/* Center logo */}
          <div className="flex justify-center items-center select-none">
            <NavLink to="/">
              <img className="h-auto w-auto min-h-[40px] max-h-[500px]  min-w-sm-[400px]" src={logo} alt="Wasselni" />
            </NavLink>
          </div>

          {/* Right side links */}
          <div className="flex items-center space-x-2 ">
          <div className="hidden sm:flex">
             <NavLink to="/Search" className={linkClass}>
            <Search className="inline-block mr-1 " size={28} />
             Search</NavLink>
          </div>
            <NavLink to="/add-job" className={linkClass}>
            <BadgePlus className="inline-block mr-1 " size={28} />
              Publish a ride
            </NavLink>            
            <NavLink to="/Account" className={linkClass }>
              <CircleUserRound className="inline-block " size={30} />
           
            </NavLink>
          </div>

        </div>
      </div>
    </nav>
  );
};
export default Navbar;
