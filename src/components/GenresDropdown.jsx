import useFetchSolution from "../hook/useFetchSolution";
import { Link } from "react-router";

function GenresDropdown() {
  const initialUrl =
    "https://api.rawg.io/api/genres?key=aa60a9afaee345918b4cd7ffa27eba40";
  const { data, error } = useFetchSolution(initialUrl);

  return (
    <div className="dropdown my-3">
      <button
        className="btn btn-primary dropdown-toggle w-100 rounded-pill shadow-sm text-white"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Seleziona Genere
      </button>

      <ul className="dropdown-menu w-100 text-center rounded shadow-sm mt-1 bg-primary">
        {error && (
          <li className="dropdown-item text-white">Errore: {error}</li>
        )}

        {data?.results?.map((genre) => (
          <li key={genre.id}>
            <Link
              className="dropdown-item text-decoration-none text-white"
              to={`/games/${genre.slug}`}
            >
              {genre.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GenresDropdown;
