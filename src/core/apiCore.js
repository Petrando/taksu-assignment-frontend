import {API} from '../config';
import queryString from 'query-string';

export const getBraintreeClientToken = (userId, token) => {
	return fetch(`${API}/braintree/getToken/${userId}`, {
		method: "GET",
		headers: {
			Accept:"application/json",
			"Content-Type":"application/json",
			Authorization: `Bearer ${token}`
		}
	})
		.then(res => {
			return res.json();
		})
		.catch(err => console.log(err));
};

export const processPayment = (userId, token, paymentData) => {
	return fetch(`${API}/braintree/payment/${userId}`, {
		method: "POST",
		headers: {
			Accept:"application/json",
			"Content-Type":"application/json",
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(paymentData)
	})
		.then(res => {
			return res.json();
		})
		.catch(err => console.log(err));
};