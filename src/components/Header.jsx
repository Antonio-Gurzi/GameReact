import { Link, useNavigate } from "react-router";
import Searchbar from "./Searchbar";
import { useContext } from "react";
import supabase from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext";

function Header() {
  const navigate = useNavigate();
  const { session } = useContext(SessionContext);

  console.log("Session from context:", session);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log(error);
    alert('Signed out');
    navigate('/');
  }

  return (
    <nav className="navbar navbar-expand-lg bg-light px-5 pb-2" data-bs-theme="light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">GameReact</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="#">Servizi</a>
            </li>
          </ul>

          <Searchbar />

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {!session || !session.user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Registrati</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {session?.user?.user_metadata?.username}
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><a className="dropdown-item" href="#">Profilo</a></li>
                  <li><a className="dropdown-item" href="#">Impostazioni</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item" onClick={signOut}>Logout</button></li>
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
