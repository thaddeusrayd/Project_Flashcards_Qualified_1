import React from "react";
import { useHistory } from "react-router-dom";

function Form({ handleChange, handleSubmit, front, back, deck }) {
  const history = useHistory();
  return (
    <form>
      <div>
        <label>Front</label>
        <textarea
          type="text"
          className="form-control"
          id="front"
          placeholder="Front side of the card"
          value={front}
          rows="3"
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Back</label>
        <textarea
          className="form-control"
          id="back"
          placeholder="Back side of card"
          value={back}
          rows="3"
          onChange={handleChange}
        />
      </div>
      <button
        type="done"
        className="btn btn-secondary"
        onClick={history.push(`/decks/${deck.id}`)}
      >
        Done
      </button>
      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Save
      </button>
    </form>
  );
}

export default Form;
