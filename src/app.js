const express = require('express');
const app = express();
app.use(express.json());

const cocktailHandlers = require("./handlers/cocktailsHandlers");
const userHandlers = require("./handlers/usersHandlers");
const movieHandlers = require("./handlers/moviesHandlers");
const validateMovie = require("./middlewares/validateMovie");
const validateUser = require("./middlewares/validateUser");
const validateCocktail = require("./middlewares/validateCocktail");
const { hashPassword } = require("./auth");


const step1 = (req, res, next) => {
    req.message = "etape 1";
    next();
}
const step2 = (req, res, next) => {
    req.message += " et etape 2";
    next();
}

const finalStep = (req, res) => {
    res.send(req.message);
}

app.get("/", step1, step2, finalStep);

app.get("/api/cocktails", cocktailHandlers.getCocktails);
app.get("/api/cocktails/:id", cocktailHandlers.getCocktailById);
app.post("/api/cocktails", validateCocktail, cocktailHandlers.postCocktail);
app.put("/api/cocktails/:id", validateCocktail, cocktailHandlers.putCocktail);
app.delete("/api/cocktails/:id", cocktailHandlers.deleteCocktail);

app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);
app.post("/api/users", validateUser, hashPassword, userHandlers.postUser);
app.put("/api/users/:id", validateUser, hashPassword, userHandlers.putUser);
app.delete("/api/users/:id", userHandlers.deleteUser);

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/movies", validateMovie, movieHandlers.postMovie);
app.put("/api/movies/:id", validateMovie, movieHandlers.putMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);

module.exports = app;