const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties")

const addCritic = mapProperties({
    critic_id: "critics.critic_id",
    preferred_name: "critics.preferred_name",
    surname: "critics.surname",
    organization_name: "critics.organization_name"
})

function read (reviewId) {
return knex("reviews")
    .select("*")
    .where({review_id: reviewId})
    .first()  
    
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
    .update(updatedReview)  
}


function readUpdateWithCritic (reviewId){
return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({review_id: reviewId})
    .first()
    .then(addCritic)
}


module.exports = {
    destroy,
    update,
   read,
   readUpdateWithCritic
}