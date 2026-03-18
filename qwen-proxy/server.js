// ============================================================
//  Festora  —  Qwen Proxy API Server
//  Deploy this folder on your AWS EC2 instance.
//  Run with: pm2 start server.js --name qwen-proxy
// ============================================================

const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const app        = express();
const PORT       = process.env.PORT        || 3001;
const QWEN_MODEL = process.env.QWEN_MODEL  || 'qwen2.5:7b';
const API_KEY    = process.env.API_KEY     || 'festora-secret-key-change-this';
const ALLOWED    = process.env.ALLOWED_ORIGIN || '*';

// ── Middleware ────────────────────────────────────────────────
app.use(cors({ origin: ALLOWED }));
app.use(express.json());

// ── API-Key auth ─────────────────────────────────────────────
app.use((req, res, next) => {
  // Health check is public
  if (req.path === '/health') return next();

  const key = req.headers['x-api-key'];
  if (key !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized — wrong API key' });
  }
  next();
});

// ── Health check ─────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'ok', model: QWEN_MODEL, timestamp: new Date().toISOString() });
});

// ── Chat endpoint ─────────────────────────────────────────────
// Body: { message: string, history?: [{role, content}] }
app.post('/chat', async (req, res) => {
  const { message, history = [] } = req.body;

  if (!message) {
    return res.status(400).json({ error: '"message" field is required' });
  }

  // Build the message array for Ollama
  const systemPrompt = {
    role: 'system',
    content: `You are Festora Assistant — the AI helper for India's top event booking platform.
You help users discover events, understand booking steps, and answer questions about tickets.

Available Events:
- Arijit Singh Live | ₹1499 onwards | DY Patil Stadium, Mumbai | 22 Mar 2026
- Sunburn Arena ft. Martin Garrix | ₹2499 onwards | MMRDA Grounds, BKC, Mumbai | 29 Mar 2026
- Zakir Khan Comedy Show | ₹799 onwards | JLN Stadium, New Delhi | 20 Mar 2026
- Lollapalooza India 2026 | ₹3999 onwards | Mahalaxmi Racecourse, Mumbai | 5-6 Apr 2026
- IPL: MI vs CSK | ₹999 onwards | Wankhede Stadium, Mumbai | 18 Mar 2026
- Google I/O Extended India | ₹499 onwards | Bangalore International Centre | 26 Mar 2026

Booking info: Payments via UPI, Credit/Debit Card, Net Banking. E-pass with QR code is sent by email instantly after booking.

Guidelines:
- Be friendly, helpful and concise (max 100 words per reply)
- Use relevant emojis to make responses feel lively
- If asked about something outside events/booking, politely redirect`
  };

  const messages = [
    systemPrompt,
    ...history,
    { role: 'user', content: message }
  ];

  try {
    const response = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model:    QWEN_MODEL,
        messages: messages,
        stream:   false
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Ollama error:', errText);
      return res.status(502).json({ error: 'Ollama returned an error', detail: errText });
    }

    const data  = await response.json();
    const reply = data.message?.content || data.response || 'No response from model.';
    res.json({ reply });

  } catch (err) {
    console.error('Proxy fetch error:', err.message);
    res.status(500).json({ error: 'Failed to reach Ollama: ' + err.message });
  }
});

// ── Start ─────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Festora Qwen Proxy running on port ${PORT}`);
  console.log(`   Model : ${QWEN_MODEL}`);
  console.log(`   CORS  : ${ALLOWED}`);
});
