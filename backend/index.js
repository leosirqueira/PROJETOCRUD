const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

// Conexão com o banco PostgreSQL
const pool = new Pool({
  user: 'postgres',              // 👈 troque para seu usuário se for diferente
  host: 'localhost',
  database: 'dbleo',             // 👈 nome do banco criado
  password: 'postgres',    // 👈 sua senha do PostgreSQL
  port: 5432
});

// Teste de rota
app.get('/', (req, res) => {
  res.send('API de cadastro de clientes está online!');
});

// Listar todos os clientes
app.get('/clientes', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM clients ORDER BY id');
      res.json(result.rows);
    } catch (error) {
      console.error('Erro real:', error); // 👈 Adicione isso
      res.status(500).json({ error: 'Erro ao listar clientes' });
    }
  });
  

// Cadastrar cliente
app.post('/clientes', async (req, res) => {
    const {
      nome,
      email,
      telefone,
      endereco,
      data_nascimento,
      ativo
    } = req.body;
  
    try {
        const result = await pool.query(`
            INSERT INTO clients (name, email, telefone, endereco, data_nascimento, ativo)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
          `, [nome, email, telefone, endereco, data_nascimento, ativo]);                               
          
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Erro real ao cadastrar:', error); // 👈 Adicione isso
      res.status(500).json({ error: 'Erro ao cadastrar cliente' });
    }
  });  

// Atualizar cliente
app.put('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  const {
    nome,
    email,
    telefone,
    endereco,
    data_nascimento,
    ativo
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE clients SET
        name = $1,
        email = $2,
        telefone = $3,
        endereco = $4,
        data_nascimento = $5,
        ativo = $6
      WHERE id = $7
      RETURNING *`,
      [nome, email, telefone, endereco, data_nascimento, ativo, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar cliente' });
  }
});

// Deletar cliente
app.delete('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM clients WHERE id = $1', [id]);
    res.json({ message: 'Cliente removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar cliente' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
