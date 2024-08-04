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



document.addEventListener('DOMContentLoaded', function() {
  var placa = localStorage.getItem('placa');
  var marcaModelo = localStorage.getItem('marcaModelo');
  var entrada = localStorage.getItem('entrada');
  var tolerancia = localStorage.getItem('tolerancia');
  var tarifa = localStorage.getItem('tarifa');
  var valorPagamento = localStorage.getItem('valorPagamento');

  if (placa && marcaModelo && entrada && valorPagamento) {
    var table = document.getElementById('vehiclesTable').getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();

    newRow.insertCell(0).textContent = placa;
    newRow.insertCell(1).textContent = marcaModelo;
    newRow.insertCell(2).textContent = entrada;
    newRow.insertCell(3).textContent = tolerancia;
    newRow.insertCell(4).textContent = tarifa;
    newRow.insertCell(5).textContent = 'R$ ' + parseFloat(valorPagamento).toFixed(2);

    // Limpa o localStorage após usar os dados
    localStorage.removeItem('placa');
    localStorage.removeItem('marcaModelo');
    localStorage.removeItem('entrada');
    localStorage.removeItem('tolerancia');
    localStorage.removeItem('tarifa');
    localStorage.removeItem('valorPagamento');
  }
});
