const { app, BrowserWindow, Menu, shell, ipcMain } = require('electron');
const path = require('path');

let mainWindow = null;
let pagamentoWindow = null;
let vagasWindow = null;
let pesquisaWindow = null;
let listaVeiculosWindow = null;
let relatoriosWindow = null; // Variável para a janela de relatórios financeiros
let financeiroWindow = null; // Variável para a nova janela de financeiro

app.on('ready', () => {
  console.log("Iniciando Electron");

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 920,
    resizable: false,
    icon: path.join(__dirname, 'assets', 'icone-estacionamento.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.maximize();
  Menu.setApplicationMenu(Menu.buildFromTemplate(createMenuTemplate()));
  mainWindow.loadFile(path.join(__dirname, 'app', 'index.html'));
});

const createMenuTemplate = () => [
  {
    label: 'Menu',
    submenu: [
      {
        label: 'Adicionar Veículo',
        click: () => mainWindow.webContents.send('menu-add-vehicle')
      },
      {
        label: 'Editar Veículo',
        click: () => mainWindow.webContents.send('menu-edit-vehicle')
      },
      {
        label: 'Excluir Veículo',
        click: () => mainWindow.webContents.send('menu-delete-vehicle')
      },
      {
        label: 'Pesquisar Placa',
        click: openPesquisaWindow
      },
      {
        label: 'Calcular Pagamento',
        click: openPagamentoWindow
      },
      {
        label: 'Vagas',
        click: openVagasWindow
      },
      { type: 'separator' },
      {
        label: 'Lista de Veículos Cadastrados',
        click: openListaVeiculosWindow
      },
      { type: 'separator' },
      {
        label: 'Relatórios Financeiros',
        click: openRelatoriosWindow
      },
      {
        label: 'Relatório Financeiro Detalhado',
        click: openFinanceiroWindow
      },
      { type: 'separator' },
      {
        label: 'Sair',
        click: () => app.quit(),
        accelerator: 'Alt+F4'
      }
    ]
  },
  {
    label: 'Ajuda',
    submenu: [
      {
        label: 'Manual do Usuário',
        click: () => shell.openExternal('https://drive.google.com/file/d/12JhKKndXFXm_xFKNp9yiLbwvQTBijOdm/view?usp=sharing')
      },
      {
        label: 'Ferramentas de Desenvolvedor',
        role: 'toggleDevTools'
      },
      { type: 'separator' },
      {
        label: 'Aplicar Zoom',
        role: 'zoomIn'
      },
      {
        label: 'Reduzir',
        role: 'zoomOut'
      },
      {
        label: 'Restaurar o Zoom',
        role: 'resetZoom'
      }
    ]
  }
];

function createWindow(windowName, filePath) {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: true,
    icon: path.join(__dirname, 'assets', 'icone-estacionamento.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile(path.join(__dirname, 'app', filePath));

  win.on('closed', () => {
    if (windowName === 'pagamento') pagamentoWindow = null;
    if (windowName === 'vagas') vagasWindow = null;
    if (windowName === 'pesquisa') pesquisaWindow = null;
    if (windowName === 'listaveiculos') listaVeiculosWindow = null;
    if (windowName === 'relatorios') relatoriosWindow = null;
    if (windowName === 'financeiro') financeiroWindow = null;
  });

  return win;
}

function openPesquisaWindow() {
  if (!pesquisaWindow) pesquisaWindow = createWindow('pesquisa', 'pesquisa.html');
}

function openPagamentoWindow() {
  if (!pagamentoWindow) pagamentoWindow = createWindow('pagamento', 'pagamento.html');
}

function openVagasWindow() {
  if (!vagasWindow) vagasWindow = createWindow('vagas', 'vagas.html');
}

function openListaVeiculosWindow() {
  if (!listaVeiculosWindow) listaVeiculosWindow = createWindow('listaveiculos', 'listaveiculos-cadastrados.html');
}

function openRelatoriosWindow() {
  if (!relatoriosWindow) relatoriosWindow = createWindow('relatorios', 'relatorio.html');
}

function openFinanceiroWindow() {
  if (!financeiroWindow) financeiroWindow = createWindow('financeiro', 'financeiro.html');
}

ipcMain.on('get-vehicles', (event) => {
  const veiculosCadastrados = [
    { placa: 'ABC1234', marca: 'Marca', modelo: 'Modelo' } // Exemplo de dados
  ];

  if (listaVeiculosWindow) {
    listaVeiculosWindow.webContents.send('listaveiculos-cadastrados', veiculosCadastrados);
  }
});
