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
    row.insertCell(3).textContent = vehicle.tolerancia;
    row.insertCell(4).textContent = vehicle.tarifa;
    row.insertCell(5).textContent = vehicle.valorRecebido ? `R$ ${vehicle.valorRecebido.toFixed(2)}` : 'N/A'; // Exibe o valor recebido, se disponível
  });
}
