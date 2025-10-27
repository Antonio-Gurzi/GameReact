import CardGame from "../../components/CardGame";
import useFetchSolution from "../../hook/useFetchSolution";

function Homepage() {
  const initialUrl =
    "https://api.rawg.io/api/games?key=aa60a9afaee345918b4cd7ffa27eba40&dates=2024-01-01,2024-12-31&page=1";
  const { data, loading, error } = useFetchSolution(initialUrl);
  if (loading) {
    return (
      <h2 className="text-center m-5">
        Caricamento in corso...
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </h2>
    );
  }

  if (error) {
    return <h2>Errore: {error}</h2>;
  }

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

export default Homepage;
