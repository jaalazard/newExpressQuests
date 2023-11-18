const validateMovie = (req, res, next) => {
  const { title, director, year, color, duration } = req.body;
  let errors = [];
  if (typeof title !== "string" && title.length < 1) {
    errors.push("title must be a string of a least one character");
  }
  if (typeof director !== "string" && director.length < 1) {
    errors.push("director must be a string of a least one character");
  }
  if (typeof year !== "number" && year.length < 4) {
    errors.push("year must be a number with this format : YYYY");
  }
  if (typeof color !== "boolean") {
    errors.push("color must be true or false");
  }
  if (typeof duration !== "number") {
    errors.push("duration must be a number in minutes");
  }

  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

module.exports = validateMovie;
