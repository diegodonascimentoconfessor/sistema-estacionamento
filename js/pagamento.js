// Variáveis globais
let valorPagamentoGlobal = 0;
let entradaGlobal = '';
let saidaGlobal = '';
let metodoPagamentoGlobal = '';
let numeroCartaoGlobal = '';
let nomeTitularGlobal = '';
let validadeCartaoGlobal = '';
let cvvCartaoGlobal = '';

// Atualizar data e hora em tempo real
function atualizarEntrada() {
  const agora = new Date();
  const ano = agora.getFullYear();
  const mes = String(agora.getMonth() + 1).padStart(2, '0');
  const dia = String(agora.getDate()).padStart(2, '0');
  const hora = String(agora.getHours()).padStart(2, '0');
  const minuto = String(agora.getMinutes()).padStart(2, '0');
  document.getElementById('entradaPagamento').value = `${ano}-${mes}-${dia}T${hora}:${minuto}`;
}

// Atualiza a entrada a cada minuto
setInterval(atualizarEntrada, 60000);

// Evento para exibir os campos de cartão conforme o método de pagamento
document.getElementById('metodoPagamento').addEventListener('change', function() {
  const metodoPagamento = this.value;
  const cartaoInfo = document.getElementById('cartaoInfo');

  cartaoInfo.style.display = (metodoPagamento === 'credito' || metodoPagamento === 'debito') ? 'block' : 'none';
});

// Eventos para botões
document.getElementById('calcPagamentoBtn').addEventListener('click', calcularPagamento);
document.getElementById('gerarCupomBtn').addEventListener('click', gerarCupom);
document.getElementById('voltarBtn').addEventListener('click', function() {
  window.location.href = 'index.html';
});

// Função para calcular pagamento
function calcularPagamento() {
  const placaVeiculo = document.getElementById('placaVeiculo').value;
  const entrada = document.getElementById('entradaPagamento').value;
  const metodoPagamento = document.getElementById('metodoPagamento').value;

  if (!placaVeiculo || !entrada) {
    alert('Por favor, preencha todos os campos necessários.');
    return;
  }

  if (metodoPagamento === 'credito' || metodoPagamento === 'debito') {
    const numeroCartao = document.getElementById('numeroCartao').value;
    const nomeTitular = document.getElementById('nomeTitular').value;
    const validadeCartao = document.getElementById('validadeCartao').value;
    const cvvCartao = document.getElementById('cvvCartao').value;

    if (!numeroCartao || !nomeTitular || !validadeCartao || !cvvCartao) {
      alert('Por favor, preencha todos os campos do cartão.');
      return;
    }

    numeroCartaoGlobal = numeroCartao;
    nomeTitularGlobal = nomeTitular;
    validadeCartaoGlobal = validadeCartao;
    cvvCartaoGlobal = cvvCartao;
  }

  const entradaDate = new Date(entrada);
  const saidaDate = new Date();
  const diffMs = saidaDate - entradaDate;
  const diffHrs = diffMs / (1000 * 60 * 60);
  
  const valorPagamento = diffHrs * 10; // Substitua "10" pelo valor fixo desejado
  valorPagamentoGlobal = valorPagamento;
  entradaGlobal = entrada;
  saidaGlobal = saidaDate.toISOString();
  metodoPagamentoGlobal = metodoPagamento;

  document.getElementById('valorPagamento').innerText = `R$ ${valorPagamento.toFixed(2)}`;
  document.getElementById('gerarCupomBtn').style.display = 'inline-block';

  // Armazenar o valor de pagamento no localStorage
  let veiculos = JSON.parse(localStorage.getItem('vehicles')) || [];
  let veiculoExistente = veiculos.find(v => v.placa === placaVeiculo);
  
  if (veiculoExistente) {
    veiculoExistente.valorRecebido = valorPagamentoGlobal;
  } else {
    veiculos.push({
      placa: placaVeiculo,
      marcaModelo: document.getElementById('marcaModelo').value,
      cor: document.getElementById('corVeiculo').value,
      entrada: entradaGlobal,
      valorRecebido: valorPagamentoGlobal
    });
  }

  localStorage.setItem('vehicles', JSON.stringify(veiculos));
}

