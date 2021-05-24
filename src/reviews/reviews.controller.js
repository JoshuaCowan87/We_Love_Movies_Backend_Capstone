const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
  const reviewId = req.params.reviewId;
  const review = await service.read(reviewId);
console.log("review", review)
  if (review) {
    res.locals.review = review;
   // console.log("res.locals.review", res.locals.review)
    return next();
  }
  next({
    status: 404,
    message: `Review ${reviewId} not found`,
  });
}

async function update(req, res) {
  console.log(1)
  await service.update(req.body.data);
  console.log(2)
  const data = await service.readUpdateWithCritic(req.body.data);
  console.log("data", data);
  res.json({ data: data });
}

async function destroy(req, res) {
  await service.destroy(res.locals.review.review_id);
  res.sendStatus(204);
}

module.exports = {
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  update: [reviewExists, asyncErrorBoundary(update)],
};
