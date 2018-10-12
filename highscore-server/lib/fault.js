
module.exports = (options) => {
  if (options) {

  }

  return (err, req, res, next) => {
    if (err) {
      if (res.headersSent) {
        return next(err)
      }
      var inner = err.results.errors[0];
      var fault = {
        message: inner.message,
        code: inner.code,
        error: err
      }
      res.send( fault );
    } else {
      next();
    }
  }
}
