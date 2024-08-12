import React from 'react';

function Flashcard({ card, isFlipped, onClick }) {
  if (!card) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`flashcard ${isFlipped ? 'flipped' : ''}`}
      onClick={onClick}
    >
      <div className="front">
        {card.question}
      </div>
      <div className="back">
        {card.answer}
      </div>
    </div>
  );
}

export default Flashcard;
