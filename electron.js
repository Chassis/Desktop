const { app, BrowserWindow, protocol } = require('electron');
const path = require('path');

if (process.env.NODE_ENV === 'development') {
	require('electron-debug')({
		showDevTools: 'undocked',
	});
}

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
		show: false,
	})

	// and load the index.html of the app.
	if (process.env.NODE_ENV === 'development') {
		win.loadURL('http://localhost:3000/')
	} else {
		win.loadURL(`file://${__dirname}/build/index.html`);
	}

	win.on('ready-to-show', () => win.show())

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
app.on('ready', () => {
	// Register static:// protocol for access to build directory assets.
	protocol.registerFileProtocol(
		'static',
		(request, callback) => {
			const url = request.url.substr( 9 );
			callback({ path: path.normalize( `${__dirname}/build/${url}` ) });
		},
		(error) => {
			if (error) {
				console.error( 'Failed to register protocol' );
			}
		}
	);

	createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// Close, even on macOS
	app.quit()
});
