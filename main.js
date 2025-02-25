const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

// Importações do Firebase
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

let mainWindow = null;
let listaVeiculosWindow = null;

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCcRmayK-UWND1AhvNFi2JVMTCdcfzenME",
  authDomain: "estacionamento-2477b.firebaseapp.com",
  projectId: "estacionamento-2477b",
  storageBucket: "estacionamento-2477b.firebasestorage.app",
  messagingSenderId: "980586413038",
  appId: "1:980586413038:web:097cf122a5b9654064ecff",
  measurementId: "G-GKPZ3B2TT7"
};

// Inicialize o Firebase
const firebaseApp = initializeApp(firebaseConfig);
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

ipcMain.on('get-vehicles', async () => {
  try {
    const veiculosCollection = collection(db, 'veiculos');
    const veiculosSnapshot = await getDocs(veiculosCollection);
    const veiculosCadastrados = veiculosSnapshot.docs.map(doc => doc.data());

    if (listaVeiculosWindow) {
      listaVeiculosWindow.webContents.send('listaveiculos-cadastrados', veiculosCadastrados);
    }
  } catch (error) {
    console.error('Erro ao buscar veículos:', error);
  }
});

app.on('before-quit', () => {
  // Não há necessidade de encerrar uma conexão com o Firebase, pois ele é stateless.
});