// Importações do Firestore
import { db } from '../firebase-config.js';
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const capacidadeTotal = 100; // Defina a capacidade total de vagas

// Função para adicionar um veículo
document.getElementById('addVehicleBtn').addEventListener('click', async () => {
  const marcaModelo = document.getElementById('marcaModelo').value;
  const placa = document.getElementById('placa').value;
  const cor = document.getElementById('cor').value;
  const entrada = new Date().toISOString();

  if (marcaModelo && placa && cor) {
    const newVehicle = { marcaModelo, placa, cor, entrada };

    // Salvar no Firebase Firestore
    try {
      await addDoc(collection(db, 'veiculos'), newVehicle);
      console.log('Veículo adicionado ao Firebase Firestore');
      atualizarVagas(); // Atualizar vagas após adicionar veículo
      carregarListaVeiculos(); // Recarregar a lista de veículos
    } catch (error) {
      console.error('Erro ao adicionar no Firebase Firestore:', error);
    }

    // Limpar os campos após adicionar o veículo
    document.getElementById('marcaModelo').value = '';
    document.getElementById('placa').value = '';
    document.getElementById('cor').value = '';
  }
});

// Função para atualizar vagas
async function atualizarVagas() {
  try {
    const veiculosCollection = collection(db, 'veiculos');
    const veiculosSnapshot = await getDocs(veiculosCollection);
    const vagasOcupadas = veiculosSnapshot.size;
    const vagasDisponiveis = capacidadeTotal - vagasOcupadas;

    // Atualizar elementos na página
    const vagasDisponiveisEl = document.getElementById('vagasDisponiveis');
    const vagasOcupadasEl = document.getElementById('vagasOcupadas');

    vagasDisponiveisEl.textContent = vagasDisponiveis;
    vagasOcupadasEl.textContent = vagasOcupadas;

    // Aplicar cores: verde para vagas disponíveis e vermelho para vagas ocupadas
    vagasDisponiveisEl.style.color = 'green';
    vagasOcupadasEl.style.color = 'red';
  } catch (error) {
    console.error('Erro ao calcular vagas:', error);
  }
}

// Função para carregar a lista de veículos do Firebase Firestore
async function carregarListaVeiculos() {
  try {
    const veiculosCollection = collection(db, 'veiculos');
    const veiculosSnapshot = await getDocs(veiculosCollection);
    const vehicles = veiculosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    renderVeiculos(vehicles); // Renderizar a lista de veículos
  } catch (error) {
    console.error('Erro ao carregar veículos do Firebase Firestore:', error);
  }
}

// Função para renderizar a lista de veículos cadastrados em tabela
function renderVeiculos(vehicles) {
  const veiculosList = document.getElementById('veiculosCadastrados');
  veiculosList.innerHTML = ''; // Limpar a lista antes de renderizar os dados

  // Iterar sobre os veículos e renderizar cada um na tabela
  vehicles.forEach(vehicle => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${vehicle.placa}</td>
      <td>${vehicle.marcaModelo}</td>
      <td>${vehicle.cor}</td>
      <td>${new Date(vehicle.entrada).toLocaleString()}</td>
      <td>
        <button onclick="excluirVeiculo('${vehicle.id}')">Excluir</button>
        <button onclick="window.location.href='pagamento.html?placa=${vehicle.placa}&marcaModelo=${vehicle.marcaModelo}&cor=${vehicle.cor}'">Pagamento</button>
      </td>
    `;
    veiculosList.appendChild(tr); // Adicionar a linha à tabela
  });
}

// Função para excluir veículo
window.excluirVeiculo = async function (id) {
  try {
    await deleteDoc(doc(db, 'veiculos', id));
    console.log('Veículo excluído do Firebase Firestore');
    carregarListaVeiculos(); // Recarregar a lista de veículos
    atualizarVagas(); // Atualizar vagas após exclusão
  } catch (error) {
    console.error('Erro ao excluir veículo:', error);
  }
};

// Função para buscar veículos no Firebase Firestore
document.getElementById('searchBtn').addEventListener('click', async () => {
  const searchPlaca = document.getElementById('searchPlaca').value.toUpperCase();

  try {
    const veiculosCollection = collection(db, 'veiculos');
    const q = query(veiculosCollection, where('placa', '>=', searchPlaca), where('placa', '<=', searchPlaca + '\uf8ff'));
    const veiculosSnapshot = await getDocs(q);
    const filteredVehicles = veiculosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    mostrarResultadoPesquisa(filteredVehicles);
  } catch (error) {
    console.error('Erro ao buscar veículos:', error);
  }
});

// Exibir resultados da pesquisa
function mostrarResultadoPesquisa(vehicles) {
  const resultadoContainer = document.getElementById('resultadoPesquisa');
  resultadoContainer.innerHTML = '';

  if (vehicles.length > 0) {
    vehicles.forEach(vehicle => {
      const div = document.createElement('div');
      div.classList.add('vehicle-result');
      div.textContent = `Placa: ${vehicle.placa},  Marca/Modelo: ${vehicle.marcaModelo},  Cor: ${vehicle.cor} , Entrada: ${new Date(vehicle.entrada).toLocaleString()}`;
      resultadoContainer.appendChild(div);
    });
  } else {
    resultadoContainer.textContent = 'Nenhum veículo encontrado com a placa fornecida.';
  }
}

// Carregar lista de veículos e atualizar vagas ao carregar a página
carregarListaVeiculos();
atualizarVagas();