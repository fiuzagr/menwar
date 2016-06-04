import socketIO from 'socket.io';

// Reducers
import { combinedSimpleReducers } from 'app/reducers';
// libs
import { createApiStore } from 'lib/store';

// create store
const store = createApiStore(combinedSimpleReducers);

// debug
const debug = require('debug')(process.env.DEBUG_ROOT + ':socket');


export default (server) => {

  const io = socketIO(server);
  io.path('/ws');

  store.subscribe(
    () => io.emit('state', store.getState())
  );

  io.on('connection', (socket) => {
    debug('connected');

    socket.emit('state', store.getState());
    socket.on('action', store.dispatch.bind(store));

    // example
    socket.on('msg', (data) => {
      debug(data);
      io.emit('msg', data);
    });
  });

  io.listen(server);

  return io;
};

