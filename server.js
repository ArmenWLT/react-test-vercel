    // server.js
    const jsonServer = require('json-server');
    const server = jsonServer.create();
    const router = jsonServer.router('db.json'); // Your data file
    const middlewares = jsonServer.defaults();

    server.use(middlewares);
    server.use(router);

    server.listen(process.env.PORT || 3001, () => {
      console.log('JSON Server is running!');
    });