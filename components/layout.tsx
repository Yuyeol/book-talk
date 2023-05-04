import { useRouter } from "next/router";
import NavBar from "./navbar";

interface IProps {
  children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
  const { pathname } = useRouter();
  return (
    <div className="relative w-full h-full max-w-lg min-h-screen mx-auto bg-slate-300">
      {children}
      {pathname !== "/login" && <NavBar />}
    </div>
  );
};

export default Layout;
