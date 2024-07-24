/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

const {onRequest} = require("firebase-functions/v2/https");
const express = require('express');
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");


const app = express();
app.use(cors({ origin: true }));
app.use('/api', userRoutes);;

exports.app = onRequest(app);