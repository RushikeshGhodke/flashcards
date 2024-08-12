import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiErrors.js";
import { ApiRespone } from "../utils/ApiResponse.js";
import { connection } from "../db/index.js";

const sayHello = async (req, res) => {
  res.status(200).json(200, new ApiRespone(200, "All set!"));
};

const getAllCards = asyncHandler(async(req, res) => {
  await connection.query("SELECT * FROM flashcards", function (err, result, fields) {
    if (err) {
      res.status(500).json(new ApiError(500, "Error Fetching users"));
      throw new ApiError(500, "Error Fetching users");
    }
    if (result) {
      res.status(200).json(new ApiRespone(200, result, "Data fetched."));
    }
  });
});

const deleteCard = asyncHandler(async (req, res) => {
  const { id } = req.body;
  console.log(id)
  try {
    await connection.query(
      `DELETE FROM flashcards WHERE id = ${id}`,
      function (err, result, fields) {
        if (err) {
          console.error("Error while deleting card:", err);
          throw new ApiError(500, "Error while deleting card");
        }
        if (result) {
          res.status(200).json(new ApiRespone(200, result, "Card Deleted."));
        }
      }
    );
  } catch (error) {
    console.error("Caught an error while deleting card:", error);
    res.status(500).json(new ApiError(500, "Internal server error"));
  }
});

const addCard = asyncHandler(async (req, res) => {
  const { question, answer, color } = req.body;
  console.log(question, answer, color);

  if (![question, answer, color].every((param) => param && param.trim())) {
    throw new ApiError(400, "Provide all necessary parameters");
  }

  await connection.query(
    "INSERT INTO flashcards (question, answer, color) VALUES (?, ?, ?)",
    [question, answer, color],
    (error, results, fields) => {
      if (error) {
        console.error("Error creating card: ", error);
        return res.status(500).json({ error: "Error creating card" });
      }
      res
        .status(201)
        .json(
          new ApiRespone(
            201,
            { id: results.insertId,
              question, answer, color
             },
            "Card Added successfully."
          )
        );
    }
  );
});

const editCard = asyncHandler(async(req, res) => {
  const { id, question, answer, color } = req.body;

  await connection.query(`update flashcards SET question = '${question}', answer = '${answer}', color = '${color}' where id = '${id}';`, function (err, results, fields) {
      if (err) {
          console.error("Error executing search query:", err);
          return res.status(500).json({ error: "Internal server error" });
        }
  
        res.status(200).json(new ApiRespone(200, {id, question, answer, color}, `Card Updated.`));
  });
});


export {
  sayHello,
  getAllCards,
  deleteCard,
  addCard,
  editCard
};
