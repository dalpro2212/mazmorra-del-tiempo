const { app, BrowserWindow, Menu } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 560,
    title: "La Mazmorra del Tiempo",
    autoHideMenuBar: true
  });
  Menu.setApplicationMenu(null);
  win.loadFile("index.html");

  // F11 = pantalla completa
  win.webContents.on("before-input-event", (e, input) => {
    if (input.type === "keyDown" && input.key === "F11") {
      win.setFullScreen(!win.isFullScreen());
    }
  });
}

app.whenReady().then(createWindow);
app.on("window-all-closed", () => app.quit());