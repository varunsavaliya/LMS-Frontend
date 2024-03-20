import { NavBar } from "../components/shared/NavBar";
import Footer from "../components/shared/Footer";

function HomeLayout({ children }) {
  return (
    <>
      <div>
        <NavBar />
        <div className="container m-auto min-h-[85vh] md:px-5 px-9">
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default HomeLayout;
