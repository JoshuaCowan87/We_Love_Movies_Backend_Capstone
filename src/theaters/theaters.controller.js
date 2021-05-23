const knex = require("../db/connection")
const service = require("./theaters.service")
const reduceProperties = require("../utils/reduce-properties")

/*
async function list(req, res, next) {
const allTheaters = await service.list();
const time = new Date().toISOString();
const theatersWithTime = allTheaters.map(theater => {
   return {...theater, created_at: time, updated_at: time}
})

const reduceMovies = reduceProperties("theater_id", {
    "movie_id": ["movies", null, "movie_id"]
})
res.json({reduceMovies(theatersWithTime)})
    
}
*/



module.exports = {
   // list,

}