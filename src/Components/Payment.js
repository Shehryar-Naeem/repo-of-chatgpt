"use client"

import React, { useState } from 'react';
import StripePay from './StripePay';
import * as EmailValidator from 'email-validator'

const options = ['1 month - 20$', '1 year - 120$']

const Payment = () => {
  let email; // Declare the email variable outside the block

  if (typeof window !== 'undefined') {
    const userData = JSON.parse(window.localStorage.getItem('userData'));
    email = userData && userData.hasOwnProperty('email') ? userData?.email : null;
    
    if (!EmailValidator.validate(email))
      alert("Wrong email, please relogin");
  }
  const [selected, setSelected] = useState(options[0]);
  return (
    <div className='chatview' style={{ width: "100%" }}>
    <br/>
    <br/>
    <div align='center'>
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className='dropdown'>
        { options.map((item, key) => <option key={key} >{options[key]}</option>) }
      </select>
      <br/>
      <br/>
      {
        selected === "1 month - 20$"
        ?
        (
          <StripePay
            email={email}
            payID={process.env.REACT_APP_PUBLIC_STRIPE_PRICE_ID_MONTH}
            payPeriod="Pay for month"
          />
        )
        : null
      }
      {
        selected === "1 year - 120$"
        ?
        (
          <StripePay
            email={email}
            payID={process.env.REACT_APP_PUBLIC_STRIPE_PRICE_ID_YEAR}
            payPeriod="Pay for year"
          />
        )
        : null
      }
    </div>
    </div>
  );
};

export default Payment;
