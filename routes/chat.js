import express from 'express';
import { askEva } from '../services/eva.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Mensaje no proporcionado.' });
  }

  try {
    const reply = await askEva(message);
    const maxLength = 200;
    let finalReply = reply;

    if (reply.length > maxLength) {
      const truncated = reply.slice(0, maxLength);
      const lastPeriod = truncated.lastIndexOf('.');

      
      finalReply = lastPeriod !== -1 ? truncated.slice(0, lastPeriod + 1) : truncated.trim();
    }

    res.json({ response: finalReply });
  } catch (error) {
    console.error('Error al procesar el mensaje:', error);
    res.status(500).json({ error: 'Error interno al generar la respuesta.' });
  }
});

export default router;
