const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("we're connected!");
});

const exercisesRouter = require('./routes/exercises');
const usersRoutes = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRoutes);

app.listen(port, () => {
    console.log('Server is running on PORT: ' + port);
})

