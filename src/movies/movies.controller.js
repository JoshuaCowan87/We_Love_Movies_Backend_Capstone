const service = require("./movies.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const movieId = req.params.movieId;
  console.log("movieId", movieId);
  const movie = await service.read(movieId);
  console.log("movie", movie);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  return next({
    status: 404,
    message: `MovieId ${movieId} cannot be found`,
  });
}

function read(req, res) {
  const {  movie: data } = res.locals;
  res.json({  data: data[0] });
}

async function list(req, res, next) {
  const showing = req.query.is_showing;
  const data = showing ? await service.showingList() : await service.list();
  res.json({ data });
}

module.exports = {
  list,
  read: [asyncErrorBoundary(movieExists), read],
};
