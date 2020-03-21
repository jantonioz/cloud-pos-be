module.exports = {
  errorHandler: (error, res) => {
    res.status(error.http || 400).json({ code: error.code, message: error.message })
  }
}