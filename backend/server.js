/* server.js */
/* ---------------- */

const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

app.post('/resize', upload.single('image'), (req, res) => {
  let imagePromise;

  if (req.file) {
    // If image is uploaded as a file
    imagePromise = Promise.resolve(fs.readFileSync(req.file.path));
  } else if (req.body.imageUrl) {
    // If image is provided as a URL
    imagePromise = axios.get(req.body.imageUrl, { responseType: 'arraybuffer' })
      .then(response => response.data)
      .catch(() => {
        res.status(400).send('Error fetching image from URL');
        return null;
      });
  } else {
    res.status(400).send('No image uploaded or URL provided');
    return;
  }

  const { width, height } = req.query;

  imagePromise.then(imageBuffer => {
    if (!imageBuffer) return;

    sharp(imageBuffer)
      .resize(parseInt(width), parseInt(height))
      .toBuffer((err, resizedImage) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error processing image');
          return;
        }

        res.type('image/jpeg').send(resizedImage);

        // Delete the uploaded file if it exists
        if (req.file) {
          fs.unlink(req.file.path, (err) => {
            if (err) console.error('Error deleting file:', err);
          });
        }
      });
  }).catch(error => {
    console.error(error);
    res.status(500).send('Error processing image');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});