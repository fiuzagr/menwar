import io from 'socket.io-client';

const initSocket = (opt, store) => {
  const socket = io('', opt);

  // example
  socket.on('msg', (data) => {
    console.log(data);
  });

  // get state from socket
  socket.on('state', (state) => {
    store.dispatch({type: 'SET_STATE', state});
  });

  return socket;
};

export default initSocket;

