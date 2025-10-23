import LazyLoadGameImage from "./LazyLoadGameImage";
import { Link } from "react-router";

function CardGame({ game }) {
  const genres = game.genres.map((genre) => genre.name).join(", ");
  const { background_image: image } = game;

  return (
    <div key={game.id} className="card card-game">
      <h3 className="card-header text-truncate">{game.name}</h3>
      <div className="card-body">
        {/* <h5 className="card-title text-truncate">{game.name}</h5> */}
        <h6 className="card-subtitle text-muted text-truncate">{genres}</h6>
      </div>

      <LazyLoadGameImage src={image} alt={game.name} />

      <div className="card-body">
        <p className="card-text text-truncate">
          Data di rilascio: {game.released}
        </p>
      </div>
      <div className="card-body">
        <button className="btn btn-primary w-100">
          <Link className="text-decoration-none" to={`/games/${game.slug}/${game.id}`}>Visita il Gioco</Link>
        </button>
      </div>
    </div>
  );
}

export default CardGame;
