const TodoController = require('../Controllers/TodoController');
const validateToken = require("../middleware/validateTokenHandler");

const NODE_ENV = process.env.NODE_ENV || 'dev';
const JWT_SECRET = process.env.JWT_SECRET;
const URL_MONGO_DB = process.env.URL_MONGO_DB;

const routes = (app) => {
    app.use('/api/config', (req, res) => {
        return res.send(`Hello!, ${JWT_SECRET}, ${NODE_ENV}, ${NODE_ENV == 'dev' ? URL_MONGO_DB : 'Private'}`)
    });
    app.use('/api/v1/todos', validateToken, TodoController)
}

module.exports = routes