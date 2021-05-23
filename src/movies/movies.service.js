const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function list() {
  return knex("movies").select("*");
}

function showingList() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .distinct("m.*")
    .where({ "mt.is_showing": true });
}

function read(movieId = 0) {
  return knex("movies").select("*").where({ movie_id: movieId });
}

function movieByTheaters(movieId) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("t.*", "mt.is_showing", "mt.movie_id")
    .where({ "mt.movie_id": movieId });
}
/*
function addCritic(reviews) {
    return reviews.map((review) => {
      return {
        review_id: review.review_id,
        content: review.content,
        score: review.score,
        created_at: review.created_at,
        updated_at: review.updated_at,
        critic_id: review.critic_id,
        movie_id: review.movie_id,
        critic: {
          critic_id: review.critic_id,
          preferred_name: review.preferred_name,
          surname: review.surname,
          organization_name: review.organization_name,
          created_at: review.critic_created_at,
          updated_at: review.critic_updated_at,
        },
      };
    });
  }
*/
function listCritics () {
    return knex("critics")
    .select("*")
}

function movieByReview(movieId) {
    return knex("reviews as r")
      .join("movies as m", "r.movie_id", "m.movie_id")
      .select("r.*")
      .where({ "r.movie_id": movieId });
  }
/* 
function movieByReview(movieId) {
  const time = new Date().toISOString();
  return knex("reviews")
      .select("r.*")
      .where({ "movie_id": movieId })
      //.first()
*/
/*
  const addCategory = mapProperties({
    critic_id: "c.critic_id",
    preferred_name: "c.preferred_name",
    surname: "c.surname",
    organization_name: "c.organization_name",
    created_at: time,
    updated_at: time,
  });
*/

/*
  return knex("reviews as r")
      .join("critics as c", "c.critic_id", "r.critic_id")
      .select(
        "r.*",
        "c.*",
      )
      .where({ "r.movie_id": movieId })
      //.first()
      
  */


module.exports = {
  list,
  showingList,
  read,
  movieByTheaters,
  movieByReview,
  listCritics
};
