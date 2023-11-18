const database = require("../../database");

const getCocktails = (req, res) => {
  database
    .query("SELECT * FROM cocktails")
    .then((results) => {
      res.status(200).json(results[0]);
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: err.message });
    });
};

const getCocktailById = (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query("SELECT * FROM cocktails WHERE id=?", [id])
    .then((results) => {
      res.status(200).json(results[0]);
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: err.message });
    });
};

const postCocktail = (req, res) => {
  const { name } = req.body;
  database
    .query("INSERT INTO cocktails (name) VALUES (?)", [name])
    .then(([result]) => {
      res.status(201).send({ id: result.insertId });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const putCocktail = (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  database
    .query("UPDATE cocktails SET name=? WHERE id=?", [name, id])
    .then(([result]) => {
      res.status(201).send({ id: result.insertId });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteCocktail = (req, res) => {
  const id = req.params.id;
  database
    .query("DELETE FROM cocktails WHERE id=?", [id])
    .then(([result]) => {
      res.status(201).send({ id: result.insertId });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getCocktails,
  getCocktailById,
  postCocktail,
  putCocktail,
  deleteCocktail,
};
