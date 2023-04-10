import Header from "./header";
import NavBar from "./navbar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="relative w-full h-full max-w-lg min-h-screen mx-auto bg-slate-300">
      <Header />
      {children}
      <NavBar />
    </div>
  );
};

export default Layout;
