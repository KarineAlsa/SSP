
const { app, BrowserWindow } = require('electron');


app.on('ready', () => {
    let win = new BrowserWindow({width: 1350, height: 700,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation:  false
        }
    });
    
    win.loadFile('../HTML/inicio.html');
    win.on('closed', () => {
        win= null;
        app.quit();
    });
});

