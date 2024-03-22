const express = require('express');
const cors = require('cors');
const knex = require('knex');
const db = require("./db");

const app = express();
app.use(cors());


app.get('/', (req, res) => {
    return res.json("From Backend side");
});

app.get('/Clients', async (req, res) => {
    try {
        const clients = await db('Clients').select('*');
        return res.json(clients);
    } catch (err) {
        console.error('Error retrieving clients:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
