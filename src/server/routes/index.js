/**
 * Module dependencies.
 */
//import fs from 'fs';
//import path from 'path';
import csrf from 'csurf';
//import cors from 'cors';


//const debug = require('debug')(process.env.DEBUG_ROOT + ':routes');


/**
 * Load Controllers
 */
import {
  App,
  Institutional,
} from '../controllers';


/**
 * Expose
 */
export default (app, passport) => {

  // use cors in middleware routes or
  // to enable all cors request, uncomment below
  //app.use(cors());


  // routes without csrf, should be declared before
  //app.use('/notificacao', notification);


  // adds CSRF support
  if (process.env.NODE_ENV !== 'test') {
    app.use(csrf());

    // This could be moved to view-helpers :-)
    app.use((req, res, next) => {
      res.locals.csrfToken = req.csrfToken();
      next();
    });
  }


  /**
   * Serve app
   */
  app.use('/app*', App.index);
  app.use(Institutional.index);


  /**
   * Error handling
   */

  // // catch 404 and forward to error handler
  // app.use(function(req, res, next) {
  //   var err = new Error('Not Found');
  //   err.status = 404;
  //   next(err);
  // });

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: process.env.NODE_ENV === 'production' ? {} : err,
    });
  });


};

