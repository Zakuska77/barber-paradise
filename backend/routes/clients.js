const express = require('express');
const router = express.Router();
const cors = require('cors');
const appointments = require('../service/appointments');
const service = require('../service/client_service');
const auth = require('../middleware/auth');
const db = require('../configs/db');


router.use(express.json());
router.use(cors());

router.get('/', auth.authenticateToken, async (req, res) => {
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
    const { ClientID, CoiffeurID, ServiceID, Year, Month, Day, AppointmentTime } = req.body;
    console.log(req.body);
    try {
        const appointment = await appointments.addAppointment( ClientID, CoiffeurID, ServiceID, Year, Month, Day, AppointmentTime );
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

router.post('/addFavorite/:clientId/:coiffeurId', async (req, res) => {
    try {
        const clientId = req.params.clientId;
        const coiffeurId = req.params.coiffeurId;

        const existingFavorite = await db('ListFav')
            .where({
                ClientID: clientId,
                CoiffeurID: coiffeurId
            })
            .first();

        if (existingFavorite) {
            return res.status(400).json({ message: 'Coiffeur already added as favorite' });
        }

        await db('ListFav').insert({ ClientID: clientId, CoiffeurID: coiffeurId });

        return res.status(201).json({ message: 'Coiffeur added as favorite successfully' });
    } catch (err) {
        console.error('Error adding favorite coiffeur:', err);
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
        const response = await service.getFavorite(clientId)
        return res.json(response);
    }
    catch (err) {
        console.error('Error retrieving clients:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
})

router.delete('/DeleteAppointment/:appointmentId', async (req, res) => {
    const appointmentId = req.params.appointmentId;
    try {
        const deleteAppointment = await service.deleteAppointment(appointmentId);

        return res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (err) {
        console.error('Error deleting appointment:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/piggybank/:clientId', async (req, res) => {
    const clientId = req.params.clientId;
    const { balance} =  req.body;
    try {
        await service.ajouterArgents(clientId, balance);
        return res.status(200).json({ message: 'Piggy bank updated successfully' });
    }catch (err) {
        console.error('Error updating piggy bank:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
})
module.exports = router;
