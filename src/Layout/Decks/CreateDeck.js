import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";

function CreateDeck() {
  const [newDeckData, setNewDeckData] = useState({ name: "", description: "" });
  const history = useHistory();

  function handleChange({ target }) {
    setNewDeckData({
      ...newDeckData,
      [target.name]: target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await createDeck(newDeckData);
    history.push(`/decks/${response.id}`);
  }

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">Create Deck</li>
        </ol>
      </nav>
      <h1>Create Deck</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name
          <br />
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Deck Name"
            onChange={handleChange}
            value={newDeckData.name}
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
            placeholder="Brief description of the deck"
            onChange={handleChange}
            value={newDeckData.description}
          />
        </label>
        <br />
        <Link to="/">
          <button type="button">Cancel</button>
        </Link>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default CreateDeck;
