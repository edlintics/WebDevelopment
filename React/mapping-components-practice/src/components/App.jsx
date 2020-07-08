import React from "react";
import emojipedia from "../emojipedia.js"
import Card from "./Card.jsx"

function createCard(card){
  return (
    <Card 
      key={card.id}
      emoji={card.emoji}
      title={card.name}
      description={card.meaning}
    />
  );
};

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>

      <dl className="dictionary">
        {emojipedia.map(createCard)}
        
      </dl>
    </div>
  );
}

export default App;
