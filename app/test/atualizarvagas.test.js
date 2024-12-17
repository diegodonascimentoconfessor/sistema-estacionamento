const { Client } = require('pg');
const { atualizarVagas } = require('../../js/atualizarvagas');

// Mock do PostgreSQL
jest.mock('pg', () => {
  const mClient = {
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn(),
  };
  return { Client: jest.fn(() => mClient) };
});

describe('Atualizar Vagas', () => {
  it('Deve calcular as vagas disponíveis corretamente', async () => {
    const client = new Client();
    client.query.mockResolvedValue({ rows: [{ count: '50' }] });

    const vagasDisponiveis = await atualizarVagas();

    expect(vagasDisponiveis).toBe(50); // 100 - 50 = 50
    expect(client.query).toHaveBeenCalledWith('SELECT COUNT(*) FROM veiculos');
    expect(client.end).toHaveBeenCalled(); // Verifica se a conexão foi fechada
  });
});
