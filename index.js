//var http = require('http');

var debug = require('debug')(process.env.DEBUG_ROOT + ':server');


/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val, add) {
  var port = parseInt(val, 10);
  add = parseInt(add, 10) > 0 ? add : 0;

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port + add;
  }

  return false;
};


/**
 * Create server
 */
function createServer (app, ip, port) {

  /**
   * Create HTTP server.
   */
  //var server = http.createServer(app);

  /**
   * Listen on provided port, on all network interfaces.
   */
  var server = app.listen(normalizePort(port), ip);
  server.on('error', onError);
  server.on('listening', onListening);
  server.on('upgrade', onUpgrade);


  function onUpgrade (req, socket, head) {
    if (global.proxy) {
      global.proxy.ws(req, socket, head);
    }
  }

  /**
   * Event listener for HTTP server "error" event.
   */
  function onError(error, req, res) {

    if (error.syscall !== 'listen') {
      throw error;
    }

    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */
  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : addr.address + ':' + addr.port;
    debug('Listening on ' + bind);
  }


  return server;

}

exports.default = createServer;

exports.normalizePort = normalizePort;

