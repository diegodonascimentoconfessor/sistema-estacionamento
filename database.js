const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = 3000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'TechConnect',
    password: 'BemVindo!',
    port: 5432,
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/cliente', async (req, res) => {
    const { nome, cpf, datanascimento, celular, endereco } = req.body;
    const queryText = 'INSERT INTO cliente (nome, cpf, datanascimento, celular, endereco) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [nome, cpf, datanascimento, celular, endereco];

    try {
        const result = await pool.query(queryText, values);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao cadastrar cliente:', err);
        res.status(500).send('Erro interno ao processar a solicitação');
    }
});

app.get('/cliente', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cliente');
        res.json(result.rows);
    } catch (err) {
        res.status(400).send('Erro ao consultar clientes');
    }
});

app.put('/cliente/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, cpf, datanascimento, celular, endereco } = req.body;
    const queryText = 'UPDATE cliente SET nome = $1, cpf = $2, datanascimento = $3, celular = $4, endereco = $5 WHERE id = $6 RETURNING *';
    const values = [nome, cpf, datanascimento, celular, endereco, id];

    try {
        const result = await pool.query(queryText, values);
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao editar cliente:', err);
        res.status(500).send('Erro interno ao processar a solicitação');
    }
});

app.delete('/cliente/:id', async (req, res) => {
    const { id } = req.params;
    const queryText = 'DELETE FROM cliente WHERE id = $1 RETURNING *';
    const values = [id];

    try {
        const result = await pool.query(queryText, values);
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao deletar cliente:', err);
        res.status(500).send('Erro interno ao processar a solicitação');
    }
});

app.post('/produto', async (req, res) => {
    const { nome, fabricante, modelo, ano, descricao, preco } = req.body;
    const queryText = 'INSERT INTO produto (nome, fabricante, modelo, ano, descricao, preco) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [nome, fabricante, modelo, ano, descricao, preco];

    try {
        const result = await pool.query(queryText, values);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao cadastrar produto:', err);
        res.status(500).send('Erro interno ao processar a solicitação');
    }
});

app.get('/produto', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM produto');
        res.json(result.rows);
    } catch (err) {
        res.status(400).send('Erro ao consultar produtos');
    }
});

app.put('/produto/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, fabricante, modelo, ano, descricao, preco } = req.body;
    const queryText = 'UPDATE produto SET nome = $1, fabricante = $2, modelo = $3, ano = $4, descricao = $5, preco = $6 WHERE id = $7 RETURNING *';
    const values = [nome, fabricante, modelo, ano, descricao, preco, id];

    try {
        const result = await pool.query(queryText, values);
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao editar produto:', err);
        res.status(500).send('Erro interno ao processar a solicitação');
    }
});

app.delete('/produto/:id', async (req, res) => {
    const { id } = req.params;
    const queryText = 'DELETE FROM produto WHERE id = $1 RETURNING *';
    const values = [id];

    try {
        const result = await pool.query(queryText, values);
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao deletar produto:', err);
        res.status(500).send('Erro interno ao processar a solicitação');
    }
});

app.post('/funcionario', async (req, res) => {
    const { nome, datanascimento, cpf, celular, endereco, funcao } = req.body;
    const queryText = 'INSERT INTO funcionario (nome, datanascimento, cpf, celular, endereco, funcao) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [nome, datanascimento, cpf, celular, endereco, funcao];

    try {
        const result = await pool.query(queryText, values);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao cadastrar funcionário:', err);
        res.status(500).send('Erro interno ao processar a solicitação');
    }
});

app.get('/funcionario', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM funcionario');
        res.json(result.rows);
    } catch (err) {
        res.status(400).send('Erro ao consultar funcionários');
    }
});

app.put('/funcionario/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, datanascimento, cpf, celular, endereco, funcao } = req.body;
    const queryText = 'UPDATE funcionario SET nome = $1, datanascimento = $2, cpf = $3, celular = $4, endereco = $5, funcao = $6 WHERE id = $7 RETURNING *';
    const values = [nome, datanascimento, cpf, celular, endereco, funcao, id];

    try {
        const result = await pool.query(queryText, values);
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao editar funcionário:', err);
        res.status(500).send('Erro interno ao processar a solicitação');
    }
});

app.delete('/funcionario/:id', async (req, res) => {
    const { id } = req.params;
    const queryText = 'DELETE FROM funcionario WHERE id = $1 RETURNING *';
    const values = [id];

    try {
        const result = await pool.query(queryText, values);
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao deletar funcionário:', err);
        res.status(500).send('Erro interno ao processar a solicitação');
    }
});

app.get('/dados', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dados.html'));
});

app.listen(port, () => {
    console.log(`Servidor tá on! http://localhost:${port}`);
});