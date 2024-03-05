import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '/src/assets/Logo.png';
import InterLink from '/src/assets/ONKVWY0 copy.png';
import "./SignUp.css";
import axios from 'axios';

export default function SignUp() {
  const [showAdminInputs, setShowAdminInputs] = useState(false);
  const [showEmployeeInputs, setShowEmployeeInputs] = useState(false);
  const [showBackLink, setShowBackLink] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organizationName, setOrganizationName] = useState(''); // Add state for additional fields
  const [headquarterAddress, setHeadquarterAddress] = useState('');

  // Handlers for input changes
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const userCredentials = {
      name,
      email,
      password,
      ...(showAdminInputs && { organizationName, headquarterAddress }), // Conditionally add admin-specific fields
    };

    try {
      // Replace 'https://your-api-endpoint.com/signup' with your actual API endpoint
      const response = await axios.post('https://your-api-endpoint.com/signup', userCredentials);
      console.log('Sign Up Success', response.data);
      // Handle success (e.g., navigate to another page, show a success message)
    } catch (error) {
      console.error('Sign Up Error', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className='wrapper'>
      <img src={InterLink} alt="InterLink" className="InterLink" />
      
      <form className='InputContent' onSubmit={handleSubmit}>
        <img src={Logo} alt="Logo" className="logoSignUp" />
        {!showAdminInputs && !showEmployeeInputs && (
          <div className='SignUpbuttons'>
            <button type="button" className='SignUpAdministratorBtn' onClick={handleAdminSignUp}>SignUp as Administrator</button>
            <button type="button" className='SignUpEmployeeBtn' onClick={handleEmployeeSignUp}>SignUp as Employee</button>
          </div>
        )}
        {(showAdminInputs || showEmployeeInputs) && (
          <>
            <input className='NameSignUp' type='text' placeholder='Name' value={name} onChange={handleInputChange(setName)} required />
            <input className='EmailSignUp' type='text' placeholder='Email' value={email} onChange={handleInputChange(setEmail)} required />
            <input className='PasswordSignUp' type='password' placeholder='Password' value={password} onChange={handleInputChange(setPassword)} required />
            {showAdminInputs && (
              <>
                <input className='OrganizationNameSignUp' type='text' placeholder='Organization Name' value={organizationName} onChange={handleInputChange(setOrganizationName)} required />
                <input className='HeadquarterAddressSignUp' type='text' placeholder='Headquarter Address' value={headquarterAddress} onChange={handleInputChange(setHeadquarterAddress)} required />
              </>
            )}
            <button className='LogInBtnSignUp' type="submit">Sign Up</button>
            {showBackLink && (
              <Link to="#" className='back' onClick={handleBack}>Back</Link>
            )}
          </>
        )}
        <Link to="/login" className="createAccount">Already Signed up?</Link>
      </form>
    </div>  
  );
};
