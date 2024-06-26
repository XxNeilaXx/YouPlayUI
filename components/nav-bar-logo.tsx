import { HOME_PAGE } from '@/constants/routes';
import { Guitar, Package2 } from 'lucide-react';
import Link from 'next/link';

const NavBarLogo = () => {
  return (
    <Link
      href={HOME_PAGE}
      className="flex items-center gap-2 text-lg font-semibold md:text-base"
    >
      <Guitar className="h-6 w-6" />
      <span className="sr-only">XxNeilaXx</span>
    </Link>
  );
};

export { NavBarLogo };
