document.addEventListener('DOMContentLoaded', () => {
  carregarVeiculos();
  carregarPagamentos();
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
    row.insertCell(5).textContent = pagamento.valor.toLocaleString();
  });
}

function carregarPagamentos() {
  const pagamentos = JSON.parse(localStorage.getItem('pagamentos')) || [];
  const paymentsTableBody = document.getElementById('paymentsTable').getElementsByTagName('tbody')[0];

  pagamentos.forEach(pagamento => {
    const row = paymentsTableBody.insertRow();
    
    row.insertCell(0).textContent = pagamento.id;
    row.insertCell(1).textContent = pagamento.valor;
    row.insertCell(2).textContent = pagamento.data;
  });
}
