// carregarveiculos.test.js
const { carregarListaVeiculos } = require('../../js/carregarveiculos');  // Verifique o caminho
const { Client } = require('pg');

jest.mock('pg', () => {
  return {
    Client: jest.fn().mockImplementation(() => {
      return {
        query: jest.fn(),
        end: jest.fn(),
      };
    }),
  };
});

describe('Carregar Lista de Veículos', () => {
  it('Deve carregar a lista de veículos do banco de dados e salvar no localStorage', async () => {
    const mockVehicles = [
      { placa: 'ABC1234', marca_modelo: 'Toyota Corolla', cor: 'Azul', entrada: new Date().toISOString() },
    ];

    // Simula a resposta da consulta
    const mockQuery = jest.fn().mockResolvedValue({ rows: mockVehicles });

    const client = new Client();
    client.query = mockQuery;  // Substitui o query mockado no client

    // Chama a função e espera pela execução
    await carregarListaVeiculos();

    // Verifica se a função query foi chamada corretamente
    expect(mockQuery).toHaveBeenCalledWith('SELECT * FROM veiculos');

    // Verifica se o localStorage foi atualizado corretamente
    expect(localStorage.setItem).toHaveBeenCalledWith('vehicles', JSON.stringify(mockVehicles));
  });
});
