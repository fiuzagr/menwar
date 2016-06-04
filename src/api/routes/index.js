
//const debug = require('debug')(process.env.DEBUG_ROOT + ':routes');


export default (app) => {

  /**
   * Api
   */
  app.use((req, res) => {
    res.json({
      message: 'OK',
    });
  });


  /**
   * Error handling
   */

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: process.env.NODE_ENV === 'production' ? {} : err,
    });
  });

};

