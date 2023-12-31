import React from 'react';
import axios from 'axios'
import LoginWithGoogle from './LoginWithGoogle'
import { PAYMENT_API } from '../config';

async function tryForFree(email){
  try{
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      }
    }

    const body = {
      email
    }

    await axios.post(PAYMENT_API + 'try-for-free', body, axiosConfig)

    return true
  }catch(e){
    console.log("payment err", e)

    return false
  }
}

const Login = ({ modalOpen = false, setModalOpen }) => {
  return (
    <div>
      <input
        type='checkbox'
        checked={modalOpen}
        onChange={() => setModalOpen(!modalOpen)}
        className='modal-toggle'
      />
      <div className='modal'>
        <div className='relative modal-box'>
          {/*
            <label
              onClick={() => setModalOpen(!modalOpen)}
              className='absolute btn btn-sm btn-circle right-2 top-2'>
              ✕
            </label>
          */}
          <h3 className='text-lg font-bold'>Login</h3>
          <p className='py-4'>
          <div align='center'>
          <LoginWithGoogle setModalOpen={setModalOpen} tryForFree={tryForFree}/>
          </div>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
