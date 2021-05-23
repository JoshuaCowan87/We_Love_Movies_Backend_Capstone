const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const review = await service.read(reviewId);
 
  console.log("review", review)
  if (review) {
    res.locals.review = review;
    return next();
  }
   return next({
    status: 404,
    message: `Review ${reviewId} not found`,
  });
}

async function update(req, res, next) {
const data = await service.update(req.body.data)
res.json({data})
}

async function destroy(req, res) {
     await service.destroy(res.locals.review.review_id)
        res.sendStatus(204)
     
}

module.exports = {
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)]
    
};
