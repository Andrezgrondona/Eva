
import 'dotenv/config'; 

import express from 'express';
import cors from 'cors';
import chatRoutes from './routes/chat.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/chat', chatRoutes);

app.get('/', (req, res) => {
  res.send('Hola desde EVA!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

//node index.js