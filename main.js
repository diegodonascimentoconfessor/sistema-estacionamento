const { app, BrowserWindow, Menu, ipcMain, shell } = require('electron');
let mainWindow = null;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 2000,
    height: 1000,
    resizable: true,
    icon: 'app/assets/icone_calculadora.png',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Carrega o arquivo HTML principal
  mainWindow.loadFile('app/index.html');
}


function createPesquisaWindow() {
  const pesquisaWindow = new BrowserWindow({
    width: 400,
    height: 300,
    resizable: false,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  pesquisaWindow.loadFile('app/pesquisa.html');
}

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
        label: 'Pesquisar por Placa',
        click: () => {
          createPesquisaWindow();
        }
      },
      {
        label: 'Documentação',
        click: () => {
          shell.openExternal('https://electronjs.org/docs');
        }
      },
      {
        label: 'Sobre',
        click: () => {
          const sobre = new BrowserWindow({
            width: 800,
            height: 800,
            resizable: false,
            autoHideMenuBar: true,
          });
          sobre.loadFile('app/sobre.html');
        }
      }
    ]
  }
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

ipcMain.on('menu-add-vehicle', () => {
  mainWindow.webContents.send('menu-add-vehicle');
});

ipcMain.on('menu-edit-vehicle', () => {
  mainWindow.webContents.send('menu-edit-vehicle');
});

ipcMain.on('menu-delete-vehicle', () => {
  mainWindow.webContents.send('menu-delete-vehicle');
});

app.on('ready', createMainWindow);
