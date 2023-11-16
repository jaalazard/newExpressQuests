const database = require("../../database");

const getMovies = (req, res) => {
  database
    .query("SELECT * FROM movies")
    .then((results) => {
      res.status(200).json(results[0]);
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: err.message });
    });
  }

  const getMovieById = (req, res) => {
    const id = parseInt(req.params.id);
    database
      .query("SELECT * FROM movies WHERE id=?", [id])
      .then((results) => {
        res.status(200).json(results[0]);
      })
      .catch((err) => {
        res.status(500).json({ errorMessage: err.message });
      });
    }

    const postMovie = (req, res) => {
      const { title, director, year, color, duration } = req.body;
      database
        .query("INSERT INTO movies (title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)", [title, director, year, color, duration])
        .then(([result]) => {
          res.status(201).send({ id: result.insertId });
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    };

module.exports = {
    getMovies,
    getMovieById,
    postMovie,
}
