const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;

    // Example user details (replace with real data if needed)
    const user_id = 'rakesh_kumar';
    const email = 'cs4488@srmist.edu.in';
    const roll_number = 'RA2111026010041';

    // Process input data
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const highest_lowercase_alphabet = alphabets.filter(char => char === char.toLowerCase()).sort().slice(-1);

    // File validation logic (simplified)
    const file_valid = file_b64 ? true : false;
    const file_mime_type = file_valid ? 'image/png' : null; // Example MIME type
    const file_size_kb = file_valid ? Math.ceil(Buffer.byteLength(file_b64, 'base64') / 1024) : null; // Calculate size in KB

    res.json({
        is_success: true,
        user_id,
        email,
        roll_number,
        numbers,
        alphabets,
        highest_lowercase_alphabet,
        file_valid,
        file_mime_type,
        file_size_kb
    });
});
app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError) {
        return res.status(400).json({ error: 'Invalid JSON' });
    }
    next();
});