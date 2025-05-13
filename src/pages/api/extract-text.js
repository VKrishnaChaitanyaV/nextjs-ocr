import Tesseract from 'tesseract.js';

export default async function handler(req, res) {
  if(req.method == "GET") {
    return res.status(200).json({ success: 'Get Call.' });
  }
  else if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { base64 } = req.body;

  if (!base64) {
    return res.status(400).json({ error: 'No image data provided' });
  }

  try {
    const result = await Tesseract.recognize(
      base64,
      'eng',
      {
        logger: (m) => console.log(m), // Optional: Logs OCR progress
      }
    );

    res.status(200).json({ text: result.data.text });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process image', detail: error.message });
  }
}
