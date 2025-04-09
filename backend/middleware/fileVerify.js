const fs = require('fs');
const { verifyPDFContent } = require('../utils/pdfExtractor');

/**
 * Middleware to verify PDF details match student information
 */
const verifyPDFDetails = async (req, res, next) => {
  try {
    // Check if file exists in request
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Get the file buffer
    const fileBuffer = fs.readFileSync(req.file.path);
    
    // Extract student info from request body
    // This is likely where the issue is occurring
    let studentInfo;
    
    try {
      // Handle different ways the info might be passed
      if (req.body.studentInfo) {
        if (typeof req.body.studentInfo === 'string') {
          studentInfo = JSON.parse(req.body.studentInfo);
        } else {
          studentInfo = req.body.studentInfo;
        }
      } else if (req.body.user) {
        // Try to extract from user object if available
        if (typeof req.body.user === 'string') {
          const user = JSON.parse(req.body.user);
          studentInfo = {
            name: user.name,
            registrationNumber: user.registrationNumber
          };
        } else {
          studentInfo = {
            name: req.body.user.name,
            registrationNumber: req.body.user.registrationNumber
          };
        }
      } else {
        // As a fallback, try to get individual fields
        studentInfo = {
          name: req.body.name || req.body.studentName,
          registrationNumber: req.body.registrationNumber || req.body.regNo
        };
      }
    } catch (error) {
      console.error('Error parsing student info:', error);
      return res.status(400).json({ error: 'Invalid student information format' });
    }
    
    // Log the studentInfo to help with debugging
    console.log('Student info for verification:', studentInfo);
    
    // Validate that we have the required fields
    if (!studentInfo || !studentInfo.name || !studentInfo.registrationNumber) {
      return res.status(400).json({ 
        error: 'Missing required student information',
        details: 'Both name and registration number are required' 
      });
    }

    // Verify the PDF content
    const isValid = await verifyPDFContent(fileBuffer, studentInfo);
    
    if (!isValid) {
      return res.status(400).json({ 
        error: 'PDF verification failed', 
        details: 'The uploaded document does not contain the expected student information'
      });
    }
    
    // If verification passes, proceed to the next middleware
    next();
  } catch (error) {
    console.error('Error verifying PDF:', error);
    return res.status(500).json({ error: `Failed to verify PDF: ${error.message}` });
  }
};

module.exports = {
  verifyPDFDetails
};