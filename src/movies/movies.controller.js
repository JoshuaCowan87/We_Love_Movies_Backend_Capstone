const service = require("./movies.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function movieExists(req, res, next) {
  const {movieId} = req.params;
  //console.log("movieId", movieId);
  const movie = await service.read(movieId);
 // console.log("movie", movie);
  if (movie) {
    res.locals.movie = movie;
     next();
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

async function movieByTheaters (req, res, next) {
  const {movieId} = req.params;
const allTheaters = await service.movieByTheaters(movieId)
const time = new Date().toISOString();
const data = allTheaters.map(theater => {
  return {...theater, created_at: time, updated_at: time}
})
res.json({data})
}


async function movieByReviewAndCritic (req, res, next) {
const time = new Date().toISOString();
const {movieId} = req.params;
const reviews = await service.movieByReview(movieId);
const critics = await service.listCritics();

const data = reviews.map(review => {
  const critic = { critic: critics.find(critic => critic.critic_id === review.critic_id)}
return {...review, created_at: time, updated_at: time, ...critic}
})

res.json({data})
}



module.exports = {
  list,
  read: [asyncErrorBoundary(movieExists), read],
  movieByTheaters,
  movieByReviewAndCritic,
}
