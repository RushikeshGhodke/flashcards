import React, { useEffect, useState } from 'react';
import Flashcard from './Flashcard';
import { useDispatch, useSelector } from "react-redux";
import { deleteCard, fetchCards, updateCard } from "../features/cardSlice.js"

function FlashcardList() {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.card.cards);
  const [editCardId, setEditCardId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    question: "",
    answer: "",
    color: "",
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
      dispatch(fetchCards());
  }, [dispatch]);

  const handleDelete = (userId) => {
    dispatch(deleteCard(userId));
  };

  const handleSave = () => {
    dispatch(
      updateCard({
        id: editCardId,
        question: editFormData.question,
        answer: editFormData.answer,
        color: editFormData.color,
      })
    ).then(() => {
      setEditCardId(null);
    });
  };

  const handleCancel = () => {
    setEditCardId(null);
  };

  const handleEdit = (user) => {
    setEditCardId(card.id);
    setEditFormData({
      question: card.question,
      answer: card.answer,
      color: card.color,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    setFlipped(false); // Reset flip state
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
    setFlipped(false); // Reset flip state
  };

  const handleCardClick = () => {
    setFlipped(!flipped); // Toggle flip state
  };

  if (cards.length === 0) {
    return <div className="flashcard-list">No flashcards available.</div>;
  }

  return (
    <div className="flashcard-list">
      <Flashcard
        card={cards[currentIndex]}
        isFlipped={flipped}
        onClick={handleCardClick}
      />
      <div className="navigation">
        <button className="btn" onClick={handlePrevious}>Previous</button>
        <button className="btn" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default FlashcardList;
