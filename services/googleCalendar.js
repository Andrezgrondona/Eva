import { google } from 'googleapis';
import oAuth2Client from './googleAuth.js';

export async function crearEventoCalendario({ resumen, descripcion, fechaInicio, fechaFin }) {
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

  const evento = {
    summary: resumen,
    description: descripcion,
    start: {
      dateTime: fechaInicio,
      timeZone: 'America/Bogota',
    },
    end: {
      dateTime: fechaFin,
      timeZone: 'America/Bogota',
    },
  };

  try {
    const respuesta = await calendar.events.insert({
      calendarId: 'primary',
      resource: evento,
    });
    return respuesta.data.htmlLink;
  } catch (error) {
    console.error('Error al crear el evento en Google Calendar:', error);
    throw new Error('No se pudo crear el evento');
  }
}
