<div align="center">
	<h1>Chassis Desktop</h1>
	<p>Local WordPress development made easy.</p>
	<img src="http://beta.chassis.io/images/main@2x.png" width="772" height="322" />
	<hr />
	<p>Chassis Desktop is an application to manage <a href="https://github.com/Chassis/Chassis">Chassis</a> development environments, without touching the command line. Create, manage, and configure development environments with a simple UI.</p>
	<!-- **[Install Chassis Desktop &rarr;](http://chassis.io/)** -->
	<p>Release builds coming soon. Until then, you'll need to build your own:</p>
</div>

## Development

Chassis Desktop is an [Electron application](http://electron.atom.io/), and uses build tools based on [Create React App][create-react-app]. Node.js/npm is required to build Desktop.

To run the development version:

```sh
# Clone this repository
git clone https://github.com/Chassis/Desktop chassis-desktop
cd chassis-desktop

# Install dependencies
npm install

# Run.
npm start
```


## Building for Release

Release/production builds have two build stages: building JS for release, and building the full application packages.

```sh
# Build the app scripts
npm run build

# Verify scripts:
electron .

# Pack for testing
npm run pack

# Verify app:
open "dist/mac/Chassis Desktop.app"

# Pack for distribution (into DMG)
npm run dist
```


## License

Chassis Desktop is licensed under the [BSD License](license.md).

Contains code from the [create-react-app][] project, copyright Facebook, Inc. Used under the [BSD license](https://github.com/facebookincubator/create-react-app/blob/master/LICENSE).

[create-react-app]: https://github.com/facebookincubator/create-react-app
