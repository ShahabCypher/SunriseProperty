import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="mt-25 bg-off-white">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
