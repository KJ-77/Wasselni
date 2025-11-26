import { Outlet, Link, useLocation } from "react-router-dom";

const dashboardNavLinks = [
  { path: "/dashboard/profile", label: "Profile" },
  { path: "/dashboard/ratings", label: "Ratings" },
  { path: "/dashboard/vehicles", label: "Vehicles" },
  // Add other dashboard links here
];

export default function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen">
      <nav className="w-64 p-4 border-r">
        <ul className="space-y-2">
          {dashboardNavLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`block p-2 rounded transition-colors ${
                  location.pathname === link.path
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
