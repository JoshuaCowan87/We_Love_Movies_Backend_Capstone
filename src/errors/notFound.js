

function notFound (req, res, next) {
    next ({status: 404, message: `Route Not Found: ${req.originalUrl}`})

}

module.exports = notFound;

