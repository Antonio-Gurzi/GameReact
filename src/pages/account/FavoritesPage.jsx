import { useState, useContext, useEffect } from "react";
import SessionContext from "../../context/SessionContext";
import FavoritesContext from "../../context/FavoritesContext";
import { FaTrashAlt } from "react-icons/fa";

export default function FavoritePage() {
  const { session } = useContext(SessionContext);
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  const [favoriteGames, setFavoriteGames] = useState(
    favorites.length > 0 ? favorites : null
  );

  useEffect(() => {
    setFavoriteGames(favorites.length > 0 ? favorites : null);
  }, [favorites]);

  return (
    <div className="container mt-4 text-center">
      {session?.user ? (
        <>
          <h2 className="mb-4">
            Benvenuto {session.user.user_metadata.first_name} 👋
          </h2>
          <h3 className="mb-4">
            Qui puoi trovare la lista dei tuoi giochi preferiti
          </h3>
        </>
      ) : (
        <h2 className="mb-4">Caricamento...</h2>
      )}

      {favoriteGames === null ? (
        <p className="text-muted p-5">Non ci sono favoriti al momento...</p>
      ) : (
        <ul className="list-group">
          {favoriteGames.map((game) => (
            <li
              key={game.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div className="d-flex align-items-center">
                <img
                  width={50}
                  height={50}
                  src={game.game_image}
                  alt={game.game_name}
                  className="me-3 rounded"
                />
                <span>{game.game_name}</span>
              </div>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => removeFavorite(game.game_id)}
              >
                <FaTrashAlt />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
