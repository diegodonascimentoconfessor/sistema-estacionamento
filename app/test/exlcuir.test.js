const { excluirVeiculo } = require('../../js/app');  // Ajuste o caminho conforme necessário
const client = {
  query: jest.fn(),  // Mock da função query do cliente
};

describe('excluirVeiculo', () => {
  it('deve excluir um veículo com sucesso', async () => {
    const placa = 'ABC1234';

    // Simula o sucesso da operação
    client.query.mockResolvedValueOnce({ rowCount: 1 });

    const result = await excluirVeiculo(client, placa);

    // Verifica se a função query foi chamada com os parâmetros corretos
    expect(client.query).toHaveBeenCalledWith('DELETE FROM veiculos WHERE placa = $1', [placa]);
    
    // Verifica se a função retorna true quando a exclusão é bem-sucedida
    expect(result).toBe(true);
  });

  it('deve lançar um erro quando ocorrer falha ao excluir o veículo', async () => {
    const placa = 'ABC1234';

    // Simula uma falha na operação
    client.query.mockRejectedValueOnce(new Error('Erro ao excluir veículo'));

    try {
      await excluirVeiculo(client, placa);
    } catch (error) {
      // Verifica se o erro correto foi lançado
      expect(error).toEqual(new Error('Erro ao excluir veículo'));
    }
  });
});
