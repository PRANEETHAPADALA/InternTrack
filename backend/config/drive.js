const { google } = require('googleapis');
require('dotenv').config();

// Google Drive API configuration
const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
  scopes: ['https://www.googleapis.com/auth/drive']
});

// Create Google Drive client
const drive = google.drive({
  version: 'v3',
  auth
});

// Root folder ID for InternTrack app
// REPLACE THIS WITH YOUR DRIVE FOLDER ID
const INTERNTRACK_ROOT_FOLDER = process.env.DRIVE_ROOT_FOLDER_ID || '1SqUP9qi6ThzpR99kMvhJ8hmVqruSU7qx';

module.exports = {
  drive,
  INTERNTRACK_ROOT_FOLDER
};