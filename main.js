const { app, BrowserWindow, Menu, shell, ipcMain } = require('electron');
let mainWindow = null;

app.on('ready', () => {
  console.log("Iniciando Electron");
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    resizable: false,
    icon: 'app/assets/icone_calculadora.png',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
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
        { type: 'separator' },
        { label: 'Aplicar Zoom', role: 'zoomIn' },
        { label: 'Reduzir', role: 'zoomOut' },
        { label: 'Restaurar o Zoom', role: 'resetZoom' },
        { type: 'separator' },
        { label: 'Ferramenta de Desenvolvedor', role: 'toggleDevTools' },
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
          click: () => {
            // Lógica para mostrar informações sobre o aplicativo
          }
        },
      ]
    }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  mainWindow.loadFile('index.html');
});

ipcMain.on('menu-add-vehicle', () => {
  mainWindow.webContents.send('menu-add-vehicle');
});

ipcMain.on('menu-edit-vehicle', () => {
  mainWindow.webContents.send('menu-edit-vehicle');
});

ipcMain.on('menu-delete-vehicle', () => {
  mainWindow.webContents.send('menu-delete-vehicle');
});
