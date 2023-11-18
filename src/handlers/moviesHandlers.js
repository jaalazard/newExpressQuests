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

    const putMovie = (req, res) => {
      const id = req.params.id;
      const title = req.body.title;
      const director = req.body.director;
      const year = req.body.year;
      const color = req.body.color;
      const duration = req.body.duration;
      database
        .query("UPDATE movies SET title=?, director=?, year=?, color=?, duration=? WHERE id=?", [title, director, year, color, duration, id])
        .then(([result]) => {
          res.status(201).send({ id: result.insertId });
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    };

    const deleteMovie = (req, res) => {
      const id = req.params.id;
      database
        .query("DELETE FROM movies WHERE id=?", [id])
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
    putMovie,
    deleteMovie,
}
