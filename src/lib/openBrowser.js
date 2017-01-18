import { shell } from 'electron';

export default url => shell.openExternal( url );
