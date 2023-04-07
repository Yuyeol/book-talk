import Link from "next/link";

interface Props {
  children: React.ReactNode;
  href: string;
}

const NavItem = ({ children, href }: Props) => {
  return (
    <Link href={href} className="w-10 flex flex-col items-center">
      {children}
    </Link>
  );
};
export default NavItem;