// Função para gerar cupom
function gerarCupom() {
  const placaVeiculo = document.getElementById('placaVeiculo').value;
  const marcaModelo = document.getElementById('marcaModelo').value;
  const corVeiculo = document.getElementById('corVeiculo').value;

  const cupomWindow = window.open('', 'Cupom', 'width=600,height=400');
  cupomWindow.document.write(`
    <html>
    <head>
      <title>Cupom de Pagamento - Autopark</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; }
        .header { text-align: center; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 20px; }
        .header h1 { margin: 0; }
        .details { border: 1px solid #ddd; border-radius: 8px; padding: 20px; }
        .details p { margin: 5px 0; }
        .footer { text-align: center; border-top: 1px solid #ddd; padding-top: 10px; margin-top: 20px; }
        .footer p { margin: 5px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Cupom de Pagamento</h1>
          <p>Autopark</p>
        </div>
        <div class="details">
          <p><strong>Placa do Veículo:</strong> ${placaVeiculo}</p>
          <p><strong>Marca e Modelo:</strong> ${marcaModelo}</p>
          <p><strong>Cor:</strong> ${corVeiculo}</p>
          <p><strong>Entrada:</strong> ${entradaGlobal}</p>
          <p><strong>Saída:</strong> ${saidaGlobal}</p>
          <p><strong>Valor Pago:</strong> R$ ${valorPagamentoGlobal.toFixed(2)}</p>
          <p><strong>Método de Pagamento:</strong> ${metodoPagamentoGlobal}</p>
        </div>
        <div class="footer">
          <p>Obrigado por usar o Autopark!</p>
          <p>Para mais informações, visite nosso site.</p>
        </div>
      </div>
    </body>
    </html>
  `);

  cupomWindow.document.close();
  cupomWindow.print();
}

document.addEventListener('DOMContentLoaded', function() {
  const veiculo = JSON.parse(localStorage.getItem('selectedVehicle'));
  
  if (veiculo) {
    document.getElementById('placaVeiculo').value = veiculo.placa;
    document.getElementById('marcaModelo').value = veiculo.marcaModelo;
    document.getElementById('corVeiculo').value = veiculo.cor;
    document.getElementById('entradaPagamento').value = veiculo.entrada ? veiculo.entrada.substring(0, 16) : '';
  }

  atualizarEntrada(); // Atualiza a entrada ao carregar a página
});

// Função para calcular pagamento
function calcularPagamento() {
  const placaVeiculo = document.getElementById('placaVeiculo').value;
  const entrada = document.getElementById('entradaPagamento').value;
  const metodoPagamento = document.getElementById('metodoPagamento').value;

  if (!placaVeiculo || !entrada) {
    alert('Por favor, preencha todos os campos necessários.');
    return;
  }

  if (metodoPagamento === 'credito' || metodoPagamento === 'debito') {
    const numeroCartao = document.getElementById('numeroCartao').value;
    const nomeTitular = document.getElementById('nomeTitular').value;
    const validadeCartao = document.getElementById('validadeCartao').value;
    const cvvCartao = document.getElementById('cvvCartao').value;

    if (!numeroCartao || !nomeTitular || !validadeCartao || !cvvCartao) {
      alert('Por favor, preencha todos os campos do cartão.');
      return;
    }

    numeroCartaoGlobal = numeroCartao;
    nomeTitularGlobal = nomeTitular;
    validadeCartaoGlobal = validadeCartao;
    cvvCartaoGlobal = cvvCartao;
  }

  const entradaDate = new Date(entrada);
  const saidaDate = new Date();
  const diffMs = saidaDate - entradaDate;
  const diffHrs = diffMs / (1000 * 60 * 60);
  
  const valorPagamento = diffHrs * 10; // Substitua "10" pelo valor fixo desejado
  valorPagamentoGlobal = valorPagamento;
  entradaGlobal = entrada;
  saidaGlobal = saidaDate.toISOString();
  metodoPagamentoGlobal = metodoPagamento;

  document.getElementById('valorPagamento').innerText = `R$ ${valorPagamento.toFixed(2)}`;
  document.getElementById('gerarCupomBtn').style.display = 'inline-block';

  // Armazenar o valor de pagamento no localStorage
  let veiculos = JSON.parse(localStorage.getItem('vehicles')) || [];
  let veiculoExistente = veiculos.find(v => v.placa === placaVeiculo);
  
  if (veiculoExistente) {
    veiculoExistente.valorRecebido = valorPagamentoGlobal;
  } else {
    veiculos.push({
      placa: placaVeiculo,
      marcaModelo: document.getElementById('marcaModelo').value,
      cor: document.getElementById('corVeiculo').value,
      entrada: entradaGlobal,
      valorRecebido: valorPagamentoGlobal
    });
  }

  localStorage.setItem('vehicles', JSON.stringify(veiculos));

  // Armazenar os pagamentos realizados separadamente
  let pagamentos = JSON.parse(localStorage.getItem('payments')) || [];
  pagamentos.push({
    id: pagamentos.length + 1, // ID simples para exemplificação
    placa: placaVeiculo,
    valor: valorPagamentoGlobal,
    dataPagamento: saidaGlobal
  });
  localStorage.setItem('payments', JSON.stringify(pagamentos));
}

