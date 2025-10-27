import { useEffect } from "react";
import { useSearchParams } from "react-router";
import useFetchSolution from "../../hook/useFetchSolution";
import CardGame from "../../components/CardGame";

function SearchPage() {
  let [searchParams] = useSearchParams();
  const game = searchParams.get("query");
  const initialUrl = `https://api.rawg.io/api/games?key=9269195f491e44539d7a2d10ce87ab15&search=${game}`;
  const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);

  useEffect(() => {
    updateUrl(initialUrl);
  }, [initialUrl, updateUrl]);

  return (
    <div className="container my-4">
      <div className="row g-3 justify-content-center">
        {data?.results.map((game) => (
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
