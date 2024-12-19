const { Client } = require('pg');
const { atualizarVagas } = require('../../js/atualizarvagas');

// Mock do PostgreSQL
// eslint-disable-next-line no-undef
jest.mock('pg', () => {
  const mClient = {
    // eslint-disable-next-line no-undef
    connect: jest.fn(),
    // eslint-disable-next-line no-undef
    query: jest.fn(),
    // eslint-disable-next-line no-undef
    end: jest.fn(),
  };
  // eslint-disable-next-line no-undef
  return { Client: jest.fn(() => mClient) };
});

// eslint-disable-next-line no-undef
describe('Atualizar Vagas', () => {
  // eslint-disable-next-line no-undef
  it('Deve calcular as vagas disponíveis corretamente', async () => {
    const client = new Client();
    client.query.mockResolvedValue({ rows: [{ count: '50' }] });

    const vagasDisponiveis = await atualizarVagas();

    // eslint-disable-next-line no-undef
    expect(vagasDisponiveis).toBe(50); // 100 - 50 = 50
    // eslint-disable-next-line no-undef
    expect(client.query).toHaveBeenCalledWith('SELECT COUNT(*) FROM veiculos');
    // eslint-disable-next-line no-undef
    expect(client.end).toHaveBeenCalled(); // Verifica se a conexão foi fechada
  });
});
