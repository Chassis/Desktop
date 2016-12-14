import { spawn } from 'child_process';

export default domain => spawn('open', [`http://${domain}/`]);
