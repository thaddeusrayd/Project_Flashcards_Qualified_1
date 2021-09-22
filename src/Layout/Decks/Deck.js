import React, { useState, useEffect } from "react";
import { deleteDeck, readDeck, deleteCard } from "../../utils/api";
import { useRouteMatch, Link, useHistory } from "react-router-dom";

function Deck() {
  const [deck, setDeck] = useState({ cards: [] });
  const { url } = useRouteMatch();
  const { params } = useRouteMatch();
  const deckId = params.deckId;
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchCards() {
      const decksData = await readDeck(deckId, abortController.signal);
      setDeck(decksData);
    }
    fetchCards();
  }, [deckId]);

  function handleDelete(event, deckId) {
    event.preventDefault();
    if (window.confirm("Are you sure?")) {
      deleteDeck(deckId);
      history.push("/");
    }
  }

  function handleCardDelete(cardId) {
    if (window.confirm("Are you sure?")) {
      deleteCard(cardId);
      history.push(`/decks/${deckId}`);
    }
  }

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">{deck.name}</li>
        </ol>
      </nav>
      <div>
        <h1>{deck.name}</h1>
        <p>{deck.description}</p>
        <Link to={`${url}/edit`}>
          <button type="button">Edit</button>
        </Link>
        <Link to={`${url}/study`}>
          <button type="button">Study</button>
        </Link>
        <Link to={`${url}/cards/new`}>
          <button type="button">Add Cards</button>
        </Link>
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      </div>
      <div>
        <h1>Cards</h1>
        {deck.cards.map((card, index) => {
          return (
            <div className="card" key={index}>
              <p>{card.front}</p>
              <p>{card.back}</p>
              <Link to={`${url}/cards/${card.id}/edit`}>
                <button type="button">Edit</button>
              </Link>
              <button type="button" onClick={() => handleCardDelete(card.id)}>
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Deck;
