const express = require('express');
const router = express.Router();
const cors = require('cors');
const db = require('../configs/db');
const bodyParser = require('body-parser')
 
router.use(express.json());
router.use(cors());

router.use(bodyParser.json({ type: 'application/*+json' }))
router.post('/client', async (req, res) => {
    try {
        const { Username, Password, Email, PhoneNumber } = req.body;

        if (!Username || !Password || !Email) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const existingEmail = await db('Clients').where('Email', Email).first();
        const existingUsername = await db('Clients').where('Username', Username).first();

        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        if (existingUsername) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        await db('Clients').insert({ Username, Password, Email, PhoneNumber });


        return res.status(201).json({ message: 'Account created successfully' });
    } catch (err) {

        console.error('Error creating account:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
router.post('/coiffeur', async (req, res) => {
    try {
        const { Username, Password, Email, Location, PhoneNumber, profilePic, ShopName, ImageShop } = req.body;

  
        if (!Username || !Password || !Email) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const existingEmail = await db('Coiffeurs').where('Email', Email).first();
        const existingUsername = await db('Coiffeurs').where('Username', Username).first();

        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        if (existingUsername) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        await db('Coiffeurs').insert({ Username, Password, Email, Location, PhoneNumber, profilePic, ShopName, ImageShop });

        return res.status(201).json({ message: 'Account created successfully' });
    } catch (err) {
  
        console.error('Error creating coiffeur account:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
module.exports = router;