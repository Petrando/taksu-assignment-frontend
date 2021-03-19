import React from 'react';
import Menu from './Menu';
import '../styles.css';
import {Jumbotron} from 'react-bootstrap';

const Layout = ({title="Title", description="description", className, children}) => {
	return (
		<div>
		<Menu />
		<Jumbotron>
			<h2>{title}</h2>
			<p className="lead">
				{description}
			</p>
		</Jumbotron>
		<div className={className}>
			{children}
		</div>
		</div>
	)
}


export default Layout;