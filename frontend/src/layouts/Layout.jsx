import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="mt-25 bg-off-white">{children}</main>
    </>
  );
};

export default Layout;
