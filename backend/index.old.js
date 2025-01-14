const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // For password hashing
const db = require("./configs/db");

const app = express();
app.use(express.json());
app.use(cors());

const secretKey = 'your-secret-key';

// Login route
// ! /login
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
// ! coiffeur/:id
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

//----------------------------------------------------------------------------------
//Client Details
// ! clients/:id
app.get('/clientDetails/:id', async (req, res) => {
    const clientId = req.params.id;
    try {
        // Fetch client details from the database based on the provided ID
        const clientData = await db('Clients').where('ClientID', clientId).first();

        // Check if client data exists
        if (!clientData) {
            return res.status(404).json({ message: 'Client not found' });
        }

        // If client data exists, return it as JSON response
        return res.json(clientData);
    } catch (err) {
        // Handle any errors that occur during the process
        console.error('Error retrieving client details:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});



//Create Appointments
// ! clients/appointments
app.post('/AddAppointment/:id', async (req, res) => {
    try {
        const coiffeurId = req.params.id; // Extract CoiffeurID from URL parameter

        // Extract appointment details from the request body
        const { ClientID, ServiceID, Year, Month, Day, AppointmentTime } = req.body;

        // Validate the presence of required fields
        if (!ClientID || !ServiceID || !Year || !Month || !Day || !AppointmentTime) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check if the appointment has already been booked
        const existingAppointment = await db('Appointment')
            .where({
                CoiffeurID: coiffeurId,
                Year,
                Month,
                Day,
                AppointmentTime
            })
            .first();

        if (existingAppointment) {
            return res.status(400).json({ message: 'This appointment has already been booked' });
        }

        // Calculate the day of the week for the appointment
        const appointmentDate = new Date(`${Year}-${Month}-${Day}`);
        const appointmentDayOfWeek = appointmentDate.getDay(); // Sunday is 0, Monday is 1, etc.

        // Fetch coiffeur availability from the database based on coiffeurID and dayOfWeek
        const availability = await db('CoiffeurAvailability')
            .where('CoiffeurID', coiffeurId)
            .andWhere('DayOfWeek', appointmentDayOfWeek + 1) // Adding 1 because in JavaScript, Sunday is 0, but in SQL, Sunday is 1
            .first();

        // Check if availability exists for the coiffeur on the specified day of the week
        if (!availability) {
            return res.status(400).json({ message: 'Coiffeur is not available on the specified day' });
        }

        const { StartTime, EndTime } = availability;

        // Extract the start and end hours from the availability object
        const startHours = StartTime;
        const endHours = EndTime;

        // Check if the appointment time falls within the available time range
        if (AppointmentTime < startHours || AppointmentTime > endHours) {
            console.log('Appointment time is not within the available time range');
            return res.status(400).json({ message: 'Coiffeur is not available at the specified time' });
        }

        // Insert appointment details into the Appointment table
        await db('Appointment').insert({
            ClientID,
            CoiffeurID: coiffeurId, // Assign CoiffeurID from URL parameter
            ServiceID,
            Year,
            Month,
            Day,
            AppointmentTime
        });

        // Respond with success message
        return res.status(201).json({ message: 'Appointment added successfully' });
    } catch (err) {
        // Handle any errors that occur during the process
        console.error('Error adding appointment:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// ! /register/client
//Create Account client
app.post('/CreateClientAccount', async (req, res) => {
    try {
        const { Username, Password, Email, PhoneNumber } = req.body;

        // Validate the presence of required fields
        if (!Username || !Password || !Email) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check if the email or username is already taken
        const existingEmail = await db('Clients').where('Email', Email).first();
        const existingUsername = await db('Clients').where('Username', Username).first();

        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        if (existingUsername) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Insert the new client account into the Clients table
        await db('Clients').insert({ Username, Password, Email, PhoneNumber });

        // Respond with success message
        return res.status(201).json({ message: 'Account created successfully' });
    } catch (err) {
        // Handle any errors that occur during the process
        console.error('Error creating account:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


// ! /register/coiffeur
//Create Account Coiffeur
app.post('/CreateCoiffeurAccount', async (req, res) => {
    try {
        const { Username, Password, Email, Location, PhoneNumber, profilePic, ShopName, ImageShop } = req.body;

        // Validate the presence of required fields
        if (!Username || !Password || !Email) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check if the email or username is already taken
        const existingEmail = await db('Coiffeurs').where('Email', Email).first();
        const existingUsername = await db('Coiffeurs').where('Username', Username).first();

        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        if (existingUsername) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Insert the new coiffeur account into the Coiffeurs table
        await db('Coiffeurs').insert({ Username, Password, Email, Location, PhoneNumber, profilePic, ShopName, ImageShop });

        // Respond with success message
        return res.status(201).json({ message: 'Account created successfully' });
    } catch (err) {
        // Handle any errors that occur during the process
        console.error('Error creating coiffeur account:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// ! need some thinking about it * its delet.appointement in new 
//Deny appointment, returns 0
app.post('/DenyAppointment/:coiffeurId/:appointmentId', async (req, res) => {
    try {
        const { coiffeurId, appointmentId } = req.params;

        // Update the appointment status to denied (isAvailable = 0)
        await db('Appointment')
            .where({
                CoiffeurID: coiffeurId,
                AppointmentID: appointmentId
            })
            .update({ isAvailable: 0 });

        return res.status(200).json({ message: 'Appointment denied successfully' });
    } catch (err) {
        console.error('Error denying appointment:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// ! need some thinking about it * decided not to do it in the new
//Accept Appointment, returns 1
app.post('/AcceptAppointment/:coiffeurId/:appointmentId', async (req, res) => {
    try {
        const { coiffeurId, appointmentId } = req.params;

        // Update the appointment status to accepted (isAvailable = 1)
        await db('Appointment')
            .where({
                CoiffeurID: coiffeurId,
                AppointmentID: appointmentId
            })
            .update({ isAvailable: 1 });

        return res.status(200).json({ message: 'Appointment accepted successfully' });
    } catch (err) {
        console.error('Error accepting appointment:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


//Add favorite
// ! /client/favorite
app.post('/addFavorite/:clientId/:coiffeurId', async (req, res) => {
    try {
        const clientId = req.params.clientId;
        const coiffeurId = req.params.coiffeurId;

        // Check if the combination of ClientID and CoiffeurID already exists in the ListFav table
        const existingFavorite = await db('ListFav')
            .where({
                ClientID: clientId,
                CoiffeurID: coiffeurId
            })
            .first();

        if (existingFavorite) {
            return res.status(400).json({ message: 'Coiffeur already added as favorite' });
        }

        // Insert the new favorite coiffeur into the ListFav table
        await db('ListFav').insert({ ClientID: clientId, CoiffeurID: coiffeurId });

        // Respond with success message
        return res.status(201).json({ message: 'Coiffeur added as favorite successfully' });
    } catch (err) {
        // Handle any errors that occur during the process
        console.error('Error adding favorite coiffeur:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


//Remove Favorite
// ! /client/favorite
// todo make it app.delete because why post 
app.post('/removeFavorite/:clientId/:coiffeurId', async (req, res) => {
    try {
        const clientId = req.params.clientId;
        const coiffeurId = req.params.coiffeurId;

        // Check if the combination of ClientID and CoiffeurID exists in the ListFav table
        const existingFavorite = await db('ListFav')
            .where({
                ClientID: clientId,
                CoiffeurID: coiffeurId
            })
            .first();

        if (!existingFavorite) {
            return res.status(400).json({ message: 'Coiffeur is not in favorites' });
        }

        // Remove the coiffeur from favorites in the ListFav table
        await db('ListFav')
            .where({
                ClientID: clientId,
                CoiffeurID: coiffeurId
            })
            .del();

        // Respond with success message
        return res.status(200).json({ message: 'Coiffeur removed from favorites successfully' });
    } catch (err) {
        // Handle any errors that occur during the process
        console.error('Error removing favorite coiffeur:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


//Get Liste Favorite Coiffeurs
// ! /clients/favorites/:id
app.get('/favoriteCoiffeurs/:clientId', async (req, res) => {
    try {
        const clientId = req.params.clientId;

        // Fetch favorite coiffeurs for the specified client from the ListFav table
        const favoriteCoiffeurs = await db('ListFav')
            .join('Coiffeurs', 'ListFav.CoiffeurID', '=', 'Coiffeurs.CoiffeurID')
            .where('ListFav.ClientID', clientId)
            .select('Coiffeurs.*');

        // Respond with the list of favorite coiffeurs
        return res.json(favoriteCoiffeurs);
    } catch (err) {
        // Handle any errors that occur during the process
        console.error('Error fetching favorite coiffeurs:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


//View Coiffeur Appointment History
// ! /coiffeur/appointments
app.get('/coiffeurAppointments/:coiffeurId', async (req, res) => {
    try {
        const coiffeurId = req.params.coiffeurId;

        // Fetch appointments for the specified coiffeur from the Appointment table
        const coiffeurAppointments = await db('Appointment')
            .where('CoiffeurID', coiffeurId)
            .select('*');

        // Respond with the list of appointments for the coiffeur
        return res.json(coiffeurAppointments);
    } catch (err) {
        // Handle any errors that occur during the process
        console.error('Error fetching coiffeur appointments:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


//View Client Appointment History
// ! /client/appointment
app.get('/clientAppointments/:clientId', async (req, res) => {
    try {
        const clientId = req.params.clientId;

        // Fetch appointments for the specified client from the Appointment table
        const clientAppointments = await db('Appointment')
            .where('ClientID', clientId)
            .select('*');

        // Respond with the list of appointments for the client
        return res.json(clientAppointments);
    } catch (err) {
        // Handle any errors that occur during the process
        console.error('Error fetching client appointments:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


//CreateReview
//! coiffeurs/review
app.post('/CreateReview', async (req, res) => {
    try {
        const { ClientID, CoiffeurID, Rating, ReviewText } = req.body;

        // Validate the presence of required fields
        if (!ClientID || !CoiffeurID || !Rating || !ReviewText) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Insert the review into the CoiffeurReviews table
        await db('CoiffeurReviews').insert({
            ClientID,
            CoiffeurID,
            Rating,
            ReviewText
        });

        // Respond with success message
        return res.status(201).json({ message: 'Review posted successfully' });
    } catch (err) {
        // Handle any errors that occur during the process
        console.error('Error posting review:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


//delete Review
// ! /coiffeur/review
app.delete('/deleteReview/:reviewId', async (req, res) => {
    try {
        const reviewId = req.params.reviewId;

        // Check if the review exists
        const existingReview = await db('CoiffeurReviews').where('ReviewID', reviewId).first();
        if (!existingReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Delete the review
        await db('CoiffeurReviews').where('ReviewID', reviewId).del();

        // Respond with success message
        return res.status(200).json({ message: 'Review deleted successfully' });
    } catch (err) {
        // Handle any errors that occur during the process
        console.error('Error deleting review:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


//Get Review by coiffeur ID
// ! coiffeur/review
app.get('/coiffeurReviews/:coiffeurId', async (req, res) => {
    try {
        const coiffeurId = req.params.coiffeurId;

        // Fetch reviews for the specified coiffeur from the CoiffeurReviews table
        const reviews = await db('CoiffeurReviews')
            .where('CoiffeurID', coiffeurId)
            .select('*');

        // Respond with the list of reviews
        return res.json(reviews);
    } catch (err) {
        // Handle any errors that occur during the process
        console.error('Error fetching coiffeur reviews:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});



//Add service
// ! /coiffeurs/sevicess
app.post('/addservice/:coiffeurId', async (req, res) => {
    try {
        const coiffeurId = req.params.coiffeurId; // Extract CoiffeurID from URL parameter

        // Extract service details from the request body
        const { ServiceName, Description, Price } = req.body;

        // Validate the presence of required fields
        if (!ServiceName || !Price) {
            return res.status(400).json({ message: 'Service name and price are required' });
        }

        // Insert the service into the CoiffeurServices table
        await db('CoiffeurServices').insert({
            CoiffeurID: coiffeurId,
            ServiceName,
            Description,
            Price
        });

        // Respond with success message
        return res.status(201).json({ message: 'Service added successfully' });
    } catch (err) {
        // Handle any errors that occur during the process
        console.error('Error adding service:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// ! /coiffeurs/services
// ? Specify the http request method
//Remove Service
app.delete('/removeService/:coiffeurId/:serviceId', async (req, res) => {
    try {
        const { coiffeurId, serviceId } = req.params;

        // Check if the service exists
        const existingService = await db('CoiffeurServices')
            .where({
                CoiffeurID: coiffeurId,
                ServiceID: serviceId
            })
            .first();
        if (!existingService) {
            return res.status(404).json({ message: 'Service not found' });
        }

        // Delete the service
        await db('CoiffeurServices')
            .where({
                CoiffeurID: coiffeurId,
                ServiceID: serviceId
            })
            .del();

        // Respond with success message
        return res.status(200).json({ message: 'Service deleted successfully' });
    } catch (err) {
        // Handle any errors that occur during the process
        console.error('Error deleting service:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


//Add Picture
// ! /coiffeur/remove-picture is not included in the new because not important
app.post('/addPicture/:coiffeurId', async (req, res) => {
    try {
        const coiffeurId = req.params.coiffeurId; // Extract CoiffeurID from URL parameter
        const { pictureLink } = req.body; // Extract picture link from request body

        // Validate the presence of the picture link
        if (!pictureLink) {
            return res.status(400).json({ message: 'Missing picture link' });
        }

        // Insert the picture link into the CoiffeurPictures table
        await db('CoiffeurPictures').insert({
            CoiffeurID: coiffeurId,
            Picture: pictureLink
        });

        // Respond with success message
        return res.status(201).json({ message: 'Picture link added successfully' });
    } catch (err) {
        // Handle any errors that occur during the process
        console.error('Error adding picture link:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// ! coiffeur/remove-picture is not included in the new because not important
//Remove Picture
app.delete('/removePicture/:coiffeurId/:pictureId', async (req, res) => {
    try {
        const { coiffeurId, pictureId } = req.params;

        // Check if the picture exists
        const existingPicture = await db('CoiffeurPictures').where({
            CoiffeurID: coiffeurId,
            PictureID: pictureId
        }).first();

        if (!existingPicture) {
            return res.status(404).json({ message: 'Picture not found' });
        }

        // Delete the picture
        await db('CoiffeurPictures').where({
            CoiffeurID: coiffeurId,
            PictureID: pictureId
        }).del();

        return res.status(200).json({ message: 'Picture deleted successfully' });
    } catch (err) {
        console.error('Error deleting picture:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// ! /coiffeur/availability/:id/id
//------------------------------------Added---------------------------------------------->
// Get Coiffeur availability
app.get('/coiffeurAvailability/:id/:day', async (req, res) => {
    const coiffeurID = req.params.id;
    const dayOfWeek = req.params.day;
    try {
        const availability = await db('CoiffeurAvailability')
            .where({ CoiffeurID: coiffeurID, DayOfWeek: dayOfWeek })
            .select('*');
        return res.json(availability);
    } catch (err) {
        console.error('Error retrieving coiffeur availability:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

//Get Review by ID
// ! /coiffeur/review/:id
app.get('/ReviewCoiffeur/:id', async (req, res) => {
    const coiffeurID = req.params.id;
    try {
        const reviews = await db('CoiffeurReviews')
            .where({ coiffeurID: coiffeurID })
            .select('*');
        return res.json(reviews);
    } catch (err) {
        console.error('Error retrieving coiffeur Reviews:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
// ! /services/:coiffeurID
// ? need some thinking on it...
app.get('/servicesCoiffeur/:id', async (req, res) => {
    const coiffeurID = req.params.id;
    try {
        const services = await db('CoiffeurServices')
        .where({coiffeurID: coiffeurID})
        .select('*');
        return res.json(services);
    } catch (err) {
        console.error('Error retrieving services:', err);
        return res.status(500).json({error: 'internal server error'})
    }
});


//modify coiffeur availability
// ! coiffeur/modify-availability
app.post('/ModifyCoiffeurAvailability', async (req, res) => {
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


//----------------------------------------------------------------------------------

// Simple GET route for /login
app.get('/login', (req, res) => {
    res.send('Welcome to the login page');
});
// ! clients 
app.get('/Clients', async (req, res) => {
    try {
        const clients = await db('Clients').select('*');
        res.json(clients);
    } catch (err) {
        console.error('Error retrieving clients:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


//Coiffeurs
// ! coiffeurs
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
// ! /appointments
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
// ! /coiffeur/reviews
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

