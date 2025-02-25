// Importações do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Exporte o Firestore para uso em outros arquivos
export { db };