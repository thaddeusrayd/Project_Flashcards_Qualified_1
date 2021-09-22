import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api";

function Home({ decks, setDecks }) {
  useEffect(() => {
    const abortController = new AbortController();

    async function fetchDecks() {
      const decksData = await listDecks(abortController.signal);
      setDecks(decksData);
    }
    fetchDecks();
  }, [setDecks]);

  function handleDelete(deckId) {
    if (window.confirm("Are you sure?")) {
      deleteDeck(deckId);
    }
  }

  return (
    <>
      <Link to="/decks/new">
        <button type="button">Create Deck</button>
      </Link>
      <div>
        {decks.map((deck, index) => {
          return (
            <div className="card" key={index}>
              <p>{deck.name}</p>
              <p>{deck.cards.length} cards</p>
              <p>{deck.description}</p>
              <Link to={`/decks/${deck.id}`}>
                <button type="button">View</button>
              </Link>
              <Link to={`/decks/${deck.id}/study`}>
                <button type="button">Study</button>
              </Link>
              <button type="button" onClick={() => handleDelete(deck.id)}>
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Home;
