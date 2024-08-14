window.onload = function() {
    function getQueryParams() {
      var params = {};
      var search = window.location.search.substring(1);
      var queries = search.split("&");

      for (var i = 0; i < queries.length; i++) {
        var pair = queries[i].split("=");
        params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
      }

      return params;
    }

    var params = getQueryParams();

    // Preencha os campos com os valores dos parâmetros
    if (params.marcaModelo) {
      document.getElementById('marcaModelo').value = params.marcaModelo;
    }
    if (params.placa) {
      document.getElementById('placaVeiculo').value = params.placa;
    }
    if (params.cor) {
      document.getElementById('cor').value = params.cor;
    }

   
    function updateDateTime() {
      var now = new Date();
      var offset = -3; 
      var localTime = new Date(now.getTime() + (offset * 60 * 60 * 1000));
      var isoString = localTime.toISOString().slice(0, 16); 
      document.getElementById('entradaPagamento').value = isoString;
    }

    
    updateDateTime();

    setInterval(updateDateTime, 1000);
  };








const tarifaPorSegundo = 0.00278; 

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calcPagamentoBtn').addEventListener('click', calcularPagamento);
    document.getElementById('gerarCupomBtn').addEventListener('click', gerarCupom);
    document.getElementById('voltarBtn').addEventListener('click', function() {
        window.location.href = 'index.html';
    });
});

function formatarData(data) {
    const opcoes = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Intl.DateTimeFormat('pt-BR', opcoes).format(new Date(data));
}

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

        
        localStorage.setItem('numeroCartao', numeroCartao);
        localStorage.setItem('nomeTitular', nomeTitular);
        localStorage.setItem('validadeCartao', validadeCartao);
        localStorage.setItem('cvvCartao', cvvCartao);
    }

    const entradaDate = new Date(entrada);
    const saidaDate = new Date(); 

    const diffMs = saidaDate - entradaDate;
    const diffSegundos = diffMs / 1000; 

    const valorPagamento = diffSegundos * tarifaPorSegundo;


    const pagamentoData = {
        placaVeiculo,
        entrada: entradaDate.toISOString(),
        saida: saidaDate.toISOString(),
        valorPagamento,
        metodoPagamento
    };

    localStorage.setItem('pagamentoData', JSON.stringify(pagamentoData));

    document.getElementById('valorPagamento').innerText = `R$ ${valorPagamento.toFixed(2)}`;
    document.getElementById('gerarCupomBtn').style.display = 'inline-block';
}

function gerarCupom() {
    const pagamentoData = JSON.parse(localStorage.getItem('pagamentoData'));
    const cupom = `
        <html>
            <head>
                <title>Cupom</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #FFFFE0;
                        color: #000000;
                        padding: 20px;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 10px;
                        border: 1px solid #000000;
                        border-radius: 5px;
                        background-color: #FFFFFF;
                    }
                    h2 {
                        text-align: center;
                        color: #000000;
                        margin-bottom: 20px;
                    }
                    p {
                        margin: 5px 0;
                    }
                    .footer {
                        text-align: center;
                        margin-top: 20px;
                        font-weight: bold;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Cupom de Pagamento AutoPark</h2>
                    <p><strong>Placa:</strong> ${pagamentoData.placaVeiculo}</p>
                    <p><strong>Entrada:</strong> ${formatarData(pagamentoData.entrada)}</p>
                    <p><strong>Saída:</strong> ${formatarData(pagamentoData.saida)}</p>
                    <p><strong>Valor a Pagar:</strong> R$ ${pagamentoData.valorPagamento.toFixed(2)}</p>
                    <p class="footer">Obrigado e Volte Sempre!</p>
                </div>
            </body>
        </html>
    `;
    
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(cupom);
    printWindow.document.close();
    printWindow.print();
}


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
  }

  const entradaDate = new Date(entrada);
  const saidaDate = new Date(); 

  const diffMs = saidaDate - entradaDate;
  const diffSegundos = diffMs / 1000;

  const valorPagamento = diffSegundos * tarifaPorSegundo;

  const pagamentoData = {
      placaVeiculo,
      entrada: entradaDate.toISOString(),
      saida: saidaDate.toISOString(),
      valorPagamento,
      metodoPagamento
  };

  localStorage.setItem('pagamentoData', JSON.stringify(pagamentoData));

  document.getElementById('valorPagamento').innerText = `R$ ${valorPagamento.toFixed(2)}`;
  document.getElementById('gerarCupomBtn').style.display = 'inline-block';
}
