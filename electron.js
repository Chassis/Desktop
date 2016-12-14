const { app, BrowserWindow } = require('electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow() {
	// Create the browser window.
	win = new BrowserWindow({
		width: 660,
		height: 540,
		resizable: false,
		fullscreenable: false,
		backgroundColor: '#29ABE2',
		center: true,
		title: 'Chassis',
		titleBarStyle: 'hidden',
	})

	// and load the index.html of the app.
	// win.loadURL(`file://${__dirname}/build/index.html`)
	win.loadURL('http://localhost:3000/')

	// Open the DevTools.
	win.webContents.openDevTools();

	// Emitted when the window is closed.
	win.on('closed', () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		win = null
	})
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => createWindow());

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// Close, even on macOS
	app.quit()
});
