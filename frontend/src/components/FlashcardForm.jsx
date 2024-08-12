import React, { useState } from 'react';
import { addCard } from '../features/cardSlice';
import { useDispatch } from 'react-redux';


function FlashcardForm({ onSubmit }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [color, setColor] = useState('#fff');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCard = {
      question,
      answer,
      color
    };

    console.log(newCard);

    dispatch(addCard(newCard));
    setQuestion('');
    setAnswer('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className='inputs'
        type="text"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      />
      <input
        className='inputs'
        type="text"
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        required
      />
      {/* <input
        className='inputs'
        type="text"
        placeholder="Color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        required
      /> */}
      <button className='btn' type="submit">Add Flashcard</button>
    </form>
  );
}

export default FlashcardForm;
