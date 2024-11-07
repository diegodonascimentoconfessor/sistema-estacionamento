

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Autopark',  
    password: 'BemVindo!',
    port: 5432,
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota principal (tela inicial)
app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'app', 'index.html'));
});

// Rota para adicionar um novo veículo
app.post('/veiculo', async (req, res) => {
    const { marcaModelo, placa, cor } = req.body;
    const entrada = new Date().toISOString(); // Entrada do veículo (data e hora)
    const queryText = 'INSERT INTO veiculo (marca_modelo, placa, cor, entrada) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [marcaModelo, placa, cor, entrada];

    try {
        const result = await pool.query(queryText, values);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao cadastrar veículo:', err);
        res.status(500).send('Erro interno ao processar a solicitação');
    }
});

// Rota para listar todos os veículos cadastrados
app.get('/veiculo', async (_req, res) => {
    try {
        const result = await pool.query('SELECT * FROM veiculo');
        res.json(result.rows);
    } catch (err) {
        res.status(400).send('Erro ao consultar veículos');
    }
});

// Rota para editar um veículo
app.put('/veiculo/:id', async (req, res) => {
    const { id } = req.params;
    const { marcaModelo, placa, cor } = req.body;
    const queryText = 'UPDATE veiculo SET marca_modelo = $1, placa = $2, cor = $3 WHERE id = $4 RETURNING *';
    const values = [marcaModelo, placa, cor, id];

    try {
        const result = await pool.query(queryText, values);
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao editar veículo:', err);
        res.status(500).send('Erro interno ao processar a solicitação');
    }
});

// Rota para excluir um veículo
app.delete('/veiculo/:id', async (req, res) => {
    const { id } = req.params;
    const queryText = 'DELETE FROM veiculo WHERE id = $1 RETURNING *';
    const values = [id];

    try {
        const result = await pool.query(queryText, values);
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao deletar veículo:', err);
        res.status(500).send('Erro interno ao processar a solicitação');
    }
});

// Rota para registrar o pagamento de um veículo
app.post('/pagamento', async (req, res) => {
    const { veiculoId, valorPago, dataPagamento } = req.body;
    const queryText = 'INSERT INTO pagamento (veiculo_id, valor_pago, data_pagamento) VALUES ($1, $2, $3) RETURNING *';
    const values = [veiculoId, valorPago, dataPagamento];

    try {
        const result = await pool.query(queryText, values);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao registrar pagamento:', err);
        res.status(500).send('Erro interno ao processar a solicitação');
    }
});

// Rota para listar todos os pagamentos
app.get('/pagamento', async (_req, res) => {
    try {
        const result = await pool.query('SELECT * FROM pagamento');
        res.json(result.rows);
    } catch (err) {
        res.status(400).send('Erro ao consultar pagamentos');
    }
});

// Página de dados (relatórios, etc)
app.get('/dados', (_req, res) => {
    res.sendFile(path.join(__dirname, 'app', 'indexl'));
});

app.listen(port, () => {
    console.log(`Servidor está rodando na URL http://localhost:${port}`);
});
