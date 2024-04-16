const express = require('express');
const router = express.Router();
const db = require('../configs/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // For password hashing

const secretKey = 'your-secret-key';

router.use(express.json());
router.post('/', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    try {

        const clientData = await db('Clients').where('Email', email).first();
  
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

        const passwordMatch = password == userData.Password;
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const userType = clientData ? 'client' : 'coiffeur';

        const token = jwt.sign({ email: userData.Email, userId }, secretKey);
        return res.json({ token, userType, userId });
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
module.exports = router;