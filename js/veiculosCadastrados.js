// JavaScript (veiculosCadastrados.js)
function carregarListaVeiculos() {
  const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
  const veiculosList = document.getElementById('veiculos-list');

  if (veiculosList) {
    veiculosList.innerHTML = '';

    vehicles.forEach((vehicle) => {
      const vehicleElement = document.createElement('div');
      vehicleElement.classList.add('vehicle-item');
      vehicleElement.innerHTML = `
        <p><strong>Placa:</strong> ${vehicle.placa}</p>
        <p><strong>Marca/Modelo:</strong> ${vehicle.marcaModelo}</p>
        <p><strong>Entrada:</strong> ${new Date(vehicle.entrada).toLocaleString()}</p>
      `;

      const payBtn = document.createElement('button');
      payBtn.textContent = 'Pagamento';
      payBtn.addEventListener('click', () => {
        calcularPagamentoVeiculo(vehicle);
      });
      vehicleElement.appendChild(payBtn);

      veiculosList.appendChild(vehicleElement);
    });
  }
}

function calcularPagamentoVeiculo(vehicle) {
  const entradaDate = new Date(vehicle.entrada);
  const saidaDate = new Date();
  const diffMs = saidaDate - entradaDate;
  const diffHrs = diffMs / (1000 * 60 * 60);
  const diffHrsComTolerancia = Math.max(diffHrs - (parseInt(vehicle.tolerancia) / 60), 0);

  const valorPagamento = diffHrsComTolerancia * parseFloat(vehicle.tarifa);

  window.location.href = `pagamento.html?valor=${valorPagamento.toFixed(2)}`;
}

window.addEventListener('DOMContentLoaded', () => {
  carregarListaVeiculos();
});

function openNav() {
  document.getElementById("sidebar").style.width = "200px";
  document.getElementById("main").style.marginLeft = "200px";
}

function closeNav() {
  document.getElementById("sidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelector('.openbtn').addEventListener('click', openNav);
  document.querySelector('.closebtn').addEventListener('click', closeNav);
});
