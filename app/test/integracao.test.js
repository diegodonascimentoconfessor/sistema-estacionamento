// Testes para as funções do aplicativo
const { adicionarVeiculo, atualizarVagas, carregarListaVeiculos, excluirVeiculo } = require('../../js/autopark1');

const mockClient = {
  query: jest.fn(),
};

describe('Funções do aplicativo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Teste para a função atualizarVagas
  test('atualizarVagas calcula corretamente vagas disponíveis e ocupadas', async () => {
    mockClient.query.mockResolvedValueOnce({ rows: [{ count: '5' }] });

    const capacidadeTotal = 100;
    const { vagasDisponiveis, vagasOcupadas } = await atualizarVagas(mockClient, capacidadeTotal);

    expect(mockClient.query).toHaveBeenCalledWith('SELECT COUNT(*) FROM veiculos');
    expect(vagasDisponiveis).toBe(95);
    expect(vagasOcupadas).toBe(5);
  });

  // Teste para carregarListaVeiculos
  test('carregarListaVeiculos retorna lista de veículos', async () => {
    const mockVehicles = [
      { placa: 'ABC1234', marca_modelo: 'Fiat Uno', cor: 'Vermelho', entrada: '2024-12-15T14:00:00Z' },
    ];
    mockClient.query.mockResolvedValueOnce({ rows: mockVehicles });

    const vehicles = await carregarListaVeiculos(mockClient);

    expect(mockClient.query).toHaveBeenCalledWith('SELECT * FROM veiculos');
    expect(vehicles).toEqual(mockVehicles);
  });

  // Teste para excluirVeiculo
  test('excluirVeiculo exclui veículo corretamente', async () => {
    mockClient.query.mockResolvedValueOnce();

    const placa = 'ABC1234';
    const result = await excluirVeiculo(mockClient, placa);

    expect(mockClient.query).toHaveBeenCalledWith('DELETE FROM veiculos WHERE placa = $1', [placa]);
    expect(result).toBe(true);
  });

  // Teste para excluirVeiculo (falha)
  test('excluirVeiculo lança erro ao falhar', async () => {
    mockClient.query.mockRejectedValueOnce(new Error('Erro de conexão'));

    await expect(excluirVeiculo(mockClient, 'ABC1234')).rejects.toThrow('Erro ao excluir veículo');
  });

  // Teste para adicionarVeiculo
  test('adicionarVeiculo adiciona veículo corretamente', async () => {
    const mockVeiculo = {
      placa: 'XYZ5678',
      marca_modelo: 'Honda Civic',
      cor: 'Preto',
      entrada: '2024-12-18T12:00:00Z',
    };

    mockClient.query.mockResolvedValueOnce(); // Simulando a inserção bem-sucedida no banco

    const result = await adicionarVeiculo(mockClient, mockVeiculo);

    expect(mockClient.query).toHaveBeenCalledWith(
      'INSERT INTO veiculos (placa, marca_modelo, cor, entrada) VALUES ($1, $2, $3, $4)',
      ['XYZ5678', 'Honda Civic', 'Preto', '2024-12-18T12:00:00Z']
    );
    expect(result).toBe(true);
  });

  // Teste para adicionarVeiculo (falha)
  test('adicionarVeiculo lança erro ao falhar', async () => {
    const mockVeiculo = {
      placa: 'XYZ5678',
      marca_modelo: 'Honda Civic',
      cor: 'Preto',
      entrada: '2024-12-18T12:00:00Z',
    };

    mockClient.query.mockRejectedValueOnce(new Error('Erro de conexão'));

    await expect(adicionarVeiculo(mockClient, mockVeiculo)).rejects.toThrow('Erro ao adicionar veículo');
  });
});
