import React, { useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";

function EditDeck({ deck, setDeck }) {
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      const deckData = await readDeck(deckId, abortController.signal);
      setDeck(deckData);
    }
    fetchData();
  }, [deckId, setDeck]);

  function handleChange({ target }) {
    setDeck({
      ...deck,
      [target.name]: target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await updateDeck(deck);
    history.push(`/decks/${response.id}`);
  }

  if (deck) {
    return (
      <>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Deck
            </li>
          </ol>
        </nav>
        <div>
          <h1>Edit Deck</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">
              Name
              <br />
              <textarea
                type="text"
                id="name"
                name="name"
                placeholder={deck.name}
                onChange={handleChange}
                value={deck.name}
              />
            </label>
            <br />
            <label htmlFor="description">
              Description
              <br />
              <textarea
                id="description"
                name="description"
                className="text-area"
                placeholder={deck.description}
                onChange={handleChange}
                value={deck.description}
              />
            </label>
            <br />
            <Link to={`/decks/${deckId}`}>
              <button type="button">Done</button>
            </Link>
            <button type="submit">Save</button>
          </form>
        </div>
      </>
    );
  } else {
    return null;
  }
}

export default EditDeck;
