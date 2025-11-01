import { useContext } from "react";
import supabase from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext";
import RealtimeChat from "./RealtimeChat";

function Chatbox({ data }) {
  const { session } = useContext(SessionContext);

  const handleMessageSubmit = async (event) => {
    event.preventDefault();
    const inputMessage = event.currentTarget;
    const { message } = Object.fromEntries(new FormData(inputMessage));
    if (typeof message === "string" && message.trim().length !== 0) {
      const { error } = await supabase
        .from("messages")
        .insert([
          {
            profile_id: session?.user.id,
            profile_username: session?.user.user_metadata.username,
            game_id: data.id,
            content: message,
          },
        ])
        .select();

      if (error) {
        console.error(error);
      } else {
        inputMessage.reset();
      }
    }
  };

  return (
    <div className="container my-4">
      <div className="card shadow-sm">
        <h5 className="mb-0">
          <i className="bi bi-chat-dots me-2"></i>Gamers Chat
        </h5>

        <div className="card-body p-0" style={{ backgroundColor: "#1b121b" }}>
          <div className="p-3" style={{ maxHeight: "50vh", overflowY: "auto" }}>
            <RealtimeChat data={data} />
          </div>
        </div>

        <div className="card-footer bg-light">
          <form
            onSubmit={handleMessageSubmit}
            className="d-flex align-items-center gap-2"
          >
            <input
              type="text"
              name="message"
              placeholder="Scrivi un messaggio..."
              className="form-control"
            />
            <button type="submit" className="btn btn-primary">
              Invia
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chatbox;
