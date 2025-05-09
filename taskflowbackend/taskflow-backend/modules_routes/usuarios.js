const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Cadastro
router.post('/', async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const novoUsuario = await pool.query(
      'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *',
      [nome, email, senha]
    );
    res.status(201).json(novoUsuario.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao cadastrar usuário.' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuario = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1 AND senha = $2',
      [email, senha]
    );
    if (usuario.rows.length > 0) {
      res.status(200).json({ mensagem: 'Login bem-sucedido!' });
    } else {
      res.status(401).json({ erro: 'Credenciais inválidas.' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro no login.' });
  }
});

module.exports = router;
