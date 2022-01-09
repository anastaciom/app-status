const { ipcRenderer } = require('electron');

const teste = document.querySelector('.teste');

ipcRenderer.on('cpus_data', (e, value) => {
    teste.innerHTML = value.userName
})