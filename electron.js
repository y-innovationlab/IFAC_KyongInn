const { app, BrowserWindow } = require('electron');
const path = require('path');
const imagePath = path.join(__dirname, './');


const { ipcMain } = require('electron');

ipcMain.on('get-dirname', (event) => {
  event.returnValue = __dirname;
});


function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: imagePath,
    frame: false,
    kiosk: false,
    // titleBarStyle: 'hidden',
    // transparent: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      // preload: path.join(__dirname, 'preload.js') // preload 스크립트를 사용하려면 이 줄의 주석을 해제하세요.
    }
  });

  win.loadFile('kyongin_player_list.html'); // 앱에 표시할 HTML 파일
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
