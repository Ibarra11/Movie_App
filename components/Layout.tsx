import Nav from "./Nav";
import Input from "./Input";
const Layout: (props: { children: React.ReactNode }) => React.ReactElement = ({
  children,
}) => {
  return (
    <div className="h-full flex flex-col gap-6 md:gap-9 xl:flex-row xl:gap-9 ">
      <Nav />
      <div className="border-4 flex flex-col gap-6 px-4 border-red flex-1 md:px-6">
        <Input />

        {children}
      </div>
    </div>
  );
};

export default Layout;
