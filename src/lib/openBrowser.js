import { spawn } from 'child_process';

export default url => spawn( 'open', [ url ] );
