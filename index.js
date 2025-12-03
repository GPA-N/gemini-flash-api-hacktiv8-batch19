import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import fs from 'fs';
import { GoogleGenAI } from '@google/genai';
import { type } from 'os';

const app = express();
const upload = multer();
const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
const GEMINI_MODEL = 'gemini-2.5-flash-lite';

app.use(express.json());
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.post('/generate-text', async (req, res) => {
    const { prompt } = req.body;
    try {
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents:prompt
        });
        res.status(200).json({ result: response.text });
    } catch (error) {
        console.log('Error generating text:', error);
        res.status(500).json({ error: 'Text generation failed' });
    }
});

app.post('/generate-from-image', upload.single('image'), async (req, res) => {
    const { prompt } = req.body;
    const base64image = req.file.buffer.toString('base64');
    try {
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: [
                {text: prompt, type: 'text'},
                {inlineData: {data: base64image, mimeType: req.file.mimetype}}
        ]
        });
        res.status(200).json({ result: response.text });
    } catch (error) {
        console.log('Error generating text:', error);
        res.status(500).json({ error: 'Text generation failed' });
    }
});

app.post('/generate-from-document', upload.single('document'), async (req, res) => {
    const { prompt } = req.body;
    const base64document = req.file.buffer.toString('base64');
    try {
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: [
                {text: prompt, type: 'text'},
                {inlineData: {data: base64document, mimeType: req.file.mimetype}}
        ]
        });
        res.status(200).json({ result: response.text });
    } catch (error) {
        console.log('Error generating text:', error);
        res.status(500).json({ error: 'Text generation failed' });
    }
});

app.post('/generate-from-audio', upload.single('audio'), async (req, res) => {
    const { prompt } = req.body;
    const base64document = req.file.buffer.toString('base64');
    try {
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: [
                {text: prompt, type: 'text'},
                {inlineData: {data: base64document, mimeType: req.file.mimetype}}
        ]
        });
        res.status(200).json({ result: response.text });
    } catch (error) {
        console.log('Error generating text:', error);
        res.status(500).json({ error: 'Text generation failed' });
    }
});

app.post('/generate-from-video', upload.single('video'), async (req, res) => {
    const { prompt } = req.body;
    const base64document = req.file.buffer.toString('base64');
    try {
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: [
                {text: prompt, type: 'text'},
                {inlineData: {data: base64document, mimeType: req.file.mimetype}}
        ]
        });
        res.status(200).json({ result: response.text });
    } catch (error) {
        console.log('Error generating text:', error);
        res.status(500).json({ error: 'Text generation failed' });
    }
});