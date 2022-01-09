const { ipcRenderer } = require('electron');

const cpuName = document.querySelector('#cpuName');
const memTotal = document.querySelector('#memTotal');
const system = document.querySelector('#system');
const userName = document.querySelector('#userName')

const cpuSpeed = document.querySelector('#cpuSpeed')
const cpuArch = document.querySelector('#cpuArch')
const memFree = document.querySelector('#memFree')
const memUsage = document.querySelector('#memUsage')
const systemPlatform = document.querySelector('#systemPlatform')
const systemActivity = document.querySelector('#systemActivity')



ipcRenderer.on('cpus_data', (e, value) => {
    userName.innerHTML = `Hi, <span class="colorInfo">${value.userName}</span>  :)`
    cpuName.innerHTML = `CPU: <span class="colorInfo">${value.CPUName}</span>`
    cpuSpeed.innerHTML = `CPU speed: <span class="colorInfo">${value.CPUSpeed}MHz </span>`
    cpuArch.innerHTML = `CPU Arch: <span class="colorInfo">${value.CPUArch}</span>`
    memTotal.innerHTML = `Total memory: <span class="colorInfo">${value.memoryStats.total}MB </span>`
    memFree.innerHTML = `Free memory: <span class="colorInfo">${value.memoryStats.free}MB </span>`
    memUsage.innerHTML = `Memory usage: <span class="colorInfo">${value.memoryStats.usage}% </span>`
    system.innerHTML = `System: <span class="colorInfo"> ${value.system} </span>`
    systemPlatform.innerHTML = `<span class="colorInfo">${value.platform}</span>`
    systemActivity.innerHTML = `System activity in hours: <span class="colorInfo">${value.systemActivity}h </span>`

})

