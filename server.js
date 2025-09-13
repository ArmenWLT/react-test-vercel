// // server.js
// import { create, router as _router, defaults } from 'json-server';
// const server = create();
// const router = _router('db.json'); // Your data file
// const middlewares = defaults();

// server.use(middlewares);
// server.use(router);

// server.listen(process.env.PORT || 3001, () => {
//   console.log('JSON Server is running!');
// });


const jsonServer = require('json-server');
const auth = require('json-server-auth');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.db = router.db;

server.use(middlewares);
server.use(auth);
server.use(router);
server.listen(process.env.PORT || 3001, () => {
    console.log('JSON Server is running');
});