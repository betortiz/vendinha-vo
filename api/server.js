import express from 'express';
import colors from 'colors';

const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Projeto Vendinha da Vó</h1>');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`.bgCyan.white);
});