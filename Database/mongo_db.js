require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const db = process.env.NODE_ENV == 'PROD' ? process.env.URL_MONGO_DB : process.env.URL_MONGO_DB_TEST;
        console.log("DB : ", db);

        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB Connected ...");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;

