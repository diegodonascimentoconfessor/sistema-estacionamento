const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

// Importações do Firebase
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

let mainWindow = null;
let listaVeiculosWindow = null;

// Inicialize o Firebase (sem credenciais no código)
const firebaseApp = initializeApp({
  // Suas credenciais do Firebase devem ser carregadas de variáveis de ambiente
  // ou de um arquivo de configuração seguro.
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
});

const db = getFirestore(firebaseApp);

app.on('ready', () => {
  console.log("Iniciando Electron");

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 920,
    resizable: false,
    icon: path.join(__dirname, 'assets', 'icone-estacionamento.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false // Considere usar contextBridge para maior segurança
    }
  });

  mainWindow.maximize();
  Menu.setApplicationMenu(Menu.buildFromTemplate(createMenuTemplate()));
  mainWindow.loadFile(path.join(__dirname, 'app', 'index.html'));
});

const createMenuTemplate = () => [
  // Menus definidos anteriormente
];

ipcMain.on('get-vehicles', async () => {
  try {
    const veiculosCollection = collection(db, 'veiculos');
    const veiculosSnapshot = await getDocs(veiculosCollection);
    const veiculosCadastrados = veiculosSnapshot.docs.map(doc => doc.data());

    if (listaVeiculosWindow && !listaVeiculosWindow.isDestroyed()) {
      listaVeiculosWindow.webContents.send('listaveiculos-cadastrados', veiculosCadastrados);
    }
  } catch (error) {
    console.error('Erro ao buscar veículos:', error);
  }
});

app.on('before-quit', () => {
  // Não há necessidade de encerrar uma conexão com o Firebase, pois ele é stateless.
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});