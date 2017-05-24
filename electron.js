const { app, BrowserWindow, Menu, protocol, shell } = require('electron');
const path = require('path');

if (process.env.NODE_ENV === 'development') {
	require('electron-debug')({
		showDevTools: 'undocked',
	});
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win, aboutWindow

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

	win.webContents.on('will-navigate', (e, url) => {
		// Allow internal navigation
		if ( url.startsWith( 'static://' ) ) {
			return;
		}

		// Allow reloading for local development.
		if ( process.env.NODE_ENV === 'development' ) {
			if ( url.startsWith( 'http://localhost:3000/' ) ) {
				return;
			}
		}

		e.preventDefault()
		shell.openExternal(url)
	})

	// Emitted when the window is closed.
	win.on('closed', () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		win = null
	})
}

function createAboutWindow() {
	aboutWindow = new BrowserWindow({
		width: 648,
		height: 320,
		resizable: false,
		center: true,
		vibrancy: 'light',
		// Non-Mac:
		//backgroundColor: '#ececec',
		title: 'About Chassis Desktop',
		titleBarStyle: 'hidden-inset',
		show: false,
	})

	aboutWindow.loadURL('http://localhost:3000/about.html')

	aboutWindow.on('ready-to-show', () => aboutWindow.show())

	aboutWindow.webContents.on('will-navigate', (e, url) => {
		e.preventDefault()
		shell.openExternal(url)
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

	const mainMenu = Menu.buildFromTemplate([
		{
			label: app.getName(),
			submenu: [
				{
					label: 'About ' + app.getName(),
					click: () => createAboutWindow(),
				},
				{type: 'separator'},
				{role: 'services', submenu: []},
				{type: 'separator'},
				{role: 'hide'},
				{role: 'hideothers'},
				{role: 'unhide'},
				{type: 'separator'},
				{role: 'quit'}
			]
		},
		{
			role: 'window',
			submenu: [
				{role: 'minimize'},
				{role: 'close'},
				{role: 'zoom'},
				{type: 'separator'},
				{role: 'front'}
			]
		},
		{
			role: 'help',
			submenu: [
				{
					label: 'Feedback',
					click: () => shell.openExternal('https://github.com/Chassis/Desktop/issues'),
				}
			]
		}
	]);
	Menu.setApplicationMenu(mainMenu);

	app.on('open-url', (event, url) => {
		event.preventDefault();

		win.webContents.send('open-url', url);
	});
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// Close, even on macOS
	app.quit()
});
