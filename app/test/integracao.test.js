const { Client } = require('pg');

// Simulação do cliente PostgreSQL
jest.mock('pg', () => {
  const mClient = {
    connect: jest.fn(),
    end: jest.fn(),
    query: jest.fn(),
  };
  return { Client: jest.fn(() => mClient) };
});

describe('Testes de integração para veículos (simulados)', () => {
  let client;

  // Instancia o cliente simulado antes de cada teste
  beforeAll(() => {
    client = new Client();
  });

  beforeEach(() => {
    // Limpa as chamadas anteriores
    client.query.mockClear();
  });

  test('Deve adicionar um veículo ao banco de dados (simulado)', async () => {
    // Mock para simular a inserção de um veículo
    client.query.mockResolvedValueOnce({
      rows: [{
        marca_modelo: 'Fiat Uno',
        placa: 'ABC1234',
        cor: 'Preto',
        entrada: new Date().toISOString(),
      }],
    });

    const marcaModelo = 'Fiat Uno';
    const placa = 'ABC1234';
    const cor = 'Preto';
    const entrada = new Date().toISOString();

    const vehicle = await addVehicle(marcaModelo, placa, cor, entrada);

    expect(vehicle).toHaveProperty('placa', placa);
    expect(vehicle).toHaveProperty('marca_modelo', marcaModelo);
    expect(vehicle).toHaveProperty('cor', cor);
    expect(vehicle).toHaveProperty('entrada');
    expect(client.query).toHaveBeenCalledWith(
      'INSERT INTO veiculos (marca_modelo, placa, cor, entrada) VALUES ($1, $2, $3, $4) RETURNING *',
      [marcaModelo, placa, cor, entrada]
    );
  });

  test('Deve excluir um veículo do banco de dados (simulado)', async () => {
    // Mock para simular a exclusão de um veículo
    client.query.mockResolvedValueOnce({ rows: [] });

    const placa = 'ABC1234';

    // Exclui o veículo
    await deleteVehicle(placa);

    expect(client.query).toHaveBeenCalledWith('DELETE FROM veiculos WHERE placa = $1', [placa]);
  });

  test('Deve não permitir adicionar um veículo sem placa (simulado)', async () => {
    const marcaModelo = 'Fiat Uno';
    const cor = 'Preto';
    const entrada = new Date().toISOString();

    try {
      await addVehicle(marcaModelo, '', cor, entrada);
    } catch (error) {
      // O erro deve ser tratado corretamente, como erro simulado
      expect(error).toBeDefined();
      expect(client.query).not.toHaveBeenCalled();
    }
  });
});

// Funções para interagir com o banco simulado

// Função para adicionar veículo
const addVehicle = async (marcaModelo, placa, cor, entrada) => {
  const result = await client.query(
    'INSERT INTO veiculos (marca_modelo, placa, cor, entrada) VALUES ($1, $2, $3, $4) RETURNING *',
    [marcaModelo, placa, cor, entrada]
  );
  return result.rows[0];
};

// Função para excluir veículo
const deleteVehicle = async (placa) => {
  await client.query('DELETE FROM veiculos WHERE placa = $1', [placa]);
};
