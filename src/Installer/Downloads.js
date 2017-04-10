import { spawn } from 'child_process';
import { remote } from 'electron';
import plist from 'plist';
import React from 'react';
import { connect } from 'react-redux';

import Button from '../Button';
import { addDownloadProgress, resetDownload, setDownloadTotal, setStatus } from '../lib/actions/install';
import download from '../lib/download';
import formatPath from '../lib/formatPath';
import Downloader from './Downloader';
import DownloadStatus from './DownloadStatus';

import './Downloads.css';

import VagrantLogo from './Vagrant.png';
import VirtualBoxLogo from './VirtualBox.png';

const downloadPath = remote.app.getPath('userData');
const sum = (a, b) => (a || 0) + (b || 0);
const apps = {
	vagrant: {
		url: 'https://releases.hashicorp.com/vagrant/1.8.6/vagrant_1.8.6.dmg',
		path: 'Vagrant.dmg',
		package: 'Vagrant.pkg',
	},
	virtualbox: {
		url: 'http://download.virtualbox.org/virtualbox/5.1.10/VirtualBox-5.1.10-112026-OSX.dmg',
		path: 'VirtualBox.dmg',
		package: 'VirtualBox.pkg',
	},
};

const runInstaller = (path, pkgName) => {
	return new Promise((resolve, reject) => {
		const process = spawn( 'hdiutil', [ 'attach', path, '-plist' ], {
			cwd: downloadPath,
		});
		let data = { stdout: '', stderr: '' };
		process.stdout.on( 'data', bytes => {
			data.stdout += bytes;
		});
		process.stderr.on( 'data', bytes => {
			data.stderr += bytes;
		});
		process.on('close', code => {
			if (code !== 0) {
				console.log( data );
				console.log( code );
				throw code;
			}

			const obj = plist.parse( data.stdout );

			// Find mount.
			const entity = obj['system-entities'].find(obj => obj['content-hint'] === 'Apple_HFS');
			const mount = entity['mount-point'];
			const process = spawn( 'open', [ '-W', mount + '/' + pkgName ] );
			process.on( 'close', code => {
				resolve();
				console.log( path, code );
			});
		});
	});
}

class Downloads extends React.Component {
	onDownload() {
		const { dispatch } = this.props;
		const { installed } = this.props.installer;

		Object.keys(apps).forEach(app => {
			if ( app in installed && installed[ app ] ) {
				console.log( app, 'already installed' );
				return;
			}

			let { path, url } = apps[app];

			dispatch( resetDownload( app ) );
			console.log( 'download', app );
			download( downloadPath + '/' + path, url, response => {
				dispatch( setDownloadTotal( app, parseInt( response.headers[ 'content-length'], 10 ) ) );
				response.on( 'data', chunk => dispatch( addDownloadProgress( app, chunk.length ) ) );
			});
		});
	}

	render() {
		const { dispatch } = this.props;
		const { downloadProgress, downloadTotal, installed } = this.props.installer;

		const downloaded = Object.keys(apps).map(key => downloadProgress[key]).reduce(sum, 0)
		const total = Object.keys(apps).map(key => downloadTotal[key]).reduce(sum, 0);

		const completed = total > 0 && total === downloaded;
		const status = total > 0 ? 'downloading' : 'waiting';
		const done = installed.vagrant && installed.virtualbox;

		return <li className="Downloads">
			<header>
				<h1>Requirements</h1>
			</header>

			<p>Before we can get started, Chassis has some dependencies that
				need to be installed on your system. We can download and
				install those for you:</p>

			{ ! done && ! completed ?
				<Downloader
					current={ downloaded }
					status={ status }
					total={ total }
					onDownload={ () => this.onDownload() }
				/>
			: null }

			<ul>
				<li>
					<div className="logo">
						<img
							role="presentation"
							src={ VirtualBoxLogo }
						/>
					</div>
					<div className="details">
						<h2>VirtualBox</h2>
						<p>VirtualBox runs Chassis virtual machines.</p>

						<DownloadStatus
							installed={ installed.virtualbox }
							progress={ downloadProgress.virtualbox }
							total={ downloadTotal.virtualbox }
							onInstall={ () => {
								runInstaller('VirtualBox.dmg', 'VirtualBox.pkg')
									.then( () => dispatch( setStatus( 'virtualbox', true ) ) )
							}}
						/>
					</div>
				</li>
				<li>
					<div className="logo">
						<img
							role="presentation"
							src={ VagrantLogo }
						/>
					</div>
					<div className="details">
						<h2>Vagrant</h2>
						<p>Vagrant is the underlying tool used to manage your Chassis boxes.</p>

						<DownloadStatus
							installed={ installed.vagrant }
							progress={ downloadProgress.vagrant }
							total={ downloadTotal.vagrant }
							onInstall={ () => {
								runInstaller( 'Vagrant.dmg', 'Vagrant.pkg' )
									.then( () => dispatch( setStatus( 'vagrant', true ) ) )
							}}
						/>
					</div>
				</li>
			</ul>

			{ done ?
				<p><Button icon="arrow-right" light onClick={ this.props.onNext }>Next</Button></p>
			:
				<div>
					<p className="tip">These will be downloaded to <code>{ formatPath( downloadPath ) }</code>.</p>
					<p><Button icon="arrow-right" light tiny onClick={ this.props.onNext }>Skip</Button></p>
				</div>
			}
		</li>;
	}
}

export default connect(state => state)(Downloads);
