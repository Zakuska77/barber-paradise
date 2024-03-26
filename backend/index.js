const express = require('express');
const cors = require('cors');
const knex = require('knex');
const db = require("./db");

const app = express();
app.use(express.json());
app.use(cors());

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM CLIENTS WHERE username = ? AND password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data)=>{
        if(err) return res.json("Login Failed");
        if(data.length > 0){
            return res.json("login successfully")
        } else{
            return res.json("no record")
        }
    })

});


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

app.get('/Coiffeurs', async (req, res) => {
    try {
        const clients = await db('Coiffeurs').select('*');
        return res.json(clients);
    } catch (err) {
        console.error('Error retrieving clients:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/ClientProfiles', async (req, res) => {
    try {
        const clients = await db('ClientProfiles').select('*');
        return res.json(clients);
    } catch (err) {
        console.error('Error retrieving clients:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/Appointments', async (req, res) => {
    try {
        const clients = await db('Appointments').select('*');
        return res.json(clients);
    } catch (err) {
        console.error('Error retrieving clients:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/CoiffeurReviews', async (req, res) => {
    try {
        const clients = await db('CoiffeurReviews').select('*');
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
