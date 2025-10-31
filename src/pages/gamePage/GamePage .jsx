import { useParams } from "react-router";
import useFetchSolution from "../../hook/useFetchSolution";
import ToggleFavorite from "../../components/ToggleFavorite"; 

function GamePage() {
  const { id } = useParams();
  const initialUrl = `https://api.rawg.io/api/games/${id}?key=9269195f491e44539d7a2d10ce87ab15`;
  const { data, loading, error } = useFetchSolution(initialUrl);

  if (loading) return <div>Caricamento...</div>;
  if (error) return <div>Errore: {error}</div>;

  return (
    <>
      {data && (
        <div className="card my-4 shadow-lg border-0 rounded-4 bg-dark text-light position-relative">
          <div className="position-relative">
            <img
              src={data.background_image}
              alt={data.name}
              className="card-img-top rounded-top-4"
              style={{ objectFit: "cover", maxHeight: "400px" }}
            />

            {/* Pulsante ToggleFavorite */}
            <div
              className="position-absolute top-0 end-0 m-3"
              style={{ zIndex: 10 }}
            >
              <ToggleFavorite data={data} />
            </div>
          </div>

          <div className="card-body">
            <h3 className="card-title mb-3">{data.name}</h3>
            {data.released && (
              <p className="card-text mb-2">
                <i className="bi bi-calendar-event me-2 text-info"></i>
                <span className="fw-bold">Uscita:</span> {data.released}
              </p>
            )}
            {data.rating && (
              <p className="card-text mb-3">
                <i className="bi bi-star-fill me-2 text-warning"></i>
                <span className="fw-bold">Valutazione:</span> {data.rating}
              </p>
            )}
            {data.description_raw && (
              <p className="card-text text-light">{data.description_raw}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default GamePage;
