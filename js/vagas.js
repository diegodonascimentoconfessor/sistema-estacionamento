function atualizarVagas() {
    const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
    const vagasTotais = 50;
    const vagasOcupadas = vehicles.length;
    const vagasDisponiveis = vagasTotais - vagasOcupadas;
  
    document.getElementById('vagasOcupadas').textContent = vagasOcupadas;
    document.getElementById('vagasDisponiveis').textContent = vagasDisponiveis;
  }
  
  window.addEventListener('DOMContentLoaded', () => {
    atualizarVagas();
  });
  