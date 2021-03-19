import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {ListGroup} from 'react-bootstrap';
import APurchase from '../core/APurchase';
import ScrollArrow from '../core/ScrollArrow';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {listOrders} from './apiAdmin';
import moment from 'moment';

const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [statusValues, setStatusValues] = useState([]);

	const {user, token} = isAuthenticated();

	const loadOrders = () => {
		listOrders(user._id, token).then(data => {
			if(data.error){
				console.log(data.error);
			} else {
				//console.log(data);
				setOrders(data);
			}
		})
	}
	
	useEffect(() => {
		loadOrders();
	}, []);	

	const changeOrderStatus = (newStatus, orderId) => {
		let updatedOrders = orders;
		updatedOrders.forEach(o => {
			if(o._id === orderId){				
				o.status = newStatus;
			}
		});		
		setOrders([...updatedOrders]);		
	}

	const noOrders = () => (
		<h4>No order yet...</h4>
	)
	
	const showOrdersLength = () => {
		if(orders.length > 0){
			return (
				<h4>
					Total orders: {orders.length}
				</h4>
			)
		} else {
			return null;
		}
	}	

	const displayOrder = () => {
    	return (        	
            <ListGroup>                	
                {orders.map((o, idx) => {
                    return (                         
                        <APurchase aPurchase={o} cardIn="ManageOrdersByAdmin" 
                            	changeOrderStatus={changeOrderStatus} key={idx}
                        />                        
                    );
                })}                	
            </ListGroup>            	
    	);
	};

	return (
		<Layout title="Orders" description={`Hello, ${user.name}, manage the orders here`} className="container-fluid">
			{showOrdersLength()}

			{orders.length===0?noOrders():displayOrder()}
			<ScrollArrow />
		</Layout>
	)
}

export default Orders;