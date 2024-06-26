import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavBarLinkProps {
  href: string;
  name: string;
}

const NavBarLink = (props: NavBarLinkProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={props.href}
      className={`${pathname == props.href ? 'text-foreground' : 'text-muted-foreground'} transition-colors hover:text-foreground `}
    >
      {props.name}
    </Link>
  );
};

export { NavBarLink };
