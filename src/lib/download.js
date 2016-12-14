import fs from 'fs';
import http from 'http';
import https from 'https';

export default function download(path, url, onStart) {
	const file = fs.createWriteStream(path);

	const get = url.startsWith('https://') ? https.get : http.get;
	get(url, response => {
		response.pipe(file);

		onStart( response );
	});
}
