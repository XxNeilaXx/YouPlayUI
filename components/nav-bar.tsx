'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import Image from 'next/image';
import { CircleUser, LogIn, LogOut, Menu, Settings } from 'lucide-react';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ModeToggle } from '@/components/mode-toggle';
import { NavBarLogo } from './nav-bar-logo';
import { NavBarLink } from './nav-bar-link';
import {
  ABOUT_PAGE,
  CONTACT_PAGE,
  DASHBOARD_PAGE,
  HOME_PAGE,
  LOGOUT_API_ROUTE,
  MANAGE_PAGE,
  SETTINGS_PAGE,
} from '@/constants/routes';

const NavBar = () => {
  const { user, isLoading } = useUser();

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <NavBarLogo />
        {!user && <NavBarLink name="Home" href={HOME_PAGE} />}
        {user && (
          <>
            <NavBarLink name="Dashboard" href={DASHBOARD_PAGE} />
            <NavBarLink name="Manage" href={MANAGE_PAGE} />
          </>
        )}
        <NavBarLink name="About" href={ABOUT_PAGE} />
        <NavBarLink name="Contact" href={CONTACT_PAGE} />
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <NavBarLogo />
            <Link href="#" className="hover:text-foreground">
              Dashboard
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Orders
            </Link>
            {user && (
              <>
                <Link
                  href="#"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Logged In Link
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Logged In Link 2
                </Link>
              </>
            )}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex gap-4 ml-auto md:gap-2 lg:gap-4">
        <ModeToggle />
        {!isLoading && !user && (
          <Button className="rounded-full" asChild>
            <Link href="/api/auth/login" className="btn btn-primary btn-margin">
              <LogIn className="mr-2 h-5 w-5" /> Log in
            </Link>
          </Button>
        )}
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage
                    src={user.picture || undefined}
                    alt="User picture"
                  />
                  <AvatarFallback>
                    <CircleUser className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user.name || 'My Account'}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <Link href={SETTINGS_PAGE}>Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <Link href={LOGOUT_API_ROUTE}>Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};

export { NavBar };
