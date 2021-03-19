import React, {useState, useEffect} from 'react';
import {Spinner} from 'react-bootstrap';

const LoadingSpinner = () => (
	<div style={{width:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}>
		<Spinner animation="border" role="status">
			<span className="sr-only" key={0}>Loading ...</span>
		</Spinner>
	</div>
)

export default LoadingSpinner;