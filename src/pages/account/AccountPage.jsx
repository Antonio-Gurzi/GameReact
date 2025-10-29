import { useState, useEffect, useContext } from "react";
import supabase from "../../supabase/supabase-client";
import SessionContext from "../../context/SessionContext";
import Avatar from "../../components/Avatar";

function AccountPage() {
  const { session } = useContext(SessionContext);

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    let ignore = false;

    const getProfile = async () => {
      try {
        setLoading(true);
        const { user } = session;

        const { data, error } = await supabase
          .from("profiles")
          .select("username, first_name, last_name, avatar_url")
          .eq("id", user.id)
          .single();

        if (!ignore) {
          if (error) {
            console.warn(error);
          } else if (data) {
            setUsername(data.username || "");
            setFirstName(data.first_name || "");
            setLastName(data.last_name || "");
            setAvatarUrl(data.avatar_url || null);
          }
        }
      } catch (err) {
        console.error("Errore caricando il profilo:", err);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
    return () => {
      ignore = true;
    };
  }, [session]);

  const updateProfile = async (event, avatarUrl = avatar_url) => {
    event.preventDefault();
    setLoading(true);

    const { user } = session;

    const updates = {
      id: user.id,
      username,
      first_name,
      last_name,
      avatar_url: avatarUrl,
      updated_at: new Date(),
    };

    const { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      alert("Errore durante l'aggiornamento del profilo!");
      console.error(error);
    } else {
      alert("Profilo aggiornato con successo!");
    }

    setLoading(false);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">
                Impostazioni Profilo
              </h2>

              <div className="text-center mb-4">
                <Avatar
                  uid={session?.user?.id}
                  url={avatar_url}
                  size={150}
                  onUpload={async (e, path) => {
                    setAvatarUrl(path);
                    await updateProfile(e, path); 
                  }}
                />
              </div>

              <form onSubmit={updateProfile}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    className="form-control"
                    value={session?.user?.email || ""}
                    disabled
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Inserisci il tuo username"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="first_name" className="form-label">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    className="form-control"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Inserisci il tuo nome"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="last_name" className="form-label">
                    Cognome
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    className="form-control"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Inserisci il tuo cognome"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Salvataggio..." : "Aggiorna Profilo"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
