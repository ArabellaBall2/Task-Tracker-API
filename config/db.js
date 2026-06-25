const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;
const DATABASE_NAME = process.env.DATABASE_NAME || 'tasktracker';

mongoose.connect(mongoURI, {
    dbName: DATABASE_NAME
}).then(
    () => {
        console.log('Connected to database');
    }
).catch((err) => {
    console.log('Error connecting to database ' + err);
})