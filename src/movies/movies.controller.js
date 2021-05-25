const service = require("./movies.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await service.read(movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  return next({
    status: 404,
    message: "Movie cannot be found.",
  });
}

function read(req, res) {
  res.json({ data: res.locals.movie });
}

async function list(req, res, next) {
  const showing = req.query.is_showing;
  const data = showing ? await service.showingList() : await service.list();
  res.json({ data });
}

async function movieByTheaters(req, res, next) {
  const { movieId } = req.params;
  const allTheaters = await service.movieByTheaters(movieId);
  const time = new Date().toISOString();
  const data = allTheaters.map((theater) => {
    return { ...theater, created_at: time, updated_at: time };
  });
  res.json({ data });
}

async function movieByReviewAndCritic(req, res, next) {
  const time = new Date().toISOString();
  const { movieId } = req.params;
  const reviews = await service.movieByReview(movieId);
  const critics = await service.listCritics();

  const data = reviews.map((review) => {
    const critic = {
      critic: critics.find((critic) => critic.critic_id === review.critic_id),
    };
    return { ...review, created_at: time, updated_at: time, ...critic };
  });

  res.json({ data });
}

module.exports = {
  list,
  read: [asyncErrorBoundary(movieExists), read],
  movieByTheaters,
  movieByReviewAndCritic,
};
