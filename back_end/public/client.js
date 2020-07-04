// Establish a Socket.io connection
const socket = io();
// Initialize our Feathers client application through Socket.io
// with hooks and authentication.
const client = feathers();
client.configure(feathers.socketio(socket));

// Use localStorage to store our login token
client.configure(feathers.authentication({
  storage: window.localStorage
}));

const login = async () => {
  try {
    // First try to log in with an existing JWT
    return await client.reAuthenticate();
  } catch (error) {
    console.error(error);
  }
};

const main = async () => {
  const auth = await login();

  console.log('User is authenticated', auth);

  const users = await client.service('users').find();
  console.log(users);

  // Log us out again
  // await client.logout();
};

main();
