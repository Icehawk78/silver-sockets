const io = require('socket.io-client');
const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');
const auth = require('@feathersjs/authentication-client');

const socket = io(process.env.REACT_APP_BACK_END_URL);
const client = feathers();

client.configure(socketio(socket));
client.configure(
  auth({
    storage: window.localStorage,
  })
);

export default client;
