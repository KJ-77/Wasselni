import { NavLink } from 'react-router-dom';

import logo from '../assets/logo/wasselni_logo_transparent.png';

const Navbar = () => {
const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
        ? 'bg-gray-200 text-black font-bold hover:bg-gray-500 hover:text-black rounded-md px-3 py-2'  // true case
        : 'text-black hover:bg-gray-500 hover:text-white rounded-md px-3 py-2'; // false case

  return (
      <nav className="bg-white border-b border-green-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main container: 3 equal sections */}
        <div className="flex items-center justify-between h-24">

          
          {/* Left side links */}
          <div className="flex items-center space-x-3">
            <NavLink to="/" className={linkClass}>
              Carpool
            </NavLink>
            <NavLink to="/Frontpage" className={linkClass}>
              Bus
            </NavLink>

          </div>

          {/* Center logo */}
          <div className="flex justify-center items-center shrink-20">
            <NavLink to="/">
              <img className="h-auto w-auto min-h-[20px] max-h-[500px]" src={logo} alt="Wasselni" />
            </NavLink>
          </div>

          {/* Right side links */}
          <div className="flex items-center space-x-3">
            <NavLink to="/Search" className={linkClass}>
              Search
            </NavLink>
            <NavLink to="/add-job" className={linkClass}>
              Publish a ride
            </NavLink>            
            <NavLink to="/Account" className={linkClass}>
              Account
            </NavLink>
          </div>

        </div>
      </div>
    </nav>
  );
};
export default Navbar;
