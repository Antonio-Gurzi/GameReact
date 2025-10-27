import { useState } from "react";
import { useNavigate } from "react-router";

function Searchbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [ariaIvalid, setAriaInvalid] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (typeof search === "string" && search.trim().length !== 0) {
      navigate(`/search?query=${search}`);
      setSearch("");
    } else {
      setAriaInvalid(true);
    }
  };

  return (
    <form className="d-flex" role="search" onSubmit={handleSearch}>
      <input
        className="form-control me-2 rounded-pill"
        type="search"
        placeholder="Trova il tuo gioco"
        aria-label="Search"
        value={search}
        aria-invalid={ariaIvalid}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="btn btn-dark rounded-pill px-4" type="submit">
        Cerca
      </button>
    </form>
  );
}

export default Searchbar;
