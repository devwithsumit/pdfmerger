import express from 'express';
import path from 'path';
import multer from 'multer';
import {mergePDfs} from './merge.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
const upload = multer({ dest: 'uploads/' })

app.use('/static', express.static('public'))
const port = 3000

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/index.html'))
})
app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {
    try {
        console.log(req.files);
        if (req.files.length !== 2) {
            return res.status(400).send('Please upload exactly two PDF files.');
        }

        const filePath1 = path.join(__dirname, req.files[0].path);
        const filePath2 = path.join(__dirname, req.files[1].path);

        // Ensure you have a valid path to save the merged file
        const mergedFilePath = path.join(__dirname, 'public/merged.pdf');

        await mergePDfs(filePath1, filePath2, mergedFilePath);

        res.redirect("http://localhost:3000/static/merged.pdf")
        // Respond with a link to the merged file
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while merging the files.');
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})