import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";
import StudyBreadcrumb from "../StudyBreadcrumb";

export function Study({ deck, setDeck }) {
  const history = useHistory();
  const { deckId } = useParams();
  const [collection, setCollection] = useState({
    cards: [],
    cardNumber: 0,
    side: "front",
  });

  useEffect(() => {
    async function fetchCards() {
      const deckData = await readDeck(deckId);
      setDeck(deckData);
      setCollection({
        cardNumber: 0,
        side: "front",
        cards: deckData.cards,
      });
    }
    fetchCards();
  }, [deckId, setDeck]);

  function handleFlip() {
    setCollection({
      ...collection,
      side: "back",
    });
  }

  function handleNext() {
    if (collection.cardNumber >= collection.cards.length - 1) {
      if (window.confirm("Restart Session?")) {
        setCollection({
          ...collection,
          cardNumber: 0,
          side: "front",
        });
      } else {
        history.push("/");
      }
    } else {
      setCollection({
        ...collection,
        cardNumber: collection.cardNumber + 1,
        side: "front",
      });
    }
  }

  if (collection.cards.length < 3) {
    return (
      <>
        <StudyBreadcrumb deck={deck} />
        <h1>{deck.name}: Study</h1>
        <h2>Not enough cards.</h2>
        <p>
          You need at least 3 cards to study. There are{" "}
          {collection.cards.length} cards in this deck.
        </p>
      </>
    );
  } else {
    return (
      <div>
        <StudyBreadcrumb deck={deck} />
        <h1>Study: {deck.name}</h1>
        <div className="card">
          <h3>
            Card {`${collection.cardNumber + 1} of ${collection.cards.length}`}
          </h3>
          <p>
            {collection.side === "front"
              ? collection.cards[collection.cardNumber].front
              : collection.cards[collection.cardNumber].back}
          </p>
          <button type="button" onClick={handleFlip}>
            Flip
          </button>
          {collection.side === "back" ? (
            <button type="button" onClick={handleNext}>
              Next
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Study;
