import { useContext, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import supabase from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext";

function ToggleFavorite({ data }) {
  const { session } = useContext(SessionContext);
  const [favorite, setFavorite] = useState(data.is_favorite);

  const isFavorite = () => favorite; // usa lo stato locale per il toggle

  const addFavorite = async (game) => {
    const { data: insertedData, error } = await supabase
      .from("favorites")
      .insert([
        {
          user_id: session?.user.id,
          game_id: game.id,
          game_name: game.name,
          game_image: game.background_image,
        },
      ])
      .select();

    if (error) {
      alert(error.message);
    } else {
      setFavorite(true);
    }
  };

  const removeFavorite = async (game) => {
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("game_id", game.id)
      .eq("user_id", session?.user.id);

    if (error) {
      alert(error.message);
    } else {
      setFavorite(false);
    }
  };

  return (
<div className="d-flex justify-content-end">
  {isFavorite() ? (
    <button
      onClick={() => removeFavorite(data)}
      className="btn btn-light text-danger rounded-circle shadow p-2 d-flex align-items-center justify-content-center"
      style={{ fontSize: "1.5rem", width: "50px", height: "50px" }}
      title="Rimuovi dai preferiti"
    >
      <FaHeart />
    </button>
  ) : (
    <button
      onClick={() => addFavorite(data)}
      className="btn btn-light text-secondary rounded-circle shadow p-2 d-flex align-items-center justify-content-center"
      style={{ fontSize: "1.5rem", width: "50px", height: "50px" }}
      title="Aggiungi ai preferiti"
    >
      <FaRegHeart />
    </button>
  )}
</div>

  );
}

export default ToggleFavorite;
