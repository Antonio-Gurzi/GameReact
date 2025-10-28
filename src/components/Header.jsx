import { Link, useNavigate } from "react-router";
import Searchbar from "./Searchbar";
import { useContext } from "react";
import supabase from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext";

function Header() {
  const navigate = useNavigate();
  const { session } = useContext(SessionContext);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log(error);
    alert("Signed out");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4 text-white" to="/">
          GameReact
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link fw-semibold text-white" to="#">
                Servizi
              </Link>
            </li>
          </ul>

          <Searchbar />

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            {!session || !session.user ? (
              <>
                <li className="nav-item me-2">
                  <Link
                    className="btn btn-outline-light rounded-pill"
                    to="/register"
                  >
                    Registrati
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="btn btn-light text-primary rounded-pill px-4"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center text-white"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div className="d-flex align-items-center gap-2">
                    <span className="badge bg-light text-primary rounded-pill px-3 py-2 shadow-sm fs-6">
                      {session?.user?.user_metadata?.username}
                    </span>
                    <i className="bi bi-person-circle fs-3 text-white"></i>
                  </div>
                </a>
                <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                  <li>
                    <Link className="dropdown-item" to="#">
                      Profilo
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Impostazioni
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={signOut}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
