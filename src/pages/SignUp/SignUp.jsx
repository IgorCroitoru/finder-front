import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '/src/assets/Logo.png';
import InterLink from '/src/assets/ONKVWY0 copy.png';
import "./SignUp.css"
import axios from 'axios'
export default function SignUp (){
  const [showAdminInputs, setShowAdminInputs] = useState(false);
  const [showEmployeeInputs, setShowEmployeeInputs] = useState(false);
  const [showBackLink, setShowBackLink] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    const userCredentials = {
      name,
      email,
      password,
      invitationToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnZpdGVySWQiOiI2NWUzNWYxNWEzN2FkODQzYWFhNGFiNjgiLCJvcmdhbml6YXRpb25JZCI6IjY1ZTM1ZjE1YTM3YWQ4NDNhYWE0YWI2NiIsImlhdCI6MTcwOTU3NDc1NCwiZXhwIjoxNzEwMTc5NTU0fQ.QAd6ScHo8fgpud_fp73oiosO0SNByKJLzzncyekZpvA'
    };

    try {
      const response = await axios.post('https://teamfinderapp.azurewebsites.net/auth', userCredentials, {withCredentials:true, });
      localStorage.setItem('token', response.data.data.accessToken)
      console.log('Sign Up Success', response.data);
      // Handle success (e.g., navigate to another page, show a success message)
    } catch (error) {
      console.error('Sign Up Error', error);
      // Handle error (e.g., show error message)
    }
  };
  


  const handleAdminSignUp = () => {
    setShowAdminInputs(true);
    setShowEmployeeInputs(false);
    setShowBackLink(true);

  };

  const handleEmployeeSignUp = () => {
    setShowEmployeeInputs(true);
    setShowAdminInputs(false);
    setShowBackLink(true);
  };

  const handleBack = () => {
    setShowAdminInputs(false);
    setShowEmployeeInputs(false);
    setShowBackLink(false);
  };

  return (
    <div className='wrapper'>
      <img src={InterLink} alt="InterLink" className="InterLink" />
      
      <div className='InputContent'>
        <img src={Logo} alt="Logo" className="logoSignUp" />
        {!showAdminInputs && !showEmployeeInputs && (
          <div className='SignUpbuttons'>
            <button className='SignUpAdministratorBtn' onClick={handleAdminSignUp}>SignUp as Administrator</button>
            <button className='SignUpEmployeeBtn' onClick={handleEmployeeSignUp}>SignUp as Employee</button>
          </div>
        )}
        {(showAdminInputs || showEmployeeInputs) && (
          <>
            {showEmployeeInputs && (
              <>
               <input className='NameSignUp' type='text' placeholder='Name' value={name} onChange={handleInputChange(setName)} required />
            <input className='EmailSignUp' type='text' placeholder='Email' value={email} onChange={handleInputChange(setEmail)} required />
            <input className='PasswordSignUp' type='password' placeholder='Password' value={password} onChange={handleInputChange(setPassword)} required />
              </>
            )}
            {showAdminInputs && (
              <>
                <input className='NameSignUp' type='text' placeholder='Name' required />
                <input className='EmailSignUp' type='text' placeholder='Email' required />
                <input className='PasswordSignUp' type='password' placeholder='Password' required />
                <input className='PasswordSignUp' type='text' placeholder='Organization Name' required />
                <input className='PasswordSignUp' type='text' placeholder='Headquarter Address' required />
              </>
            )}
            <button className='LogInBtnSignUp' onClick={handleSubmit}>Sign Up</button>
            {showBackLink && (
              <Link className='back' onClick={handleBack}>Back</Link>
            )}
          </>
        )}
        <Link to="/login" className="createAccount">Already Signed up?</Link>
      </div>
    </div>  
  );
};
