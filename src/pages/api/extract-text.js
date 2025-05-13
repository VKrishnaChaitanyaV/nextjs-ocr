import Tesseract from 'tesseract.js';

export default async function handler(req, res) {
  if (req.method == 'GET') {
    return res.status(200).json({ error: 'Get APi Call!' });
  }
  else if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed!' });
  }

  const { base64 } = req.body;

  if (!base64) {
    return res.status(400).json({ error: 'No image provided' });
  }

  try {
    const result = await Tesseract.recognize(base64, 'eng');
    return res.status(200).json({ text: "Post Success" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
