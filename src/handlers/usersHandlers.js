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
  const { firstname, lastname, email, city, language, hashedPassword } = req.body;
  database
    .query("INSERT INTO users (firstname, lastname, email, city, language, hashedPassword) VALUES (?, ?, ?, ?, ?, ?)", [firstname, lastname, email, city, language, hashedPassword])
    .then(([result]) => {
      res.status(201).send({ id: result.insertId });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getUsers,
  getUserById,
  postUser
};
