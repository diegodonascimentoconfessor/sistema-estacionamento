// Testes para as funções do aplicativo
const { adicionarVeiculo, atualizarVagas, carregarListaVeiculos, excluirVeiculo } = require('../../js/autopark1');

const mockClient = {
  // eslint-disable-next-line no-undef
  query: jest.fn(),
};

// eslint-disable-next-line no-undef
describe('Funções do aplicativo', () => {
  // eslint-disable-next-line no-undef
  beforeEach(() => {
    // eslint-disable-next-line no-undef
    jest.clearAllMocks();
  });

  // Teste para a função atualizarVagas
  // eslint-disable-next-line no-undef
  test('atualizarVagas calcula corretamente vagas disponíveis e ocupadas', async () => {
    mockClient.query.mockResolvedValueOnce({ rows: [{ count: '5' }] });

    const capacidadeTotal = 100;
    const { vagasDisponiveis, vagasOcupadas } = await atualizarVagas(mockClient, capacidadeTotal);

    // eslint-disable-next-line no-undef
    expect(mockClient.query).toHaveBeenCalledWith('SELECT COUNT(*) FROM veiculos');
    // eslint-disable-next-line no-undef
    expect(vagasDisponiveis).toBe(95);
    // eslint-disable-next-line no-undef
    expect(vagasOcupadas).toBe(5);
  });

  // Teste para carregarListaVeiculos
  // eslint-disable-next-line no-undef
  test('carregarListaVeiculos retorna lista de veículos', async () => {
    const mockVehicles = [
      { placa: 'ABC1234', marca_modelo: 'Fiat Uno', cor: 'Vermelho', entrada: '2024-12-15T14:00:00Z' },
    ];
    mockClient.query.mockResolvedValueOnce({ rows: mockVehicles });

    const vehicles = await carregarListaVeiculos(mockClient);

    // eslint-disable-next-line no-undef
    expect(mockClient.query).toHaveBeenCalledWith('SELECT * FROM veiculos');
    // eslint-disable-next-line no-undef
    expect(vehicles).toEqual(mockVehicles);
  });

  // Teste para excluirVeiculo
  // eslint-disable-next-line no-undef
  test('excluirVeiculo exclui veículo corretamente', async () => {
    mockClient.query.mockResolvedValueOnce();

    const placa = 'ABC1234';
    const result = await excluirVeiculo(mockClient, placa);

    // eslint-disable-next-line no-undef
    expect(mockClient.query).toHaveBeenCalledWith('DELETE FROM veiculos WHERE placa = $1', [placa]);
    // eslint-disable-next-line no-undef
    expect(result).toBe(true);
  });

  // Teste para excluirVeiculo (falha)
  // eslint-disable-next-line no-undef
  test('excluirVeiculo lança erro ao falhar', async () => {
    mockClient.query.mockRejectedValueOnce(new Error('Erro de conexão'));

    // eslint-disable-next-line no-undef
    await expect(excluirVeiculo(mockClient, 'ABC1234')).rejects.toThrow('Erro ao excluir veículo');
  });

  // Teste para adicionarVeiculo
  // eslint-disable-next-line no-undef
  test('adicionarVeiculo adiciona veículo corretamente', async () => {
    const mockVeiculo = {
      placa: 'XYZ5678',
      marca_modelo: 'Honda Civic',
      cor: 'Preto',
      entrada: '2024-12-18T12:00:00Z',
    };

    mockClient.query.mockResolvedValueOnce(); // Simulando a inserção bem-sucedida no banco

    const result = await adicionarVeiculo(mockClient, mockVeiculo);

    // eslint-disable-next-line no-undef
    expect(mockClient.query).toHaveBeenCalledWith(
      'INSERT INTO veiculos (placa, marca_modelo, cor, entrada) VALUES ($1, $2, $3, $4)',
      ['XYZ5678', 'Honda Civic', 'Preto', '2024-12-18T12:00:00Z']
    );
    // eslint-disable-next-line no-undef
    expect(result).toBe(true);
  });

  // Teste para adicionarVeiculo (falha)
  // eslint-disable-next-line no-undef
  test('adicionarVeiculo lança erro ao falhar', async () => {
    const mockVeiculo = {
      placa: 'XYZ5678',
      marca_modelo: 'Honda Civic',
      cor: 'Preto',
      entrada: '2024-12-18T12:00:00Z',
    };

    mockClient.query.mockRejectedValueOnce(new Error('Erro de conexão'));

    // eslint-disable-next-line no-undef
    await expect(adicionarVeiculo(mockClient, mockVeiculo)).rejects.toThrow('Erro ao adicionar veículo');
  });
});
