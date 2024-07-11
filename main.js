const { app, BrowserWindow, Menu, shell, ipcMain } = require('electron');
let mainWindow = null;
let pagamentoWindow = null;
let vagasWindow = null;
let pesquisaWindow = null;

app.on('ready', () => {
  console.log("Iniciando Electron");
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
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
        label: 'Calcular Pagamento',
        click: () => {
          abrirPagamentoWindow();
        }
      },
      {
        label: 'Vagas',
        click: () => {
          abrirVagasWindow();
        }
      },
      {
        label: 'Sair',
        click: () => app.quit(),
        accelerator: 'Alt+F4'
      },
    ]
  },
  {
    label: 'Exibir',
    submenu: [
      {
        type: 'separator'
      },
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
      },
      {
        type: 'separator'
      },
      {
        label: 'Ferramenta de Desenvolvedor',
        role: 'toggleDevTools'
      },
    ]
  },
  {
    label: 'Ajuda',
    submenu: [
      {
        label: 'Documentação',
        click: () => {
          shell.openExternal('https://electronjs.org/docs');
        }
      },
      {
        label: 'Sobre',
        click: () => abrirSobreWindow()
      },
      {
        label: 'Pesquisa de Placas',
        click: () => {
          abrirPesquisaWindow();
        }
      },
    ]
  }
];

const abrirSobreWindow = () => {
  const sobre = new BrowserWindow({
    width: 800,
    height: 800,
    resizable: false,
    autoHideMenuBar: true,
  });
  sobre.loadFile('app/sobre.html');
}

const abrirPagamentoWindow = () => {
  if (pagamentoWindow) {
    pagamentoWindow.focus();
    return;
  }

  pagamentoWindow = new BrowserWindow({
    width: 600,
    height: 400,
    resizable: true,
    icon: 'assets/icone-estacionamento.png',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  pagamentoWindow.loadFile('app/pagamento.html');

  pagamentoWindow.on('closed', () => {
    pagamentoWindow = null;
  });
}

const abrirVagasWindow = () => {
  if (vagasWindow) {
    vagasWindow.focus();
    return;
  }

  vagasWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: true,
    icon: 'assets/icone-estacionamento.png',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  vagasWindow.loadFile('app/vagas.html');

  vagasWindow.on('closed', () => {
    vagasWindow = null;
  });
}

const abrirPesquisaWindow = () => {
  if (pesquisaWindow) {
    pesquisaWindow.focus();
    return;
  }

  pesquisaWindow = new BrowserWindow({
    width: 600,
    height: 400,
    resizable: true,
    icon: 'assets/icone-estacionamento.png',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  pesquisaWindow.loadFile('app/pesquisa.html');

  pesquisaWindow.on('closed', () => {
    pesquisaWindow = null;
  });
}

ipcMain.on('open-pagamento-window', () => {
  abrirPagamentoWindow();
});

ipcMain.on('open-pesquisa-window', () => {
  abrirPesquisaWindow();
});
