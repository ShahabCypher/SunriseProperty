import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="mt-16 sm:mt-20 bg-off-white">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
