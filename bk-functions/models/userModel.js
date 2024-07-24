const db = require('../config/firestore');
const usersCollection = db.collection('users');

module.exports = usersCollection;
