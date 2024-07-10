const { app, BrowserWindow, Menu, shell, ipcMain } = require('electron');
let mainWindow = null;
let pagamentoWindow = null;

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
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  mainWindow.loadFile('app/index.html');
});

// Criando Template Menu 
const template = [
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
        click: () =>  janelasobre()
      },
      {
        label: 'Calcular Pagamento',
        click: () => {
          abrirPagamentoWindow();
        }
      }
    ]
  }
];

const janelasobre = () => {
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
    resizable: false,
    autoHideMenuBar: true,
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

ipcMain.on('open-pagamento-window', () => {
  abrirPagamentoWindow();
});
