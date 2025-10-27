import useFetchSolution from "../hook/useFetchSolution";
import { Link } from "react-router";

function GenresDropdown() {
  const initialUrl =
    "https://api.rawg.io/api/genres?key=aa60a9afaee345918b4cd7ffa27eba40";
  const { data, error } = useFetchSolution(initialUrl);
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

        {data?.results?.map((genre) => (
          <li key={genre.id}>
            <Link className="text-decoration-none" to={`/games/${genre.slug}`}>
              {genre.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GenresDropdown;
