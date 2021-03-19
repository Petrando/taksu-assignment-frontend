import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Accordion,Badge, Button, Card as BoostrapCard, Container, Row, Modal, Spinner} from 'react-bootstrap';
import {CaretDownFill, CaretUp} from 'react-bootstrap-icons';
import Layout from './Layout';
import {getProducts} from './apiCore';
import LoadingSpinner from './LoadingSpinner';
import {isAuthenticated} from '../auth';

let _isLoaded = false;
const itemPerPage = 8;

const Home = () => {	

	return (
		<Layout title="Home Page" description={isAuthenticated()?"Logged In":"Not Logged"} className="container-fluid">						
			<div style={{display:"flex", alignItems:"center", justifyContent:"center"}}	>
				<h3>{isAuthenticated()?"Welcome!":"Not Logged"}</h3>
			</div>								
		</Layout>
	)
}

export default Home;