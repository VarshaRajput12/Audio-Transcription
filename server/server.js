
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const { exec } = require('child_process'); // to run python script
const path = require('path');


const app = express();
app.use(cors());
app.use(fileUpload());

app.post('/transcribe', async (req, res) => {
    if (!req.files || !req.files.file) {
        return res.status(400).send('No file uploaded.');
    }

    const audioFile = req.files.file;
    const filePath = path.join(__dirname, 'uploads', audioFile.name);

    // Save the uploaded file
    await audioFile.mv(filePath);

    // Run Python script for transcription
    exec(`python transcribe.py "${filePath}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(stderr);
            return res.status(500).send('Transcription failed.');
        }
        res.json({ text: stdout.trim() });
    });
});

app.listen(5000, () => console.log('Server running on port 5000'));
