import express from 'express';
import oAuth2Client from '../services/googleAuth.js';
import { crearEventoCalendario } from '../services/googleCalendar.js';

const router = express.Router();

router.get('/auth', (req, res) => {
  const SCOPES = ['https://www.googleapis.com/auth/calendar'];
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  res.redirect(authUrl);
});

router.get('/oauth2callback', async (req, res) => {
  const code = req.query.code;
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    res.send("✅ Autenticado correctamente. Puedes cerrar esta ventana.");
  } catch (error) {
    console.error('Error en OAuth Callback:', error);
    res.status(500).send("❌ Error al autenticar.");
  }
});

router.post('/create', async (req, res) => {
  const { resumen, descripcion, fechaInicio, fechaFin } = req.body;
  try {
    const link = await crearEventoCalendario({ resumen, descripcion, fechaInicio, fechaFin });
    res.json({ success: true, link });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear el evento' });
  }
});

export default router;
