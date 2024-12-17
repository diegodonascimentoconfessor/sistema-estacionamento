const { atualizarVagas, carregarListaVeiculos, excluirVeiculo } = require('../../js/app');

const mockClient = {
  query: jest.fn(),
};

describe('Funções do aplicativo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('atualizarVagas calcula corretamente vagas disponíveis e ocupadas', async () => {
    mockClient.query.mockResolvedValueOnce({ rows: [{ count: '5' }] });

    const capacidadeTotal = 100;
    const { vagasDisponiveis, vagasOcupadas } = await atualizarVagas(mockClient, capacidadeTotal);

    expect(mockClient.query).toHaveBeenCalledWith('SELECT COUNT(*) FROM veiculos');
    expect(vagasDisponiveis).toBe(95);
    expect(vagasOcupadas).toBe(5);
  });

  test('carregarListaVeiculos retorna lista de veículos', async () => {
    const mockVehicles = [
      { placa: 'ABC1234', marca_modelo: 'Fiat Uno', cor: 'Vermelho', entrada: '2024-12-15T14:00:00Z' },
    ];
    mockClient.query.mockResolvedValueOnce({ rows: mockVehicles });

    const vehicles = await carregarListaVeiculos(mockClient);

    expect(mockClient.query).toHaveBeenCalledWith('SELECT * FROM veiculos');
    expect(vehicles).toEqual(mockVehicles);
  });

  test('excluirVeiculo exclui veículo corretamente', async () => {
    mockClient.query.mockResolvedValueOnce();

    const placa = 'ABC1234';
    const result = await excluirVeiculo(mockClient, placa);

    expect(mockClient.query).toHaveBeenCalledWith('DELETE FROM veiculos WHERE placa = $1', [placa]);
    expect(result).toBe(true);
  });

  test('excluirVeiculo lança erro ao falhar', async () => {
    mockClient.query.mockRejectedValueOnce(new Error('Erro de conexão'));

    await expect(excluirVeiculo(mockClient, 'ABC1234')).rejects.toThrow('Erro ao excluir veículo');
  });
});
