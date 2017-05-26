import React from 'react';

import Button from './Button';
import Header from './Header';

import './Extensions.css';

const EXTENSIONS_INDEX = 'http://beta.chassis.io/extensions.json';

export default class Extensions extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			available: [],
			loading: true,
			search: '',
		};

		this.loadExtensions();
	}

	loadExtensions() {
		fetch( EXTENSIONS_INDEX )
			.then( resp => resp.json() )
			.then( available => this.setState({ available, loading: false }) );
	}

	render() {
		const { onDismiss } = this.props;
		const { available, loading, search } = this.state;

		const withAuthors = available.map(item => {
			const author = {
				name: 'Chassis',
				avatar: '/logo.png',
			};

			return { ...item, author };
		})

		const filtered = search === '' ? withAuthors : withAuthors.map( item => {
			const searchable = item.name + ' ' + item.description;
			console.log( searchable.toLowerCase().indexOf( search.toLowerCase() ) !== -1 );
			return { ...item, matched: searchable.toLowerCase().indexOf( search.toLowerCase() ) !== -1 };
		});
		filtered.map( item => console.log( item.name, search && ! item.matched ) );

		return <div className="Extensions">
			<Header icon="puzzle-piece" title="Extensions">
				<input
					className="search"
					type="text"
					placeholder="Search"
					value={ search }
					onChange={ e => this.setState({ search: e.target.value }) }
				/>
				<Button
					light
					icon="times-circle"
					shortcut="esca"
					onClick={ onDismiss }
				>Cancel</Button>
			</Header>

			{ loading ?
				<p>Loading&hellip;</p>
			:
				<ul className="extensions-list">
					{ filtered.map( extension =>
						<li key={ extension.name } className={ ( search && ! extension.matched ) ? 'no-match' : '' }>
							<div>
								<h2>{ extension.name }</h2>
								<p className="description">{ extension.description }</p>
								<p className="author">
									<img
										role="presentation"
										src={ extension.author.avatar }
									/>
									{ extension.author.name }
								</p>
							</div>
							<div>
								<Button
									icon="plus"
								>Install</Button>
							</div>
						</li>
					) }
				</ul>
			}
		</div>
	}
}
