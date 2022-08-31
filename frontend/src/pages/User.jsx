import React, { useEffect, useState } from 'react'
import Addproduct from '../components/Addproduct/Addproduct'
import { GetBalance, SetBankAccount } from "../Api/Api";

const UserPage = () => {

    const [ balance, setBalance ] = useState( "loading" );

    useEffect( async () => {
        console.log("came")
          console.log( (await GetBalance()).data.balance );
        document.querySelector('#balance_field').innerHTML = (await GetBalance()).data.balance; 
    }, [] )

    const submit = (d) => {
      console.log( document.querySelector('#account_no').value );
      SetBankAccount({"account_no": document.querySelector('#account_no').value});
    }

  return (
    <div style={{padding: '3rem'}}>
      {/* <form onSubmit={(d) => console.log(d)} > */}
      <label> account no: </label>
        <input id="account_no" type="number" name="account_no" />
        <button style={{padding: '1rem', marginLeft: '2rem'}} type='submit' onClick={submit} > submit </button>
      {/* </form> */}
      <br></br>
      <br></br>
      <br></br>
      <span style={{fontSize: '2rem'}}>balance: </span>
      <span style={{fontSize: '2rem'}} id="balance_field"> </span>
    </div>
  );
};

export default UserPage;