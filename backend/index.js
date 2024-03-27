const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // For password hashing
const db = require("./db");

const app = express();
app.use(express.json());
app.use(cors());

const secretKey = 'your-secret-key';

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Fetch user data from the database based on email
        const userData = await db('Clients').where('Email', email).first();
        if (!userData) {
            return res.status(401).json({ message: 'Invalid email' });
        }

        // Compare the password provided with the hashed password stored in the database
        const passwordMatch = password == userData.Password;
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // If credentials are valid, generate a JWT token and send the user's name along with it
        const token = jwt.sign({ email: userData.Email, userId: userData.ClientID, name: userData.Username }, secretKey);
        console.log('Response:', { token, name: userData.Username, clientId: userData.ClientID }); // Log the response including ClientID
        return res.json({ token, name: userData.Username, clientId: userData.ClientID });
        
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Simple GET route for /login
app.get('/login', (req, res) => {
    res.send('Welcome to the login page');
});


// Protected routes, require authentication token
app.get('/', (req, res) => {
    return res.json("From Backend side");
});

app.get('/Clients', async (req, res) => {
    try {
        const clients = await db('Clients').select('*');
        res.json(clients);
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


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
}

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
