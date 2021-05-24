const knex = require("../db/connection")
const service = require("./theaters.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res, next) {
   const allTheaters = await service.list();
   //console.log("allTheaters", allTheaters)
   
   
   const time = new Date().toISOString();
   const theatersWithTime = allTheaters.map(theater => {
      return {...theater, created_at: time, updated_at: time}
   })
   console.log("theatersWithTime", theatersWithTime)
   
   res.json({theatersWithTime})
       
   }


module.exports = {
   list: asyncErrorBoundary(list)

}