document.addEventListener('DOMContentLoaded', () => {
  carregarVeiculos();
});

function carregarVeiculos() {
  const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
  const vehiclesTableBody = document.getElementById('vehiclesTable').getElementsByTagName('tbody')[0];

  vehicles.forEach(vehicle => {
    const row = vehiclesTableBody.insertRow();
    
    row.insertCell(0).textContent = vehicle.placa;
    row.insertCell(1).textContent = vehicle.marcaModelo;
    row.insertCell(2).textContent = new Date(vehicle.entrada).toLocaleString();

    // Definir tolerância e tarifa com valor padrão de 10, se não estiverem definidos
    const tolerancia = vehicle.tolerancia !== undefined ? vehicle.tolerancia : 10;
    const tarifa = vehicle.tarifa !== undefined ? vehicle.tarifa : 10;

    row.insertCell(3).textContent = tolerancia;
    row.insertCell(4).textContent = tarifa;

    // Exibir o valor recebido, mesmo que seja zero
    const valorRecebido = vehicle.valorRecebido !== undefined ? vehicle.valorRecebido : 0;
    row.insertCell(5).textContent = `R$ ${valorRecebido.toFixed(2).replace('.', ',')}`;
  });
}
