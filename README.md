# InternTrack: Full Stack Web Application

InternTrack is a comprehensive web application for tracking and managing student internships. It enables students to submit their internship details with supporting documents while providing coordinators with tools to verify, track, and generate reports on internship data.

## 🚀 Features

### Student Features
- **User Authentication**: Secure login and registration
- **Internship Submission**: Submit internship details with proof documents
- **Document Upload**: Upload offer letters, permission letters, and completion certificates
- **Dashboard**: View submission status and internship statistics
- **Track Status**: Monitor verification status of submissions

### Coordinator Features
- **Dashboard**: View comprehensive statistics and recent submissions
- **Verification**: Verify student submissions with comments
- **Filtering**: Filter internships by various criteria (batch, company, type, etc.)
- **Reports**: Generate and export various reports (batch-wise, CDC/non-CDC, academic/industry, etc.)
- **Document Verification**: View and verify proof documents

### Technical Features
- **Form Validation**: Client-side and server-side validation
- **PDF Content Verification**: Verify if PDF contains student name and registration number
- **File Management**: Organize files in Google Drive with proper structure (year-wise and student-wise)
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- CSS3
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication

### External Services
- Google Drive API for file storage
- Tesseract.js for PDF text extraction

## 📋 Prerequisites

Before you begin, ensure you have the following:

1. Node.js (v14 or higher) and npm installed
2. MongoDB Atlas account or local MongoDB server
3. Google Cloud Platform account with Google Drive API enabled
4. Google Service Account credentials with Drive API access

## ⚙️ Setup and Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/interntrack.git
cd interntrack
```

### 2. Environment Variables

Create a `.env` file in the root directory and add the following:

```
NODE_ENV=development
PORT=5000

# MongoDB Connection String
MONGO_URI=mongodb+srv://your_mongodb_username:your_mongodb_password@cluster0.mongodb.net/interntrack

# JWT Secret and Expiry
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d

# Google Drive API
# Replace this with your actual Google Service Account credentials JSON
GOOGLE_CREDENTIALS={"type":"service_account","project_id":"your-project-id","private_key_id":"your-private-key-id",...}

# Google Drive root folder ID - REPLACE THIS WITH YOUR FOLDER ID
DRIVE_ROOT_FOLDER_ID=your_google_drive_folder_id

# Coordinator email (for access control)
COORDINATOR_EMAIL=praneetha2210172@ssn.edu.in
```

> **Important**: The `GOOGLE_CREDENTIALS` should be the entire JSON content of your service account credentials file. Replace `DRIVE_ROOT_FOLDER_ID` with the ID of the folder where you want to store internship files.

### 3. Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 4. Google Drive Setup

1. Create a folder in your Google Drive for storing internship files
2. Share this folder with your Google Service Account (email from credentials)
3. Copy the folder ID from the URL (part after `folders/` in the Drive URL) and set it as `DRIVE_ROOT_FOLDER_ID` in your `.env` file

### 5. Run the Application

```bash
# Run both backend and frontend
npm run dev

# Run only backend
npm run server

# Run only frontend
npm run client
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## 🔍 API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### File Routes
- `POST /api/files/upload/offerLetter` - Upload offer letter
- `POST /api/files/upload/permissionLetter` - Upload permission letter
- `POST /api/files/upload/completionCertificate` - Upload completion certificate

### Internship Routes
- `GET /api/internships` - Get all internships (filtered)
- `GET /api/internships/:id` - Get single internship
- `POST /api/internships` - Create internship
- `PUT /api/internships/:id` - Update internship
- `DELETE /api/internships/:id` - Delete internship
- `PUT /api/internships/:id/verify` - Verify internship
- `GET /api/internships/stats/dashboard` - Get internship statistics

## 📁 Folder Structure Explanation

The application follows a specific folder structure to organize files on Google Drive:

```
InternTrack/
└── [Year]/
    └── [RegNo_StudentName]/
        ├── offerLetter_[RegNo].pdf
        ├── permissionLetter_[RegNo].pdf
        └── completionCertificate_[RegNo].pdf
```

For example:
```
InternTrack/
└── 2022/
    └── 1101_John_Doe/
        ├── offerLetter_1101.pdf
        ├── permissionLetter_1101.pdf
        └── completionCertificate_1101.pdf
```

## 🔒 Security Features

- **JWT Authentication**: Secure user authentication
- **Password Hashing**: Passwords are hashed using bcrypt
- **Role-Based Access Control**: Different access for students and coordinators
- **PDF Verification**: Ensures uploaded PDFs contain student information
- **Input Validation**: Client and server-side validation

## 🛡️ Error Handling

The application implements comprehensive error handling:
- Form validation errors with specific messages
- API response error messages
- File upload and processing errors
- Authentication and authorization errors

## 📱 Responsive Design

The application is fully responsive and works well on:
- Desktop computers
- Tablets
- Mobile phones

## 🔧 Customization

### Changing the Coordinator Email

To change the coordinator email, update the `COORDINATOR_EMAIL` variable in the `.env` file.

### Changing the Google Drive Folder

To use a different Google Drive folder:
1. Create a new folder in Google Drive
2. Share it with your Google Service Account
3. Copy the folder ID and update the `DRIVE_ROOT_FOLDER_ID` in your `.env` file

## 📝 Contributors

- Oviasree Sampath
- Prathiyangira Devi V C
- Padala Praneetha

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
