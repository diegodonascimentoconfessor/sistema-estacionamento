const  {contextBridge, ipcRenderer} = require ('electron');

contextBridge.exposeInMainWorld('api', {
     send:(channel, data ) => {
        let canaisvalidos =['abrir-link-sobre','fechar-janela-sobre'];
        if(canaisvalidos.includes(channel)){
            ipcRenderer.send(channel, data)
        }
     }
})