const { addEventListener } = require('../../js/adicionar');
const { Client } = require('pg');

// Mock do PostgreSQL
jest.mock('pg', () => {
  const mClient = {
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn(),
  };
  return { Client: jest.fn(() => mClient) };
});

// Mock do DOM
document.body.innerHTML = `
  <button id="addVehicleBtn"></button>
  <input id="marcaModelo" value="Toyota Corolla" />
  <input id="placa" value="ABC1234" />
  <input id="cor" value="Azul" />
`;

describe('Adicionar Veículo', () => {
  it('Deve adicionar um veículo ao clicar no botão', async () => {
    const client = new Client();
    addEventListener();

    document.getElementById('addVehicleBtn').click();

    expect(client.query).toHaveBeenCalledWith(
      'INSERT INTO veiculos (marca_modelo, placa, cor, entrada) VALUES ($1, $2, $3, $4)',
      ['Toyota Corolla', 'ABC1234', 'Azul', expect.any(String)]
    );
  });
});
