function atualizarVagas() {
  const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
  const vagasTotais = 50;
  const vagasOcupadas = vehicles.length;
  const vagasDisponiveis = vagasTotais - vagasOcupadas;

  document.getElementById('vagasOcupadas').textContent = vagasOcupadas;
  document.getElementById('vagasDisponiveis').textContent = vagasDisponiveis;
}

function voltar() {
  window.history.back();
}

window.addEventListener('DOMContentLoaded', () => {
  atualizarVagas();
  
  // Adiciona o evento de clique ao botão "Voltar"
  const backButton = document.querySelector('.back-button');
  if (backButton) {
      backButton.addEventListener('click', voltar);
  }
});
