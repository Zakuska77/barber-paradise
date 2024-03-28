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
    console.log(req.body)
    try {
        // Fetch user data from the clients table based on email
        const clientData = await db('Clients').where('Email', email).first();
        // Fetch user data from the coiffeurs table based on email
        const coiffeurData = await db('Coiffeurs').where('Email', email).first();

        if (!clientData && !coiffeurData) {
            return res.status(401).json({ message: 'Invalid email' });
        }

        let userData, userId;
        if (clientData) {
            userData = clientData;
            userId = userData.ClientID;
        } else {
            userData = coiffeurData;
            userId = userData.CoiffeurID;
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = password == userData.Password;
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Determine user type
        const userType = clientData ? 'client' : 'coiffeur';

        // If credentials are valid, generate a JWT token
        const token = jwt.sign({ email: userData.Email, userId }, secretKey);
        return res.json({ token, userType, userId });
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


// Add a route to fetch coiffeur details by ID
app.get('/CoiffeurDetails/:id', async (req, res) => {
    const coiffeurId = req.params.id;
    try {
        // Fetch coiffeur details from the database based on the provided ID
        const coiffeurData = await db('Coiffeurs').where('CoiffeurID', coiffeurId).first();
        
        // Check if coiffeur data exists
        if (!coiffeurData) {
            return res.status(404).json({ message: 'Coiffeur not found' });
        }
        
        // If coiffeur data exists, return it as JSON response
        return res.json(coiffeurData);
    } catch (err) {
        // Handle any errors that occur during the process
        console.error('Error retrieving coiffeur details:', err);
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
        return res.json(clients);
    } catch (err) {
        console.error('Error retrieving clients:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


//Coiffeurs
app.get('/Coiffeurs', async (req, res) => {
    try {
        const clients = await db('Coiffeurs').select('*');
        return res.json(clients);
    } catch (err) {
        console.error('Error retrieving clients:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

//Appointment
app.get('/Appointment', async (req, res) => {
    try {
        const clients = await db('Appointment').select('*');
        return res.json(clients);
    } catch (err) {
        console.error('Error retrieving clients:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

//CoiffeurReviews
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
