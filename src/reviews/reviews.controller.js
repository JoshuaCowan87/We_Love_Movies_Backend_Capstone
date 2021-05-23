const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  console.log("reviewId", reviewId)
  const review = await service.read(reviewId);
  console.log("review", review)

  if (review.length && review.length > 0) {
    res.locals.review = review[0];
    return next();
  }
    return next({
    status: 404,
    message: `Review ${reviewId} not found`,
  });
}

async function update(req, res) {
  console.log(1)
  console.log("req.body.data", req.body.data)
  
const data = await service.update(req.body.data)
console.log("data", data)
res.json({data})
}

async function destroy(req, res) {
     await service.destroy(res.locals.review.review_id)
        res.sendStatus(204)
     
}

module.exports = {
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
    update: [reviewExists, asyncErrorBoundary(update)]
    
};
