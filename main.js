const { app, BrowserWindow, Menu, shell, ipcMain } = require('electron');
const path = require('path');

let mainWindow = null;
let pagamentoWindow = null;
let vagasWindow = null;
let pesquisaWindow = null;
let listaVeiculosWindow = null;
let relatoriosWindow = null; // Adicionando a variável para a janela de relatórios financeiros

app.on('ready', () => {
  console.log("Iniciando Electron");
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 1000,
    resizable: true,
    icon: 'assets/icone-estacionamento.png',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  Menu.setApplicationMenu(Menu.buildFromTemplate(createMenuTemplate()));
  mainWindow.loadFile('app/index.html');
});

const createMenuTemplate = () => [
  {
    label: 'Menu',
    submenu: [
      {
        label: 'Adicionar Veículo',
        click: () => {
          mainWindow.webContents.send('menu-add-vehicle');
        }
      },
      {
        label: 'Editar Veículo',
        click: () => {
          mainWindow.webContents.send('menu-edit-vehicle');
        }
      },
      {
        label: 'Excluir Veículo',
        click: () => {
          mainWindow.webContents.send('menu-delete-vehicle');
        }
      },
      {
        label: 'Pesquisar Placa',
        click: () => {
          openPesquisaWindow();
        }
      },
      {
        label: 'Calcular Pagamento',
        click: () => {
          openPagamentoWindow();
        }
      },
      {
        label: 'Vagas',
        click: () => {
          openVagasWindow();
        }
      },
      { type: 'separator' },
      {
        label: 'Lista de Veículos Cadastrados',
        click: () => {
          openListaVeiculosWindow();
        }
      },
      { type: 'separator' },
      {
        label: 'Relatórios Financeiros',
        click: () => {
          openRelatoriosWindow();
        }
      },
      { type: 'separator' },
      {
        label: 'Sair',
        click: () => {
          app.quit();
        },
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
      }
    ]
  }
];

function openPesquisaWindow() {
  pesquisaWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: true,
    icon: path.join(__dirname, 'assets', 'icone-estacionamento.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  pesquisaWindow.loadFile(path.join(__dirname, 'app', 'pesquisa.html'));

  pesquisaWindow.on('closed', () => {
    pesquisaWindow = null;
  });
}

function openPagamentoWindow() {
  if (!pagamentoWindow) {
    pagamentoWindow = new BrowserWindow({
      width: 800,
      height: 600,
      resizable: true,
      icon: path.join(__dirname, 'assets', 'icone-estacionamento.png'),
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
    });

    pagamentoWindow.loadFile(path.join(__dirname, 'app', 'pagamento.html'));

    pagamentoWindow.on('closed', () => {
      pagamentoWindow = null;
    });
  }
}

function openVagasWindow() {
  if (!vagasWindow) {
    vagasWindow = new BrowserWindow({
      width: 800,
      height: 600,
      resizable: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
    });

    vagasWindow.loadFile(path.join(__dirname, 'app', 'vagas.html'));

    vagasWindow.on('closed', () => {
      vagasWindow = null;
    });
  }
}

function openListaVeiculosWindow() {
  if (!listaVeiculosWindow) {
    listaVeiculosWindow = new BrowserWindow({
      width: 800,
      height: 600,
      resizable: true,
      icon: path.join(__dirname, 'assets', 'icone-estacionamento.png'),
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
    });

    listaVeiculosWindow.loadFile(path.join(__dirname, 'app', 'listaveiculos-cadastrados.html'));

    listaVeiculosWindow.on('closed', () => {
      listaVeiculosWindow = null;
    });
  }
}

function openRelatoriosWindow() {
  if (!relatoriosWindow) {
    relatoriosWindow = new BrowserWindow({
      width: 800,
      height: 600,
      resizable: true,
      icon: path.join(__dirname, 'assets', 'icone-estacionamento.png'),
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
    });

    relatoriosWindow.loadFile(path.join(__dirname, 'app', 'relatorio.html'));

    relatoriosWindow.on('closed', () => {
      relatoriosWindow = null;
    });
  }
}

ipcMain.on('get-vehicles', (event) => {
  const veiculosCadastrados = [
    { placa: '', marca: '', modelo: '' }
  ];

  if (listaVeiculosWindow) {
    listaVeiculosWindow.webContents.send('listaveiculos-cadastrados', veiculosCadastrados);
  }
});

