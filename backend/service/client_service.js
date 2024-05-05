const db = require('../configs/db');
// Kristina : ici nous avons les functions 
//qui nous permette de prendre les donner lie au client de notre bd. 
async function getClients() {
    const clients = await db('Clients').select('*');
    return clients;
}
async function getClientsByID(clientId) {
    const client = await db('Clients').select('*').where('ClientID', clientId);
    return client;
}

async function getClientsAppointment(clientId) {
    const clientAppointments = await db('Appointment')
    .select('*')
    .where('ClientID', clientId);
    return clientAppointments;
}
async function addFavorite(clientId, coiffeurId) {
    await db('ListFav').insert({ ClientID: clientId, CoiffeurID: coiffeurId,});
}

async function deleteFavorite(clientId, coiffeurId) {
    await db('ListFav').where({ ClientID: clientId, CoiffeurID: coiffeurId }).del();
}
async function getFavorite(clientId) {
    const favoriteCoiffeurs = await db('ListFav')
    .join('Coiffeurs', 'ListFav.CoiffeurID', '=', 'Coiffeurs.CoiffeurID')
    .where('ListFav.ClientID', clientId)
    .select('Coiffeurs.*');



return favoriteCoiffeurs;
}

module.exports = {
    getClients,
    getClientsByID,
    getClientsAppointment,
    addFavorite,
    deleteFavorite,
    getFavorite }
//  clients
//  clients/:id
//  clients/appointments
//  /client/favorite post
//  /client/favorite del
//  /clients/favorites/:id get
//  /client/appointment
//  addAppointement/id