const database = require("../../database");

const getUsers = (req, res) => {
  let sql = "SELECT * FROM users";
  const sqlValues = [];

  const language = req.query.language;
  if (language != null) {
    sqlValues.push(language);
    sql += sqlValues.length === 1 ? " WHERE language=?" : " AND language=?";
  }

  const city = req.query.city;
  if (city != null) {
    sqlValues.push(city);
    sql += sqlValues.length === 1 ? " WHERE city=?" : " AND city=?";
  }

  const firstname = req.query.firstname;
  if (firstname != null) {
    sqlValues.push(firstname);
    sql += sqlValues.length === 1 ? " WHERE firstname=?" : " AND firstname=?";
  }

  database
    .query(sql, sqlValues)
    .then((results) => {
      res.status(200).json(results[0]);
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: err.message });
    });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query("SELECT * FROM users WHERE id=?", [id])
    .then((results) => {
      res.status(200).json(results[0]);
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: err.message });
    });
};

const postUser = (req, res) => {
  const { firstname, lastname, email, city, language, hashedPassword } =
    req.body;
  database
    .query(
      "INSERT INTO users (firstname, lastname, email, city, language, hashedPassword) VALUES (?, ?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language, hashedPassword]
    )
    .then(([result]) => {
      res.status(201).send({ id: result.insertId });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const putUser = (req, res) => {
  const id = req.params.id;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const city = req.body.city;
  const language = req.body.language;
  const hashedPassword = req.body.hashedPassword;
  database
    .query(
      "UPDATE users SET firstname=?, lastname=?, email=?, city=?, language=?, hashedPassword=? WHERE id=?",
      [firstname, lastname, email, city, language, hashedPassword, id]
    )
    .then(([result]) => {
      res.status(201).send({ id: result.insertId });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteUser = (req, res) => {  
  const id = req.params.id;
  database
    .query("DELETE FROM users WHERE id=?", [id])
    .then(([result]) => {
      res.status(201).send({ id: result.insertId });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
}

module.exports = {
  getUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
};
