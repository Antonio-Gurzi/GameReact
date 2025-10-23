import { useEffect, useState } from "react";
import { Link } from "react-router";

function GenresDropdown() {
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);
  const initialUrl =
    "https://api.rawg.io/api/genres?key=aa60a9afaee345918b4cd7ffa27eba40";
  const load = async () => {
    try {
      const response = await fetch(initialUrl);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const json = await response.json();
      setGenres(json.results);
      console.log(json.results);
    } catch (error) {
      setError(error.message);
      setGenres(null);
    }
  };
  useEffect(() => {
    load();
  }, []);
  return (
    <div className="dropdown my-3">
      <button
        className="btn btn-primary dropdown-toggle w-100"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Seleziona Genere
      </button>

      <ul className="dropdown-menu w-100 text-center">
        {error && (
          <li className="dropdown-item text-danger">Errore: {error}</li>
        )}

        {genres.map((genre) => (
          <li key={genre.id}>
            <Link className="text-decoration-none" to={`/games/${genre.slug}`}>{genre.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GenresDropdown;
