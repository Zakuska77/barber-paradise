const express = require('express');
const router = express.Router();
const cors = require('cors');
const service = require('../service/coiffeur_service')
const db = require('../configs/db')
router.use(express.json());
router.use(cors());

router.get('/', async (req, res) => {
    try {
        const coiffeurs = await service.getCoiffeurs(); 
        return res.json(coiffeurs); 
    } catch (err) {
        console.error('Error retrieving coiffeurs:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/:id', async (req, res) => {
    const coiffeurId = req.params.id;
    try {
        const coiffeur = await service.getCoiffeurById(coiffeurId);
        return res.json(coiffeur);
    }
    catch (err) {
        console.error('Error retrieving coiffeur:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
})
router.get('/appointments/:id', async (req, res) => {
    const coiffeurId = req.params.id;
    try {
        const coiffeurAppointments = await service.getCoiffeursAppointments(coiffeurId);
        return res.json(coiffeurAppointments);
    } catch (err) {
        console.error('Error retrieving coiffeur appointments:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
})

router.get('/reviews/:id', async (req, res) => {
    const coiffeurId = req.params.id;
    try {
        const coiffeurReviews = await service.getCoiffeurReviews(coiffeurId);
        return res.json(coiffeurReviews);
    }
    catch {
        console.error('Error retrieving coiffeur reviews:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
})
router.post('/reviews/:id', async (req, res) => {
    const coiffeurId = req.params.id;
    const { ClientID, Rating, ReviewText } = req.body;
    try {
        await service.createCoiffeurReview(ClientID, coiffeurId, Rating, ReviewText);
        return res.status(200).json({ message: 'Review added successfully' });
    }
    catch (err) {
        console.error('Error adding review:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
})
router.delete('/reviews/:id', async (req, res) => {
    const reviewId = req.params.id;
    try {
        await service.deleteCoiffeurReviews(reviewId);
        return res.status(200).json({ message: 'Review deleted successfully' });
    }
    catch (err) {
        console.error('Error deleting review:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
})
router.post('/services/:id', async (req, res) => {
    const { ServiceName, Description, Price } = req.body;
    const CoiffeurID = req.params.id;
    try {
        await service.addService(CoiffeurID, ServiceName, Description, Price);
        return res.status(200).json({ message: 'Service added successfully' });
    }
    catch (err) {
        console.error('Error adding service:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
router.delete('/services/:serviceId', async (req, res) => {
    const { serviceId } = req.params;
    try {
        await service.deleteService(serviceId);
        return res.status(200).json({ message: 'Service deleted successfully' });
    }
    catch (err) {
        console.error('Error deleting service:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/services/:id', async (req, res) => {
    const coiffeurID = req.params.id;
    // console.log(coiffeurID);
    try {
        const services = await service.getServices(coiffeurID);
        return res.json(services);
    }
    catch (err) {
        console.error('Error retrieving services:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/availability/:id/:day', async (req, res) => {
    const coiffeurID = req.params.id;
    const dayOfWeek = req.params.day;
    try {
      const avalibility = await service.getAvailability(coiffeurID,dayOfWeek);
      return res.json(avalibility);
    } catch (err) {
        console.error('Error retrieving coiffeur availability:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
router.patch('/availability', async (req, res) => {
    try {
        const { CoiffeurID, Availability } = req.body;

        // Validate the presence of required fields
        if (!CoiffeurID || !Availability) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Delete previous availability entries for the specified coiffeur ID
        await db('CoiffeurAvailability').where('CoiffeurID', CoiffeurID).del();

        // Insert new availability entries for the specified coiffeur ID
        await Promise.all(Availability.map(async (availability) => {
            await db('CoiffeurAvailability').insert({
                CoiffeurID,
                DayOfWeek: availability.DayOfWeek,
                StartTime: availability.StartTime,
                EndTime: availability.EndTime
            });
        }));

        // Respond with success message
        return res.status(200).json({ message: 'Coiffeur availability modified successfully' });
    } catch (err) {
        // Handle any errors that occur during the process
        console.error('Error modifying coiffeur availability:', err);
        return res.status(500).json({ error: 'Internal server error', message: err.message });
    }
});
router.get('/schedule/:id', async (req, res) => {
    const coiffeurID = req.params.id;

    try {
        const schedule = await service.getSchedule(coiffeurID);
        return res.json(schedule);
    }
    catch (err) {
        console.error('Error retrieving schedule:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
})


module.exports = router;