import React, {useState, useEffect} from 'react';
import {Alert} from 'react-bootstrap';
import {PersonPlus} from 'react-bootstrap-icons';
import Layout from '../core/Layout';
import {Link} from 'react-router-dom';
import {signup} from '../auth';

const Signup = () => {
	const [values, setValues] = useState({
		name:'',
		email: '',
		password: '',
		error: '',
		success: false
	});
	
	const [errors, setErrors] = useState({
		displayErrors : false,
		nameError : '', 
		emailError : ''
	});

	const {name, email, password, error, success} = values;
	const {displayErrors, nameError, emailError} = errors;
	
	const handleChange = name => event => {
		setValues({...values, error:false, [name]:event.target.value});		

		if(name === 'name'){
			const nameRegex = /^[a-z ,.'-]+$/i

			setErrors({...errors, nameError:event.target.value.match(nameRegex)!==null?'':
						'Name format not valid.', displayErrors:false});
		}
		if(name === 'email'){
			//const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

			setErrors({...errors, emailError:event.target.value.match(emailRegex)!==null?'':
						'Email format not valid.', displayErrors:false});
		}
	}
	
	const handleSubmit = (e) => {
		e.preventDefault();
		if(nameError!=='' || emailError!==''){			
			setErrors({...errors, displayErrors:true});
			return;
		}		
		
		setValues({ ...values, error: false });
		signup({ name, email, password }).then(data => {
			if(typeof data==='undefined'){
				setValues({...values, error:'No connection whatsoever to server!?', loading:false});
				return;
			}
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                });
            }
        });
	}	
	
	const signUpForm = () =>  (
		<form>
			<div className="form-group">
				{displayErrors && nameError!==''?
					<label style={{color:'red'}}>{nameError}</label>:
					<label className="text-muted">Name</label>					
				}
				<input value={name} onChange={handleChange('name')} type="text" className="form-control" />				
			</div>
			<div className="form-group">
				{displayErrors && emailError!==''?
					<label style={{color:'red'}}>{emailError}</label>:
					<label className="text-muted">Email</label>					
				}
				<input value={email} onChange={handleChange('email')} type="text" className="form-control" />				
			</div>
			<div className="form-group">
				<label className="text-muted">Password</label>
				<input value={password} onChange={handleChange('password')}  type="password" className="form-control" />
			</div>
			<button className="btn btn-primary"
				onClick={handleSubmit}
			>
				<PersonPlus size={20} className="mr-1" />
				Register		
			</button>
		</form>
	)
	
	const showErrorOrSucess = () => {
		return (
			<>
				<Alert variant="danger" style={{display:error?"":"none"}}>
					{error}
				</Alert>
				<Alert variant="info" style={{display:success?"":"none"}}>
					Account created successfully! Please <Link to="/signin">sign-in</Link>.
				</Alert>
			</>
		);
	}
	
	return (
		<Layout title="Sign Up" description="Sign up to Login Demo" className="container col-md-8 offset-md-2" >
			{showErrorOrSucess()}					
			{signUpForm()}		
			<p className="mt-2">Already have an account? <Link to="/signin">Log in</Link> ,please</p>	
		</Layout>
	)
}


export default Signup;
