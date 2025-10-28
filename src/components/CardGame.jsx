import LazyLoadGameImage from "./LazyLoadGameImage";
import { Link } from "react-router";

function CardGame({ game }) {
  const genres = game.genres.map((genre) => genre.name).join(", ");
  const { background_image: image } = game;

  return (
    <div
      key={game.id}
      className="card bg-dark text-light shadow-lg rounded-4 h-100 border border-secondary"
    >
      <div className="position-relative">
        <LazyLoadGameImage src={image} alt={game.name} className="card-img-top rounded-top-4" />
        <span className="badge bg-danger position-absolute top-0 start-0 m-2">
          {genres.split(",")[0]}
        </span>
      </div>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-truncate" title={game.name}>{game.name}</h5>
        <p className="card-text mb-3 text-muted">Data di rilascio: {game.released}</p>
        <Link
          to={`/games/${game.slug}/${game.id}`}
          className="btn btn-outline-warning mt-auto fw-bold rounded-pill"
        >
          Scopri il Gioco
        </Link>
      </div>
    </div>
  );
}

export default CardGame;
