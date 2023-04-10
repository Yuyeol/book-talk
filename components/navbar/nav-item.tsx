import Link from "next/link";

interface Props {
  children: React.ReactNode;
  href: string;
}

const NavItem = ({ children, href }: Props) => {
  return (
    <Link href={href} className="flex flex-col items-center w-10">
      {children}
    </Link>
  );
};
export default NavItem;
