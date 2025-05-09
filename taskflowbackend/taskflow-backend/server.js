const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
const usuarioRoutes = require('./modules_routes/usuarios');
const tarefaRoutes = require('./modules_routes/tarefas');

app.use('/usuarios', usuarioRoutes);
app.use('/tarefas', tarefaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
