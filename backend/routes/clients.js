const express = require('express');
const router = express.Router();
const cors = require('cors');
const appointments = require('../service/appointments');
const service = require('../service/client_service');
const auth = require('../middleware/auth');


router.use(express.json());
router.use(cors());

router.get('/', auth.authenticateToken,async (req, res) => {
    try {
        const clients = await service.getClients();
        return res.json(clients);
    } catch (err) {
        console.error('Error retrieving clients:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:id', async (req, res) => {
    clientId = req.params.id;
    try {
        const client = await service.getClientsByID(clientId);
        return res.json(client);
    }
    catch (err) {
        console.error('Error retrieving clients:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
})
router.get('/appointments/:id', async (req, res) => {
    const clientId = req.params.id;
    try {
        const appointments = await service.getClientsAppointment(clientId);
        return res.json(appointments);
    }
    catch (err) {
        console.error('Error retrieving clients:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
})
router.post('/appointments', async (req, res) => {
    const {coiffeurId, ClientID, ServiceID, Year, Month, Day, AppointmentTime} = req.body;
    console.log(req.body);
    try {
        const appointment = await appointments.addAppointment(coiffeurId, ClientID, ServiceID, Year, Month, Day, AppointmentTime);
        return res.json(appointment);
    }
    catch (err) {
        console.error('Error retrieving clients:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
})
router.post('/favorites/:clientId/:coiffeurId', async (req, res) => {
    const clientId = req.params.clientId;
    const coiffeurId = req.params.coiffeurId;
    try {
        const existingFavorite = await service.getFavorite(clientId)
        if (existingFavorite) {
            return res.status(400).json({ message: 'Coiffeur already added as favorite' });
        }
        const favorite = await service.addFavorite(clientId, coiffeurId);
        return res.json(favorite);
    }
    catch (err) {
        console.error('Error retrieving clients:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/favorites/:id', async (req, res) => {
    const clientId = req.params.id;
    try {
        const favorite = await service.getFavorite(clientId);
        return res.json(favorite);
    }
    catch (err) {
        console.error('Error retrieving clients:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
})
router.delete('/favorites/:clientId/:coiffeurId', async (req, res) => {
    const clientId = req.params.clientId;
    const coiffeurId = req.params.coiffeurId;
    try {
        const favorite = await service.deleteFavorite(clientId, coiffeurId);
        return res.json(favorite);
    }
    catch (err) {
        console.error('Error retrieving clients:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
})
module.exports = router;
