import { useEffect } from "react";
import useFetchSolution from "../../hook/useFetchSolution";
import { useParams } from "react-router";
import CardGame from "../../components/CardGame";
import AOS from "aos";
import "aos/dist/aos.css";

function GenrePage() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);
  const { genre } = useParams();
  const initialUrl = `https://api.rawg.io/api/games?key=9269195f491e44539d7a2d10ce87ab15&genres=${genre}&page=1`;
  const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);

  useEffect(() => {
    updateUrl(initialUrl);
  }, [genre]);

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
      <div className="row g-3">
        {data &&
          data.results.map((game) => (
            <div
              key={game.id}
              className="col-12 col-sm-6 col-lg-3"
              data-aos="flip-down"
              data-aos-delay={game.id * 500}
              data-aos-duration="1500"
            >
              <CardGame game={game} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default GenrePage;
