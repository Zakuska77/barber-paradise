const express = require('express');
const app = express();

const coiffeurs = require('./routes/coiffeurs');
const clients = require('./routes/clients');
const login = require('./routes/login');
const register = require('./routes/register');


app.use('/coiffeurs', coiffeurs);
app.use('/clients', clients);
app.use('/login', login);
app.use('/register', register);

app.listen(3000, () => {
   console.log('Server is running on http://localhost:3000');
});