import React from 'react'
import Addproduct from '../components/Addproduct/Addproduct'

const AddproductPage = ({ allProducts }) => {
  return (
    <>
      <Addproduct allProducts={allProducts} />
    </>
  );
};

export default AddproductPage