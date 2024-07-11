/* Exemplo de dados de veículos
//const vagasData = [
    { placa: 'ABC-1234', entrada: '', vaga:  },
    { placa: 'DEF-5678', entrada: '', vaga:  },
    // Adicione mais dados conforme necessário
  ];*/
  
  const totalVagas = 100; // Defina o número total de vagas
  
  document.addEventListener('DOMContentLoaded', () => {
    const vagasTableBody = document.querySelector('#vagasTable tbody');
    const vagasOcupadasEl = document.getElementById('vagasOcupadas');
    const vagasDisponiveisEl = document.getElementById('vagasDisponiveis');
  
    // Preenche a tabela com os dados dos veículos
    vagasData.forEach(vaga => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${vaga.placa}</td>
        <td>${new Date(vaga.entrada).toLocaleString()}</td>
        <td>${vaga.vaga}</td>
      `;
      vagasTableBody.appendChild(row);
    });
  
    // Calcula e atualiza o número de vagas ocupadas e disponíveis
    const vagasOcupadas = vagasData.length;
    const vagasDisponiveis = totalVagas - vagasOcupadas;
  
    vagasOcupadasEl.textContent = vagasOcupadas;
    vagasDisponiveisEl.textContent = vagasDisponiveis;
  });
  