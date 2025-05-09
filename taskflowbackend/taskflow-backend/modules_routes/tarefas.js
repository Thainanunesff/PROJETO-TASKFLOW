const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Criar tarefa
router.post('/', async (req, res) => {
  const { titulo, descricao, usuario_id } = req.body;
  try {
    const novaTarefa = await pool.query(
      'INSERT INTO tarefas (titulo, descricao, usuario_id) VALUES ($1, $2, $3) RETURNING *',
      [titulo, descricao, usuario_id]
    );
    res.status(201).json(novaTarefa.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar tarefa.' });
  }
});

// Listar tarefas de um usuário
router.get('/:usuario_id', async (req, res) => {
  const { usuario_id } = req.params;
  try {
    const tarefas = await pool.query(
      'SELECT * FROM tarefas WHERE usuario_id = $1',
      [usuario_id]
    );
    res.status(200).json(tarefas.rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar tarefas.' });
  }
});

module.exports = router;
