import express from 'express';
import cors from 'cors';
import multer from 'multer';
import axios from 'axios';
import FormData from 'form-data';

const app = express();
app.use(cors());

const upload = multer();
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

app.post('/detect', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No image provided' });

    const formData = new FormData();
    formData.append('file', req.file.buffer, {
      filename: 'frame.jpg',
      contentType: req.file.mimetype,
    });

    const aiResponse = await axios.post(`${AI_SERVICE_URL}/detect`, formData, {
      headers: formData.getHeaders(),
    });

    res.json(aiResponse.data);
  } catch (error) {
    console.error('AI Service Error:', error.message);
    res.status(500).json({ error: 'Failed to process image' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
