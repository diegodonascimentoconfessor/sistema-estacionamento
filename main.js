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
        label: 'Pesquisar Placa',
        click: () => {
          pesquisaWindow = new BrowserWindow({
            width: 800,
            height: 600,
            resizable: true,
            webPreferences: {
              nodeIntegration: true,
              contextIsolation: false
            }
          });
          pesquisaWindow.loadFile('app/pesquisa.html');
          pesquisaWindow.on('closed', () => pesquisaWindow = null);
        }
      },
      {
        label: 'Calcular Pagamento',
        click: () => {
          if (!pagamentoWindow) {
            pagamentoWindow = new BrowserWindow({
              width: 800,
              height: 600,
              resizable: true,
              webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
              }
            });
            pagamentoWindow.loadFile('app/pagamento.html');
            pagamentoWindow.on('closed', () => pagamentoWindow = null);
          }
        }
      },
      {
        label: 'Vagas',
        click: () => {
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
            vagasWindow.loadFile('app/vagas.html');
            vagasWindow.on('closed', () => vagasWindow = null);
          }
        }
      },
      { type: 'separator' },
     
      {
        label:'sair',
      
         click: ()=>app.quit (),
         
         accelerator: 'Alt+F4'

      },

    ]
  },
  {
    label: 'Ajuda',
    submenu: [
      {
        label: 'Manual do Usuário',
        click: () => shell.openExternal('https://example.com/manual')
      }
    ]
  }
];

ipcMain.on('open-help', () => {
  pesquisaWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  pesquisaWindow.loadFile('app/pesquisa.html');
  pesquisaWindow.on('closed', () => pesquisaWindow = null);
});

ipcMain.on('vehicle-added', (event, vehicle) => {
  console.log('Veículo adicionado:', vehicle);
});
