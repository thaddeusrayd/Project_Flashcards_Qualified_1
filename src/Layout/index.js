import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import Study from "./Decks/Study";
import Deck from "./Decks/Deck";
import CreateDeck from "./Decks/CreateDeck";
import EditDeck from "./Decks/EditDeck";
import AddCard from "./Decks/Cards/AddCard";
import EditCard from "./Decks/Cards/EditCard";

function Layout() {
  const [decks, setDecks] = useState([]);
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Home decks={decks} setDecks={setDecks} />
          </Route>
          <Route exact path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck deck={deck} setDeck={setDeck} />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <Study deck={deck} setDeck={setDeck} />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <EditDeck deck={deck} setDeck={setDeck} />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <AddCard
              deck={deck}
              setDeck={setDeck}
              card={card}
              setCard={setCard}
            />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard
              deck={deck}
              setDeck={setDeck}
              card={card}
              setCard={setCard}
            />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
