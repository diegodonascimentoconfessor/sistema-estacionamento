const { excluirVeiculo } = require('../../js/autopark1');  // Ajuste o caminho conforme necessário
const client = {
  // eslint-disable-next-line no-undef
  query: jest.fn(),  // Mock da função query do cliente
};

// eslint-disable-next-line no-undef
describe('excluirVeiculo', () => {
  // eslint-disable-next-line no-undef
  it('deve excluir um veículo com sucesso', async () => {
    const placa = 'ABC1234';

    // Simula o sucesso da operação
    client.query.mockResolvedValueOnce({ rowCount: 1 });

    const result = await excluirVeiculo(client, placa);

    // Verifica se a função query foi chamada com os parâmetros corretos
    // eslint-disable-next-line no-undef
    expect(client.query).toHaveBeenCalledWith('DELETE FROM veiculos WHERE placa = $1', [placa]);
    
    // Verifica se a função retorna true quando a exclusão é bem-sucedida
    // eslint-disable-next-line no-undef
    expect(result).toBe(true);
  });

  // eslint-disable-next-line no-undef
  it('deve lançar um erro quando ocorrer falha ao excluir o veículo', async () => {
    const placa = 'ABC1234';

    // Simula uma falha na operação
    client.query.mockRejectedValueOnce(new Error('Erro ao excluir veículo'));

    try {
      await excluirVeiculo(client, placa);
    } catch (error) {
      // Verifica se o erro correto foi lançado
      // eslint-disable-next-line no-undef
      expect(error).toEqual(new Error('Erro ao excluir veículo'));
    }
  });
});
