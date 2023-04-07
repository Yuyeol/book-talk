import Link from "next/link";
import Header from "./header";
import NavBar from "./navbar";

interface Props {
  children: React.ReactNode;
  href: string;
}

const FloatingButton = ({ children, href }: Props) => {
  return (
    <Link
      href={href}
      className="fixed flex items-center justify-center w-10 h-10 rounded-full shadow-inner drop-shadow-md shadow-slate-300 bg-slate-600 bottom-24 right-6"
    >
      {children}
    </Link>
  );
};

export default FloatingButton;
