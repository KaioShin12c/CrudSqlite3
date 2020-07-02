// import other routes
const userRoutes = require('./users');

const appRouter = (app, sqlite3) => {

    // default route
    app.get('/', (req, res) => {
        res.render('index');
    });
    // // other routes
    userRoutes(app, sqlite3);

};

module.exports = appRouter;