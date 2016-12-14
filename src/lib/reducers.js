import { combineReducers } from 'redux';
import boxes from './reducers/boxes';
import installer from './reducers/installer';
import terminal from './reducers/terminal';
import ui from './reducers/ui';
import vagrant from './reducers/vagrant';

export default combineReducers({ boxes, installer, terminal, ui, vagrant });
