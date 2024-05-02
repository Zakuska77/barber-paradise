const db =  require('../configs/db');

async function checkAvailability(coiffeurId, appointmentDate) {
    const appointmentDayOfWeek = appointmentDate.getDay(); 
    
    const availability = await db('CoiffeurAvailability')
        .where('CoiffeurID', coiffeurId)
        .andWhere('DayOfWeek', appointmentDayOfWeek + 1) 
        .first();

    return availability;
}

// !! need some testing
async function addAppointment(ClientID, coiffeurId , ServiceID, Year, Month, Day, AppointmentTime) {
    try {
        
        const appointmentDate = new Date(`${Year}-${Month}-${Day}`);
        const availability = await checkAvailability(coiffeurId, appointmentDate);

        if (!availability) {
            throw new Error('Coiffeur is not available on the specified day');
        }

        const { StartTime, EndTime } = availability;

        if (AppointmentTime < StartTime || AppointmentTime > EndTime) {
            throw new Error('Coiffeur is not available at the specified time');
        }

        await db('Appointment').insert({
            ClientID,
            CoiffeurID: coiffeurId, 
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

module.exports = {addAppointment,checkAvailability}