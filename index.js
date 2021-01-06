const express = require('express');

const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//routes
const authRouth = require('./routes/auth');
dotenv.config();

//conection
//console.log(process.env.DB_CONNECT);

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err));

app.use(express.json());
app.use('/api/user', authRouth);

app.listen(3333, () => console.log('server running'));
