const { app, BrowserWindow } = require('electron');
const path = require('path');
const { totalmem, freemem, cpus, uptime, platform, type, userInfo } = require('os');


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

    win.on('ready-to-show', () => {
        win.show()

        setInterval(() => {
            const total = parseInt(totalmem() / 1024 / 1024)
            const mem = parseInt(freemem() / 1024 / 1024)
            const porcents = parseInt((mem / total) * 100)
            const activity = parseInt(uptime() / 60 / 60)

            const infoPC = {
                cpuName: cpus()[0].model,
                systemActivity: `${activity} hrs`,
                platform: platform(),
                system: type(),
                userName: userInfo().username,
                memoryStats: {
                    free: `${mem} MB`,
                    total: `${total} MB`,
                    usage: `${porcents} %`
                }
            }
            win.webContents.send('cpus_data', infoPC)
        }, 1000);



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