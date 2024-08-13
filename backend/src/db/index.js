import mysql from "mysql";

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "flashcard-app",
// });

const connection = mysql.createConnection({
  host: "localhost",
  user: "atulyhco_flashcard-app",
  password: "Rc,J,eR3O1-N",
  database: "atulyhco_flashcard-app",
});

export { connection };
