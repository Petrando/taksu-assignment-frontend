import React, {useState, useEffect} from 'react';
import {Redirect, Link} from 'react-router-dom';
import {Spinner} from 'react-bootstrap';
import {BoxArrowInLeft} from 'react-bootstrap-icons';
import {signin, authenticate, isAuthenticated} from '../auth';
import Layout from '../core/Layout';

const Signin = () => {
	const [values, setValues] = useState({
		email: '',
		password: '',
		error: '',
		loading: false,
		redirectToReferrer: false
	});	
	
	const {email, password, error, loading, redirectToReferrer} = values;
	const {user} = isAuthenticated()
	const handleChange = name => event => {
		setValues({...values, error:false, [name]:event.target.value});
	}
	
	const handleSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, error: false, loading: true });
		signin({ email, password }).then(data => {
			if(typeof data==='undefined'){
				setValues({...values, error:'No connection whatsoever to server!?', loading:false});
				return;
			}
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                authenticate(data, () => {
					setValues({
						...values,                    
						redirectToReferrer: true
					});
				})
            }
        });
	}
	
	const signInForm = () =>  (
		<form>
			<div className="form-group">
				<label className="text-muted">Email</label>
				<input value={email} onChange={handleChange('email')} type="text" className="form-control" />
			</div>
			<div className="form-group">
				<label className="text-muted">Password</label>
				<input value={password} onChange={handleChange('password')}  type="password" className="form-control" />
			</div>
			<button className="btn btn-primary"
				onClick={handleSubmit}
			>
				<BoxArrowInLeft size={15} className="mr-1" />
				Log In
			</button>
		</form>
	)
	
	const showErrorOrLoading = () => {
		return (
			<>
				<div className="alert alert-danger" style={{display:error?"":"none"}}>
					{error}
				</div>
				{
					loading && 
					<div className="alert alert-info" 
						style={{display:loading?"":"none", display:"flex", alignItems:"center", 
								justifyContent:"center"}}>
						<Spinner animation="border" role="status">
							<span className="sr-only" key={0}>Loading ...</span>
						</Spinner>
					</div>
				}
			</>
		);
	}
	
	const redirectUser = () => {		
		if(isAuthenticated()){
			return <Redirect to="/" />
		}
	}

	return (
		<Layout title="Sign In" description="Sign in to Login Demo" className="container col-md-8 offset-md-2" >
			{showErrorOrLoading()}
			{signInForm()}
			<p className="mt-2">Don't have account yet? <Link to="/signup">Register</Link> is only less than a minute....</p>
			{redirectUser()}
		</Layout>
	)
}


export default Signin;