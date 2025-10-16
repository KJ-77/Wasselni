import { NavLink } from 'react-router-dom';

import logo from '../assets/logo/wasselni_logo_transparent.png';

const Navbar = () => {
const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
        ? 'bg-gray-200 text-black font-bold hover:bg-gray-500 hover:text-black rounded-md px-3 py-2'  // true case
        : 'text-black hover:bg-gray-500 hover:text-white rounded-md px-3 py-2'; // false case

  return (
    <nav className='bg-white border-b border-green-500'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='flex h-20 items-center justify-between'>
          <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
            <div className="w-full relative flex items-center">
              {/* Left links */}
              <div className="flex items-center space-x-2">
                <NavLink to="/" className={linkClass}>
                  Carpool
                </NavLink>
                <NavLink to="/Frontpage" className={linkClass}>
                  Bus
                </NavLink>
              </div>

              {/* Centered logo */}
              <div className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none">
                <NavLink to="/" className="pointer-events-auto flex flex-shrink-0 items-center">
                  <img className="h-10 w-auto" src={logo} alt="Wasselni" />
                </NavLink>
              </div>
            </div>
            <div className='md:ml-auto'>
              <div className='flex space-x-2'>

                <NavLink to='/Search' className={linkClass}>
                  Search
                </NavLink>
                <NavLink to='/add-job' className={linkClass}>
                  Publish a ride
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
