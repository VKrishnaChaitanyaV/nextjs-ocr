import Tesseract from 'tesseract.js';

export default async function handler(req, res) {
  // ✅ Allow CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); // Or restrict to your domain
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method == 'GET') {
    return res.status(200).json({ success: 'Get API Call Success!' });
  }
    
  // ✅ Handle preflight request FIRST (important!)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // ✅ Reject other methods early
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ✅ Now safely access body
  const { base64 } = req.body;

  if (!base64) {
    return res.status(400).json({ error: 'No image provided' });
  }

  try {
    const result = await Tesseract.recognize(base64, 'eng');
    return res.status(200).json({ text: result.data.text });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'OCR failed', details: err.message });
  }
}
