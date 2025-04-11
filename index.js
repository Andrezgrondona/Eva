import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import chatRoutes from './routes/chat.js';
import calendarRoutes from './routes/calendar.js'; 

const app = express();
app.use(cors());
app.use(express.json());

app.use('/chat', chatRoutes);
app.use('/calendar', calendarRoutes); 

app.get('/', (req, res) => {
  res.send('Hola desde EVA!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
