import Header from "./header";
import NavBar from "./navbar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="max-w-lg w-full mx-auto bg-slate-300 min-h-screen h-full relative">
      <Header />
      {children}
      <NavBar />
    </div>
  );
};

export default Layout;
