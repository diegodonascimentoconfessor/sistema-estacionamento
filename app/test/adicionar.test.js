const { addEventListener } = require('../../js/adicionar');
const { Client } = require('pg');

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

// Mock do DOM
document.body.innerHTML = `
  <button id="addVehicleBtn"></button>
  <input id="marcaModelo" value="Toyota Corolla" />
  <input id="placa" value="ABC1234" />
  <input id="cor" value="Azul" />
`;

// eslint-disable-next-line no-undef
describe('Adicionar Veículo', () => {
  // eslint-disable-next-line no-undef
  it('Deve adicionar um veículo ao clicar no botão', async () => {
    const client = new Client();
    addEventListener();

    document.getElementById('addVehicleBtn').click();

    // eslint-disable-next-line no-undef
    expect(client.query).toHaveBeenCalledWith(
      'INSERT INTO veiculos (marca_modelo, placa, cor, entrada) VALUES ($1, $2, $3, $4)',
      // eslint-disable-next-line no-undef
      ['Toyota Corolla', 'ABC1234', 'Azul', expect.any(String)]
    );
  });
});
