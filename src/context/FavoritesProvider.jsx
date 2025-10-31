import { useState, useEffect, useContext, useCallback } from "react";
import supabase from "../supabase/supabase-client";
import SessionContext from "./SessionContext";
import FavoritesContext from "./FavoritesContext";

export default function FavoritesProvider({ children }) {
  const { session } = useContext(SessionContext);
  const [favorites, setFavorites] = useState([]);

  const getFavorites = useCallback(async () => {
    const userId = session?.user?.id;
    if (!userId) {
      setFavorites([]);
      return;
    }
    let { data: favourites, error } = await supabase
      .from("favorites")
      .select("*")
      .eq("user_id", userId);
    if (error) {
      console.log(error);
      console.log("Errore in console");
    } else {
      setFavorites(favourites);
    }
  }, [session]);

  const addFavorites = async (game) => {
    const userId = session?.user?.id;
    if (!userId) return;
    await supabase
      .from("favorites")
      .insert([
        {
          user_id: userId,
          game_id: game.id,
          game_name: game.name,
          game_image: game.background_image,
        },
      ])
      .select();
  };

  const removeFavorite = async (gameId) => {
    const userId = session?.user?.id;
    if (!userId) return;
    await supabase
      .from("favorites")
      .delete()
      .eq("game_id", gameId)
      .eq("user_id", userId);
  };

  useEffect(() => {
    if (session && session.user && session.user.id) {
      getFavorites();
    } else {
      setFavorites([]);
    }

    const favoritesChannel = supabase
      .channel("favorites")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "favorites" },
        () => getFavorites()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(favoritesChannel);
      favoritesChannel.unsubscribe();
    };
  }, [getFavorites, session]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        setFavorites,
        addFavorites,
        removeFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
