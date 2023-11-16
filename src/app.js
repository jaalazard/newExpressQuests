const express = require('express');
const app = express();
app.use(express.json());

const cocktailHandlers = require("./handlers/cocktailsHandlers");
const userHandlers = require("./handlers/usersHandlers");
const movieHandlers = require("./handlers/moviesHandlers");

app.get("/api/cocktails", cocktailHandlers.getCocktails);
app.get("/api/cocktails/:id", cocktailHandlers.getCocktailById);
app.post("/api/cocktails", cocktailHandlers.postCocktail);

app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);
app.post("/api/users", userHandlers.postUser);

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/movies", movieHandlers.postMovie);

module.exports = app;