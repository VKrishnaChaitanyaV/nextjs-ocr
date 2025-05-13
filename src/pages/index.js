import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result;

      setLoading(true);
      try {
        const res = await fetch('/api/extract-text', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ base64 }),
        });

        const data = await res.json();
        setText(data.text || 'No text found');
      } catch (err) {
        setText('Error extracting text');
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Extract Text from Image</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {loading ? <p>Processing...</p> : <pre>{text}</pre>}
    </div>
  );
}
