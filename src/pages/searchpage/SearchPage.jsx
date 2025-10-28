import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useFetchSolution from "../../hook/useFetchSolution";
import CardGame from "../../components/CardGame";

function SearchPage() {
  const [searchParams] = useSearchParams();
  const game = searchParams.get("query");
  const initialUrl = `https://api.rawg.io/api/games?key=9269195f491e44539d7a2d10ce87ab15&search=${game}`;
  const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);

  const [results, setResults] = useState([]);

  useEffect(() => {
    updateUrl(initialUrl);
  }, [initialUrl, updateUrl]);

  useEffect(() => {
    if (data?.results) {
      const validGames = data.results.filter(
        (g) => g.id && g.name && g.background_image
      );
      setResults(validGames);
    } else {
      setResults([]);
    }
  }, [data]);

  if (loading) {
    return (
      <h2 className="text-center m-5">
        Caricamento in corso...
        <div className="spinner-border ms-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </h2>
    );
  }

  if (error) {
    return <h2 className="text-center text-danger">Errore: {error}</h2>;
  }

  if (!results.length) {
    return <h2 className="text-center my-5">Nessun gioco trovato per "{game}"</h2>;
  }

  return (
    <div className="container my-4">
      <div className="row g-3 justify-content-center">
        {results.map((game) => (
          <div
            key={game.id}
            className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center"
          >
            <CardGame game={game} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
