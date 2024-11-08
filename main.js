const { app, BrowserWindow, Menu, shell, ipcMain } = require('electron');
const path = require('path');
const { Pool } = require('pg');

let mainWindow = null;
let listaVeiculosWindow = null;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Auto-park2',
  password: 'BemVindo!',
  port: 5432
});

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
  // Menus definidos anteriormente
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

ipcMain.on('get-vehicles', async (event) => {
  try {
    const res = await pool.query('SELECT placa, marca, modelo FROM veiculos');
    const veiculosCadastrados = res.rows;

    if (listaVeiculosWindow) {
      listaVeiculosWindow.webContents.send('listaveiculos-cadastrados', veiculosCadastrados);
    }
  } catch (error) {
    console.error('Erro ao buscar veículos:', error);
  }
});

app.on('before-quit', async () => {
  await pool.end();
});
