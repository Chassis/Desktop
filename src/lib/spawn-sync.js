// fix-path internally uses some modules, which at the end of the day use
// cross-spawn.
//
// Internally, this uses child_process.spawnSync if available (Node 0.11+), but
// conditionally loads the spawn-sync module for compatibility. However, webpack
// complains if the module isn't available.
//
// We fake this via a webpack alias to this module, as we know the Electron
// environment always has this available. This file could actually be left
// blank because it's never loaded, but just in case another module is using it:

import child from 'child_process';
export default child.spawnSync;
