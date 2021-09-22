import React from "react";
import { useHistory } from "react-router-dom";

function CardForm({ handleSubmit, card, setCard, deck }) {
  const history = useHistory();

  function handleChange({ target }) {
    setCard({
      ...card,
      [target.name]: target.value,
    });
  }

  function handleDone() {
    history.push(`/decks/${deck.id}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Front</label>
        <br />
        <textarea
          type="text"
          name="front"
          placeholder="Front side of the card"
          value={card.front}
          rows="3"
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Back</label>
        <br />
        <textarea
          name="back"
          placeholder="Back side of card"
          value={card.back}
          rows="3"
          onChange={handleChange}
        />
      </div>
      <button type="done" onClick={handleDone}>
        Done
      </button>
      <button type="submit">Save</button>
    </form>
  );
}

export default CardForm;
