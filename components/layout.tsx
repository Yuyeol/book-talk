import Header from "./header";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="max-w-lg w-full bg-slate-300 min-h-screen h-full">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
