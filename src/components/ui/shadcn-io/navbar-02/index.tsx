import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { BookOpenIcon, InfoIcon, LifeBuoyIcon, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type {} from "react";
import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import { useAuth } from "@/contexts/AuthContext";

// Simple logo component for the navbar
const Logo = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 324 323"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="88.1023"
        y="144.792"
        width="151.802"
        height="36.5788"
        rx="18.2894"
        transform="rotate(-38.5799 88.1023 144.792)"
        fill="currentColor"
      />
      <rect
        x="85.3459"
        y="244.537"
        width="151.802"
        height="36.5788"
        rx="18.2894"
        transform="rotate(-38.5799 85.3459 244.537)"
        fill="currentColor"
      />
    </svg>
  );
};

// Hamburger icon component
const HamburgerIcon = ({
  className,
  ...props
}: React.SVGAttributes<SVGElement>) => (
  <svg
    className={cn("pointer-events-none", className)}
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 12L20 12"
      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
    />
    <path
      d="M4 12H20"
      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
    />
    <path
      d="M4 12H20"
      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
    />
  </svg>
);

// Types
export interface Navbar02NavItem {
  href?: string;
  label: string;
  submenu?: boolean;
  type?: "description" | "simple" | "icon";
  items?: Array<{
    href: string; //href for navigation
    label: string;
    description?: string;
    icon?: string;
  }>;
}

export interface Navbar02Props extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  logoHref?: string;
  navigationLinks?: Navbar02NavItem[];
  signInText?: string;
  signInHref?: string;
  ctaText?: string;
  ctaHref?: string;
  onNavItemClick?: (href: string) => void;
  onSignInClick?: () => void;
  onCtaClick?: () => void;
}

// Default navigation links
const defaultNavigationLinks: Navbar02NavItem[] = [
  {
    label: "Features",
    submenu: true,
    type: "description",
    items: [
      {
        href: "/bus",
        label: "Real-Time Bus Tracker",
        description: "Track your bus live and never miss a ride again!",
      },
      {
        href: "/carpool",
        label: "Smart Carpooling",
        description: "Connect with nearby commuters and split costs instantly.",
      },
      {
        href: "/trips",
        label: "Discover Lebanon",
        description: "Explore Lebanon's hidden gems with our curated trips.",
      },
    ],
  },
  {
    label: "Start Your Journey",
    submenu: true,
    type: "simple",
    items: [
      { href: "/rides", label: "Catch a ride" },
      { href: "/offerRides", label: "Offer a ride" },
    ],
  },
  {
    label: "About",
    submenu: true,
    type: "icon",
    items: [
      {
        href: "/quick-start-guide",
        label: "Quick Start Guide",
        icon: "BookOpenIcon",
      },
      { href: "/how-it-works", label: "How It Works", icon: "LifeBuoyIcon" },
      { href: "/our-story", label: "Our Story", icon: "InfoIcon" },
    ],
  },
];

