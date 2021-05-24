const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function reviewExists(req, res, next) {
  const  reviewId  = req.params.reviewId;
  const review = await service.getReviewById(reviewId);
  
  if (review.length && review.length > 0) {
    res.locals.review = review[0];
    return next();
  }
     next({
    status: 404,
    message: `Review ${reviewId} not found`,
  });
}

async function update(req, res) {
  const {reviewId} = req.params
const data = await service.update(reviewId, req.body.data)
console.log("data", data)
//const data = await service.updatedRecord(reviewId)
res.json({data: data})
}

async function destroy(req, res) {
     await service.destroy(res.locals.review.review_id)
        res.sendStatus(204)
     
}

module.exports = {
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
    update: [reviewExists, asyncErrorBoundary(update)]
    
};
