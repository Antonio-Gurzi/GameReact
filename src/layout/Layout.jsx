import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

function Layout() {
  return (
    <>
      <Header />
      <main className="container-fluid">
        <div className="row">
          {/* Sidebar fissa a sinistra */}
          <Sidebar />

          {/* Contenuto principale */}
          <section className="col-12 col-md-9 col-lg-10">
            <Outlet />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Layout;
