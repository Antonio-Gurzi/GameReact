import { useEffect, useState } from "react";
import { useParams } from "react-router";

function GamePage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const initialUrl = `https://api.rawg.io/api/games/${id}?key=9269195f491e44539d7a2d10ce87ab15`;
  const load = async () => {
    setLoading(true);
    try {
      const response = await fetch(initialUrl);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const json = await response.json();
      console.log(json);

      setData(json);
      setError(null);
    } catch (error) {
      setError(error.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  if (loading) {
    return (
      <h2 className="text-center">
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
    <>
      {data && (
        <div className="card my-3 shadow-sm border-0 imgDetail">
          <img
            src={data.background_image}
            // className="card-img-top"
            alt={data.name}
            // style={{ objectFit: "contain", maxHeight: "300px" }}
          />

          <div className="card-body bg-light text-dark">
            <h5 className="card-title">{data.name}</h5>

            {data.released && (
              <p className="card-text mb-1">
                <i className="bi bi-calendar-event me-2"></i>
                <span className="fw-bold">Uscita:</span> {data.released}
              </p>
            )}

            {data.rating && (
              <p className="card-text mb-1">
                <i className="bi bi-star-fill me-2 text-warning"></i>
                <span className="fw-bold">Valutazione:</span> {data.rating}
              </p>
            )}

            {data.description_raw && (
              <p className="card-text mt-2">{data.description_raw}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default GamePage;
