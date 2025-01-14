const db = require('../configs/db');
//Coiffeurs
async function getCoiffeurs() {
    const coiffeurs = await db('Coiffeurs').select('*');
    return coiffeurs;
}
async function getCoiffeurById(coiffeurId) {
    const coiffeurData = await db('Coiffeurs').where('CoiffeurID', coiffeurId).first();
    return coiffeurData;
}
async function getCoiffeursAppointments(coiffeurId) {
    const coiffeurAppointments = await db('Appointment')
        .select('*')
        .where('CoiffeurID', coiffeurId);
    return coiffeurAppointments
}
// Coiffeurs + review
async function getCoiffeurReviews(coiffeurId) {
    const reviews = await db('CoiffeurReviews')
        .join('Clients', 'Clients.ClientID', '=', 'CoiffeurReviews.ClientID')
        .select('*')
        .where('CoiffeurID', coiffeurId);
    return reviews
}
async function createCoiffeurReview(ClientID, CoiffeurID, Rating, ReviewText) {
    await db('CoiffeurReviews').insert({
        ClientID,
        CoiffeurID,
        Rating,
        ReviewText
    });
}
async function deleteCoiffeurReviews(reviewId) {
    const existingReview = await db('CoiffeurReviews').where('ReviewID', reviewId).first();
    if (!existingReview) {
        console.log("Couldn't find review")
    }
    await db('CoiffeurReviews').where('ReviewID', reviewId).del();
}
async function addService(CoiffeurID, ServiceName, Description, Price) {
    await db('CoiffeurServices').insert({
        CoiffeurID,
        ServiceName,
        Description,
        Price
    });
}
async function deleteService(serviceId) {
    await db('CoiffeurServices')
        .where({
            ServiceID: serviceId
        })
        .del();
}
async function getServices(coiffeurID){
    const services = await db('CoiffeurServices')
    .where({coiffeurID: coiffeurID})
    .select('*');
    return services;
}

async function getAvailability (coiffeurID, dayOfWeek) {
    const availability = await db('CoiffeurAvailability')
    .where({ CoiffeurID: coiffeurID, DayOfWeek: dayOfWeek })
    .select('*');
return availability;
}
async function updateAvailability (CoiffeurID, availability) {
    await db('CoiffeurAvailability').insert({
        CoiffeurID,
        DayOfWeek: availability.DayOfWeek,
        StartTime: availability.StartTime,
        EndTime: availability.EndTime
    });
}
async function getSchedule(CoiffeurID) {
  const schedule = await db('CoiffeurAvailability').where({ CoiffeurID}).select('*')
  return schedule;
}
module.exports = {
    getCoiffeurs,
    getCoiffeurById,
    getCoiffeursAppointments,
    getCoiffeurReviews,
    createCoiffeurReview,
    deleteCoiffeurReviews,
    addService,
    deleteService,
    getServices,
    getAvailability,
    updateAvailability,
    getSchedule
};
/* 
! /coiffeurs
! coiffeur/:id
! /coiffeur/appointments

! coiffeurs/review(post):coiffeurId getz
!coiffeurs/review(delete):coiffeurId
!coiffeurs/review(get):coiffeurId
! /coiffeurs/service:coiffeurId/(post,delete.get) 


/coiffeurs/avalability(post, put, del, get)

*/