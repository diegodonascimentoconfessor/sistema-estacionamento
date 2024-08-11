document.getElementById('searchPlaca').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
    const filteredVehicles = vehicles.filter(vehicle => 
        vehicle.placa.toLowerCase().includes(query) ||
        vehicle.marcaModelo.toLowerCase().includes(query) ||
        vehicle.cor.toLowerCase().includes(query)
    );
    exibirResultadoPesquisa(filteredVehicles);
});

function exibirResultadoPesquisa(vehicles) {
    const resultadoPesquisa = document.getElementById('resultadoPesquisa');
    resultadoPesquisa.innerHTML = '';

    if (vehicles.length > 0) {
        vehicles.forEach(vehicle => {
            const div = document.createElement('div');
            div.classList.add('resultado-item');
            div.textContent = `Placa: ${vehicle.placa}, Marca/Modelo: ${vehicle.marcaModelo}, Cor: ${vehicle.cor}, Entrada: ${new Date(vehicle.entrada).toLocaleString()}`;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Excluir';
            deleteBtn.addEventListener('click', () => {
                excluirVeiculo(vehicle.placa);
            });
            div.appendChild(deleteBtn);

            const payBtn = document.createElement('button');
            payBtn.textContent = 'Pagamento';
            payBtn.addEventListener('click', () => {
                window.location.href = `pagamento.html?placa=${vehicle.placa}`;
            });
            div.appendChild(payBtn);

            resultadoPesquisa.appendChild(div);
        });
    } else {
        resultadoPesquisa.textContent = 'Nenhum veículo encontrado.';
    }
}

function excluirVeiculo(placa) {
    let vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
    vehicles = vehicles.filter(vehicle => vehicle.placa !== placa);
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
    document.getElementById('searchPlaca').dispatchEvent(new Event('input')); // Atualiza a lista
}