export const Navbar02 = React.forwardRef<HTMLElement, Navbar02Props>(
  (

    //TODO: did the hrefs for you in this way just change the paths if needed
    {
      className,
      logo = <Logo />,
      logoHref = "/",
      navigationLinks = defaultNavigationLinks,
      signInText = "Sign In",
      signInHref = "/auth",
      ctaText = "Get Started",
      ctaHref = "/auth",
      onNavItemClick,
      onSignInClick,
      onCtaClick,
      ...props
    },
    ref
  ) => {
    const [isMobile, setIsMobile] = useState(false);
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);
    const containerRef = useRef<HTMLElement>(null);
    const auth = useAuth();
    const navigate = useNavigate();

    // Get user initials for avatar fallback
    const getUserInitials = () => {
      if (auth.userAttributes?.name) {
        return auth.userAttributes.name
          .split(' ')
          .map(n => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2);
      }
      if (auth.userAttributes?.email) {
        return auth.userAttributes.email.slice(0, 2).toUpperCase();
      }
      return 'U';
    };

    const handleLogout = () => {
      auth.signOut();
      navigate('/');
      setShowLogoutDialog(false);
    };

    useEffect(() => {
      const checkWidth = () => {
        if (containerRef.current) {
          const width = containerRef.current.offsetWidth;
          setIsMobile(width < 768); // 768px is md breakpoint
        }
      };

      checkWidth();

      const resizeObserver = new ResizeObserver(checkWidth);
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }

      return () => {
        resizeObserver.disconnect();
      };
    }, []);

    // Combine refs
    const combinedRef = React.useCallback(
      (node: HTMLElement | null) => {
        containerRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    // const renderIcon = (iconName: string) => {
    //   switch (iconName) {
    //     case 'BookOpenIcon':
    //       return <BookOpenIcon size={16} className="text-foreground opacity-60" aria-hidden={true} />;
    //     case 'LifeBuoyIcon':
    //       return <LifeBuoyIcon size={16} className="text-foreground opacity-60" aria-hidden={true} />;
    //     case 'InfoIcon':
    //       return <InfoIcon size={16} className="text-foreground opacity-60" aria-hidden={true} />;
    //     default:
    //       return null;
    //   }
    // };

    return (
      <header
        ref={combinedRef}
        className={cn(
          "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6 [&_*]:no-underline",
          className
        )}
        {...props}
      >
        <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex items-center gap-2">
            {/* Mobile menu trigger */}
            {isMobile && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="group h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                    variant="ghost"
                    size="icon"
                  >
                    <HamburgerIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-64 p-1">
                  <NavigationMenu className="max-w-none">
                    <NavigationMenuList className="flex-col items-start gap-0">
                      {navigationLinks.map((link, index) => (
                        <NavigationMenuItem key={index} className="w-full">
                          {link.submenu ? (
                            <>
                              <div className="text-muted-foreground px-2 py-1.5 text-xs font-medium">
                                {link.label}
                              </div>
                              <ul>
                                {link.items?.map((item, itemIndex) => (
                                  <li key={itemIndex}>
                                    <Link
                                      to={item.href}
                                      onClick={() =>
                                        onNavItemClick?.(item.href)
                                      }
                                      className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer no-underline"
                                    >
                                      {item.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </>
                          ) : (
                            <Link
                              to={link.href!}
                              onClick={() => onNavItemClick?.(link.href!)}
                              className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer no-underline"
                            >
                              {link.label}
                            </Link>
                          )}
                          {/* Add separator between different types of items */}
                          {index < navigationLinks.length - 1 &&
                            ((!link.submenu &&
                              navigationLinks[index + 1].submenu) ||
                              (link.submenu &&
                                !navigationLinks[index + 1].submenu) ||
                              (link.submenu &&
                                navigationLinks[index + 1].submenu &&
                                link.type !==
                                  navigationLinks[index + 1].type)) && (
                              <div
                                role="separator"
                                aria-orientation="horizontal"
                                className="bg-border -mx-1 my-1 h-px w-full"
                              />
                            )}
                        </NavigationMenuItem>
                      ))}
                    </NavigationMenuList>
                  </NavigationMenu>
                </PopoverContent>
              </Popover>
            )}
            {/* Main nav */}
            <div className="flex items-center gap-6">
              <Link
                to={logoHref}
                className="flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors cursor-pointer"
              >
                <div className="text-2xl">{logo}</div>
                <span className="hidden font-bold text-xl sm:inline-block">
                  WASSELNI
                </span>
              </Link>
              {/* Navigation menu */}
              {!isMobile && (
                <NavigationMenu className="flex">
                  <NavigationMenuList className="gap-1">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index}>
                        {link.submenu ? (
                          <>
                            <NavigationMenuTrigger>
                              {link.label}
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                              {link.type === "description" &&
                              link.label === "Features" ? (
                                <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                  {/* features */}
                                  <div className="row-span-3">
                                    <NavigationMenuLink asChild>
                                      <button className="flex h-full w-full select-none flex-col justify-center items-center text-center rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md cursor-pointer">
                                        <div className="mb-3 text-xl font-medium">
                                          WASSELNI
                                        </div>
                                        <p className="text-sm leading-tight text-muted-foreground">
                                          Whether you’re commuting to work or exploring a new city, Wasselni helps you track buses, 
                                          find rides, and travel together — safely, easily, and affordably.
                                        </p>
                                      </button>
                                    </NavigationMenuLink>
                                  </div>
                                  {link.items?.map((item, itemIndex) => (
                                    <Link
                                      key={itemIndex}
                                      to={item.href}
                                      onClick={() =>
                                        onNavItemClick?.(item.href)
                                      }
                                      className="pointer-events-auto"
                                    >
                                      <ListItem
                                        title={item.label}
                                        href={item.href}
                                        type={link.type}
                                      >
                                        {item.description}
                                      </ListItem>
                                    </Link>
                                  ))}
                                </div>
                              ) : link.type === "simple" ? (
                                <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                  {link.items?.map((item, itemIndex) => (
                                    <Link
                                      key={itemIndex}
                                      to={item.href}
                                      onClick={() =>
                                        onNavItemClick?.(item.href)
                                      }
                                      className="pointer-events-auto"
                                    >
                                      <ListItem
                                        title={item.label}
                                        href={item.href}
                                        type={link.type}
                                      >
                                        {item.description}
                                      </ListItem>
                                    </Link>
                                  ))}
                                </div>
                              ) : link.type === "icon" ? (
                                <div className="grid w-[400px] gap-3 p-4">
                                  {link.items?.map((item, itemIndex) => (
                                    <Link
                                      key={itemIndex}
                                      to={item.href}
                                      onClick={() =>
                                        onNavItemClick?.(item.href)
                                      }
                                      className="pointer-events-auto"
                                    >
                                      <ListItem
                                        title={item.label}
                                        href={item.href}
                                        icon={item.icon}
                                        type={link.type}
                                      >
                                        {item.description}
                                      </ListItem>
                                    </Link>
                                  ))}
                                </div>
                              ) : (
                                <div className="grid gap-3 p-4">
                                  {link.items?.map((item, itemIndex) => (
                                    <Link
                                      key={itemIndex}
                                      to={item.href}
                                      onClick={() =>
                                        onNavItemClick?.(item.href)
                                      }
                                      className="pointer-events-auto"
                                    >
                                      <ListItem
                                        title={item.label}
                                        href={item.href}
                                        type={link.type}
                                      >
                                        {item.description}
                                      </ListItem>
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </NavigationMenuContent>
                          </>
                        ) : (
                          <NavigationMenuLink asChild>
                            <Link
                              to={link.href!}
                              className={cn(
                                navigationMenuTriggerStyle(),
                                "cursor-pointer"
                              )}
                              onClick={() => onNavItemClick?.(link.href!)}
                            >
                              {link.label}
                            </Link>
                          </NavigationMenuLink>
                        )}
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              )}
            </div>
          </div>
          {/* Right side - conditional rendering based on auth state */}
          <div className="flex items-center gap-3">
            <ModeToggle />

            {auth.isLoading ? (
              // Loading state
              <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
            ) : auth.isAuthenticated ? (
              // Authenticated user UI
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setShowLogoutDialog(true)}
                >
                  Logout
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-9 w-9 rounded-full"
                    >
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={auth.userAttributes?.picture}
                          alt={auth.userAttributes?.name || 'User'}
                        />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {auth.userAttributes?.name || 'User'}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {auth.userAttributes?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => navigate('/dashboard/profile')}
                      className="cursor-pointer"
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate('/dashboard/settings')}
                      className="cursor-pointer"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => setShowLogoutDialog(true)}
                      className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              // Guest user UI (not authenticated)
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onSignInClick) onSignInClick();
                  }}
                >
                  <Link to={signInHref}>
                    {signInText}
                  </Link>
                </Button>

                <Button
                  size="sm"
                  className="text-sm font-medium px-4 h-9 rounded-md shadow-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onCtaClick) onCtaClick();
                  }}
                >
                  <Link to={ctaHref}>
                    {ctaText}
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Logout Confirmation Dialog */}
        <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Log out of your account?</DialogTitle>
              <DialogDescription>
                Are you sure you want to log out? You'll need to sign in again to access your account.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => setShowLogoutDialog(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleLogout}
              >
                Log out
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </header>
    );
  }
);

Navbar02.displayName = "Navbar02";

// ListItem component for navigation menu items
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string;
    href?: string;
    icon?: string;
    type?: "description" | "simple" | "icon";
    children?: React.ReactNode;
  }
>(({ className, title, children, icon, type, ...props }, ref) => {
  const renderIconComponent = (iconName?: string) => {
    if (!iconName) return null;
    switch (iconName) {
      case "BookOpenIcon":
        return <BookOpenIcon className="h-5 w-5" />;
      case "LifeBuoyIcon":
        return <LifeBuoyIcon className="h-5 w-5" />;
      case "InfoIcon":
        return <InfoIcon className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <NavigationMenuLink asChild>
      <a
        ref={ref}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer",
          className
        )}
        {...props}
      >
        {type === "icon" && icon ? (
          <div className="flex items-start space-x-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
              {renderIconComponent(icon)}
            </div>
            <div className="space-y-1">
              <div className="text-base font-medium leading-tight">{title}</div>
              {children && (
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  {children}
                </p>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="text-base font-medium leading-none">{title}</div>
            {children && (
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {children}
              </p>
            )}
          </>
        )}
      </a>
    </NavigationMenuLink>
  );
});
ListItem.displayName = "ListItem";

export { Logo, HamburgerIcon };
