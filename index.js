require('dotenv').config();
const express = require('express');
const cors = require('cors');

const sequelize = require('./Database/sqlite_database');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./Database/mongo_db');
const routes = require('./routes');

const app = express();

const PORT = process.env.PORT || 8000;

// Connect to mongo database
connectDB();

sequelize.sync({force:false}).then(() => console.log("Sqlite database is ready"));

const allowlist = ['https://enzophan.github.io', 'https://melodious-sprite-db47e2.netlify.app', 'http://localhost:3001']
const corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
};
app.use(cors(corsOptionsDelegate)); // https://expressjs.com/en/resources/middleware/cors.html

app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/index.html');
})

app.use(express.json());
app.use("/api/users", require("./routes/userRoutes"));
routes(app)
app.use(errorHandler);


app.listen(PORT, () => {
    console.log('Server is listening on Port:', PORT)
});