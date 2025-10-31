import { useContext } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import FavoritesContext from "../context/FavoritesContext";

export default function ToggleFavorite({ data }) {
  const { favorites, addFavorites, removeFavorite } =
    useContext(FavoritesContext);

  const isFavorite = () => favorites.find((el) => +el.game_id === data?.id);

  return (
    <div>
      {isFavorite() ? (
        <button
          className="btn btn-danger btn-sm rounded-circle"
          onClick={() => removeFavorite(data.id)}
          title="Rimuovi dai preferiti"
        >
          <FaHeart />
        </button>
      ) : (
        <button
          className="btn btn-outline-danger btn-sm rounded-circle"
          onClick={() => addFavorites(data)}
          title="Aggiungi ai preferiti"
        >
          <FaRegHeart />
        </button>
      )}
    </div>
  );
}
