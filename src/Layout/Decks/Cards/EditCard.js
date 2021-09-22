import React, { useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readCard, updateCard, readDeck } from "../../../utils/api";

function EditCard({ deck, setDeck, card, setCard }) {
  const { deckId, cardId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchDeck() {
      const decksData = await readDeck(deckId, abortController.signal);
      setDeck(decksData);
    }
    fetchDeck();
  }, [deckId, setDeck]);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchCard() {
      const cardData = await readCard(cardId, abortController.signal);
      setCard(cardData);
    }
    fetchCard();
  }, [cardId, setCard]);

  function handleChange({ target }) {
    setCard({
      ...card,
      [target.name]: target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await updateCard(card).then((response) => history.push(`/decks/${deckId}`));
  }

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
            Edit Card
          </li>
        </ol>
      </nav>
      <div>
        <h1>Edit Card</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="front">
            Name
            <br />
            <textarea
              id="front"
              name="front"
              placeholder={card.front}
              onChange={handleChange}
              value={card.front}
            />
          </label>
          <br />
          <label htmlFor="description">
            Description
            <br />
            <textarea
              id="back"
              name="back"
              className="text-area"
              placeholder={card.back}
              onChange={handleChange}
              value={card.back}
            />
          </label>
          <br />
          <Link to={`/decks/${deckId}`}>
            <button type="button">Cancel</button>
          </Link>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default EditCard;
