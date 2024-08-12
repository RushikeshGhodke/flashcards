import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCards, deleteCard, updateCard } from "../features/cardSlice";
import { FaRegEdit, FaRegSave } from "react-icons/fa";
import { MdDelete, MdOutlineCancel } from "react-icons/md";
import FlashcardForm from "./FlashcardForm";
import { Link } from "react-router-dom"

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.card.cards);
  const cardStatus = useSelector((state) => state.card.status);
  const error = useSelector((state) => state.card.error);
  const [editCardId, setEditCardId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    question: "",
    answer: "",
    color: "",
  });

  useEffect(() => {
    if (cardStatus === "idle") {
      dispatch(fetchCards());
    }
  }, [cardStatus, dispatch]);

  const handleDelete = (cardId) => {
    dispatch(deleteCard(cardId));
  };

  const handleEdit = (card) => {
    setEditCardId(card.id);
    setEditFormData({
      question: card.question,
      answer: card.answer,
      color: card.color,
    });
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  let content;

  if (cardStatus === "loading") {
    content = <div>Loading...</div>;
  } else if (cardStatus === "succeeded") {
    content = (
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Question</th>
              <th>Answer</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card, i) => (
              <tr key={i} className={editCardId === card.id ? "selected" : ""}>
                {editCardId === card.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="question"
                        className="bigger-input"
                        value={editFormData.question}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="answer"
                        className="bigger-input"
                        value={editFormData.answer}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <button className="action-btn save-btn" onClick={handleSave}>
                        <FaRegSave />
                      </button>
                      <button className="action-btn cancel-btn" onClick={handleCancel}>
                        <MdOutlineCancel />
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{card.question}</td>
                    <td>{card.answer}</td>
                    <td>
                      <button
                        className="action-btn edit-btn"
                        onClick={() => handleEdit(card)}
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={() => handleDelete(card.id)}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    );
  } else if (cardStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="mini-admin">
        <h2 className="admin-heading">Admin Dashboard</h2>
        <Link className="btn" to={"/"}>Go To Cards</Link>
      </div>
      <FlashcardForm onSubmit={(newCard) => dispatch(addCard(newCard))} />
      {content}
    </div>
  );
};

export default AdminDashboard;
