import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import productRoutes from './routes/productRoutes.js';
import cors from 'cors';

// Carrega as variáveis de ambiente
dotenv.config();

// Conecta ao banco de dados
connectDB();

// REST object
const app = express();

// Middleware de log
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);

// Rota de teste api
app.get('/', (req, res) => {
  res.send('<h1>Projeto Vendinha da Vó</h1>');
});

// Porta do servidor
const port = process.env.PORT || 5000;

// Inicializa o servidor na porta especificada
app.listen(port, () => {
  console.log(
    `Server running on ${process.env.DEV_MODE} mode port ${port}`.bgCyan.white
  );
});
