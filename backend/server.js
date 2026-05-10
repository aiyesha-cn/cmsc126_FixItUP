const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

// Set up the database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Default XAMPP/WAMP user
  password: '', // Default XAMPP/WAMP password (leave blank)
  database: 'fixitup_db' // The name of your SQL database
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL FixItUP Database!');
});

app.get('/api/requests', (req, res) => {
    // This query JOINs the maintenance table with the facility table to get the actual names
    const sqlQuery = `
        SELECT 
            mr.maintenance_request_id, 
            mr.issue_category, 
            mr.issue_description, 
            mr.location_id,
            fld.location_name,
            fld.room_details
        FROM maintenance_request mr
        LEFT JOIN facility_location_details fld 
        ON mr.location_id = fld.location_id
    `;

    db.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});


// Create new maintenance request
app.post('/api/requests', (req, res) => {
    // Grab the data sent from the React form
    const { user_id, location_id, issue_category, issue_description } = req.body;

    const sqlQuery = `
        INSERT INTO maintenance_request 
        (user_id, location_id, issue_category, issue_description, date_submitted) 
        VALUES (?, ?, ?, ?, NOW())
    `;

    db.query(sqlQuery, [user_id, location_id, issue_category, issue_description], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Failed to submit request' });
        }
        res.status(201).json({ message: 'Request added successfully!', id: result.insertId });
    });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});