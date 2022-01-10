const { app, BrowserWindow, Menu, globalShortcut } = require('electron');
const path = require('path');
const { totalmem, freemem, cpus, uptime, platform, type, userInfo, arch } = require('os');


const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        icon: path.join(__dirname, 'public', 'assets', 'iconApp.png')
    })

    win.loadFile(path.join(__dirname, 'public', 'index.html'))

    win.once('ready-to-show', () => {
        win.show()
        setInterval(() => {
            const total = parseInt(totalmem() / 1024 / 1024)
            const mem = parseInt(freemem() / 1024 / 1024)
            const porcents = parseInt((mem / total) * 100)

            let activityHr = Math.floor((uptime() / 60 / 60) % 60)
            let activityMin = Math.floor((uptime() / 60) % 60)
            let activitySec = Math.floor(uptime() % 60)

            activityHr = activityHr < 10 ? "0" + activityHr : activityHr
            activityMin = activityMin < 10 ? "0" + activityMin : activityMin
            activitySec = activitySec < 10 ? "0" + activitySec : activitySec

            const activity = `${activityHr}:${activityMin}:${activitySec}`
            const infoPC = {
                CPUName: cpus()[0].model,
                CPUSpeed: cpus()[0].speed,
                CPUArch: arch(),
                systemActivity: activity,
                platform: platform(),
                system: type(),
                userName: userInfo().username,
                memoryStats: {
                    free: mem,
                    total: total,
                    usage: porcents
                }
            }
            win.webContents.send('cpus_data', infoPC)
        }, 1000);

        const menu = Menu.buildFromTemplate([])
        Menu.setApplicationMenu(menu)
    })

}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    console.log('Todas janelas foram fechadas')
    app.quit()
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
