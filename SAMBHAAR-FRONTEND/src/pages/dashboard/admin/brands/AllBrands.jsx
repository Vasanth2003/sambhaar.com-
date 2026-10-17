import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getBaseUrl } from '../../../../util/baseURL';
import { useNavigate } from 'react-router-dom';

const AllBrands = () => {
  const [brands, setBrands] = useState([]);
    const navigate = useNavigate()
  useEffect(() => {
    const fetchBrands = async () => {
      const response = await axios.get(`${getBaseUrl()}/api/brands/getAllBrands`);
      setBrands(response.data);
    };
    fetchBrands();
  }, []);


  return (
<div className='min-h-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4'>
  {brands.map((item, index) => (
    <div
      key={index}
      className='bg-primary-dark text-white rounded-xl hover:border-primary hover:shadow-2xl hover:text-primary hover:bg-transparent hover:border-2 cursor-pointer px-4 py-4 flex justify-between items-center transition duration-300 h-32'
        onClick={()=> navigate(`/dashboard/brand-products/${item.name}`)}
    >
      <span className='text-lg font-medium'>{item.name}</span>
     
    </div>
  ))}
</div>

  );
};

export default AllBrands;
