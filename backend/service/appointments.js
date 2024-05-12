const db = require('../configs/db');

// async function checkAvailability(coiffeurId, appointmentDate) {
//     // const appointmentDayOfWeek = appointmentDate.getDay(); // today

//     const availability = await db('CoiffeurAvailability')
//         .where('CoiffeurID', coiffeurId)
//         .andWhere('DayOfWeek', appointmentDayOfWeek + 1)
//         .first();

//     return availability;
// }

// !! need some testing
async function addAppointment(ClientID, CoiffeurID, ServiceID, Year, Month, Day, AppointmentTime) {
    try {


        // Validate the presence of required fields
        if (!ClientID || !ServiceID || !Year || !Month || !Day || !AppointmentTime) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check if the appointment has already been booked
        const existingAppointment = await db('Appointment')
            .where({
                CoiffeurID,
                Year,
                Month,
                Day,
                AppointmentTime
            })
            .first();

        if (existingAppointment) {
            return "error"
        }

        // Calculate the day of the week for the appointment
        const appointmentDate = new Date(`${Year}-${Month}-${Day}`);
        const appointmentDayOfWeek = appointmentDate.getDay(); // Sunday is 0, Monday is 1, etc.

        // Fetch coiffeur availability from the database based on coiffeurID and dayOfWeek
        const availability = await db('CoiffeurAvailability')
            .where('CoiffeurID', CoiffeurID)
            .andWhere('DayOfWeek', appointmentDayOfWeek + 1) // Adding 1 because in JavaScript, Sunday is 0, but in SQL, Sunday is 1
            .first();

        // Check if availability exists for the coiffeur on the specified day of the week
        if (!availability) {
            return 'Coiffeur is not available on the specified day'
        }

        const { StartTime, EndTime } = availability;

        // Extract the start and end hours from the availability object
        const startHours = StartTime;
        const endHours = EndTime;

        // Check if the appointment time falls within the available time range
        if (AppointmentTime < startHours || AppointmentTime > endHours) {
            console.log('Appointment time is not within the available time range');
            return 'Coiffeur is not available at the specified time'
        }


        await db('Appointment').insert({
            ClientID,
            CoiffeurID,
            ServiceID,
            Year,
            Month,
            Day,
            AppointmentTime
        });
    } catch (error) {
        throw error;
    }
}

module.exports = { addAppointment }
// app.post('/AddAppointment/:id', async (req, res) => {
//     try {
//         const coiffeurId = req.params.id; // Extract CoiffeurID from URL parameter

//         // Extract appointment details from the request body
//         const { ClientID, ServiceID, Year, Month, Day, AppointmentTime } = req.body;

//         // Validate the presence of required fields
//         if (!ClientID || !ServiceID || !Year || !Month || !Day || !AppointmentTime) {
//             return res.status(400).json({ message: 'Missing required fields' });
//         }

//         // Check if the appointment has already been booked
//         const existingAppointment = await db('Appointment')
//             .where({
//                 CoiffeurID: coiffeurId,
//                 Year,
//                 Month,
//                 Day,
//                 AppointmentTime
//             })
//             .first();

//         if (existingAppointment) {
//             return res.status(400).json({ message: 'This appointment has already been booked' });
//         }

//         // Calculate the day of the week for the appointment
//         const appointmentDate = new Date(`${Year}-${Month}-${Day}`);
//         const appointmentDayOfWeek = appointmentDate.getDay(); // Sunday is 0, Monday is 1, etc.

//         // Fetch coiffeur availability from the database based on coiffeurID and dayOfWeek
//         const availability = await db('CoiffeurAvailability')
//             .where('CoiffeurID', coiffeurId)
//             .andWhere('DayOfWeek', appointmentDayOfWeek + 1) // Adding 1 because in JavaScript, Sunday is 0, but in SQL, Sunday is 1
//             .first();

//         // Check if availability exists for the coiffeur on the specified day of the week
//         if (!availability) {
//             return res.status(400).json({ message: 'Coiffeur is not available on the specified day' });
//         }

//         const { StartTime, EndTime } = availability;

//         // Extract the start and end hours from the availability object
//         const startHours = StartTime;
//         const endHours = EndTime;

//         // Check if the appointment time falls within the available time range
//         if (AppointmentTime < startHours || AppointmentTime > endHours) {
//             console.log('Appointment time is not within the available time range');
//             return res.status(400).json({ message: 'Coiffeur is not available at the specified time' });
//         }

//         // Insert appointment details into the Appointment table
//         await db('Appointment').insert({
//             ClientID,
//             CoiffeurID: coiffeurId, // Assign CoiffeurID from URL parameter
//             ServiceID,
//             Year,
//             Month,
//             Day,
//             AppointmentTime
//         });

//         // Respond with success message
//         return res.status(201).json({ message: 'Appointment added successfully' });
//     } catch (err) {
//         // Handle any errors that occur during the process
//         console.error('Error adding appointment:', err);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// });