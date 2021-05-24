const knex = require("../db/connection");


function getReviewById (review_id) {
return knex("reviews")
    .select("*")
    .where({review_id})  
    
}


function destroy (reviewId) {
return knex("reviews")
    .where({"review_id": reviewId})
    .del()
}


function update (reviewId, updatedReview) {
    return knex("reviews")
    .select("*")
    .where({review_id: reviewId})
    .update(updatedReview, "*")
    //.then(updatedRecords => updatedRecords[0])    
}

/*
function updatedRecord(reviewId) {
    return knex("reviews as r")
      .join("critics as c", "r.critic_id", "c.critic_id")
      .select("*")
      .where({ review_id: reviewId })
      .first()
      .then((result) => {
        const updatedRecord = addCritic(result);
        updatedRecord.critic_id = updatedRecord.critic.critic_id;
        return updatedRecord;
      });
  }
*/


module.exports = {
    getReviewById, 
    destroy,
    update,
    //updatedRecord,
}