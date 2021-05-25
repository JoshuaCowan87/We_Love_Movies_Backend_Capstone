const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties")

const addCritic = mapProperties({
    
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
})

function read (review_id) {
return knex("reviews")
    .select("*")
    .where({review_id})
    .first()  
    
}


function destroy (reviewId) {
return knex("reviews")
    .where({"review_id": reviewId})
    .del()
}


function update (updatedReview, review_id) {
    console.log("service 1")
    return knex("reviews")
    .select("*")
    .where({review_id})
    .update(updatedReview)
    .then(updatedRecords => updatedRecords[0])
    
}


function readUpdateWithCritic (review_id){
return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({review_id})
    .first()
    .then(addCritic)
}


module.exports = {
    destroy,
    update,
   read,
   readUpdateWithCritic
}