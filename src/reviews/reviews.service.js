const knex = require("../db/connection");


function read (reviewId) {
return knex("reviews")
    .select("*")
    .where({review_id: reviewId})  
    
}


function destroy (reviewId) {
return knex("reviews")
    .where({"review_id": reviewId})
    .del()
}


function update (updatedReview) {
    return knex("reviews")
    .select("*")
    .where({review_id: updatedReview.review_id})
    .update({ content: updatedReview.content, score: updatedReview.score })
    //.then(updatedRecords => updatedRecords[0])
    .first()
}



module.exports = {
    read, 
    destroy,
    update
}