import React from 'react';
import { connect } from 'react-redux';

import { deselectBox, finishEditingBox, runCommand, selectBox, showModal, startEditingBox, saveBoxChanges, updateBoxStatus } from './lib/actions';
import Button from './Button';
import MachineItem from './MachineItem';

import './MachineList.css';

class MachineList extends React.Component {
	render() {
		const {boxes, dispatch, terminal, ui} = this.props;
		const selected = ui.selectedBox;

		const selectedIndex = boxes.findIndex( box => selected === box.path );

		return <div className="MachineList">
			{ boxes.map( (machine, index) =>
				<MachineItem
					key={ machine.path }
					editing={ selected === machine.path && ui.editing }
					isPrevious={ index === selectedIndex - 1 }
					isNext={ index === selectedIndex + 1 }
					machine={ machine }
					selected={ selected === machine.path }
					terminal={ terminal[ machine.path ] || "" }
					onDeselect={ () => dispatch(deselectBox()) }
					onStartEditing={ () => dispatch(startEditingBox())}
					onFinishEditing={ () => dispatch(finishEditingBox()) }
					onRefresh={ () => dispatch(updateBoxStatus(machine.path)) }
					onRun={ (command, args, opts) => dispatch(runCommand(machine, command, args, opts)) }
					onSave={ data => dispatch(saveBoxChanges(machine.path, data)) }
					onSelect={ () => dispatch(selectBox(machine.path)) }
				/>
			)}

			{ boxes.length === 0 ?
				<div className="empty-message">
					<p>
						<Button
							onClick={() => dispatch(showModal('create'))}
						>Add your first box</Button>
					</p>
				</div>
			: null }
		</div>;
	}
}

export default connect(state => state)(MachineList);
