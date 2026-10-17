import React from 'react'
import { useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { getBaseUrl } from '../../../../util/baseURL'
import { useState } from 'react'
import axios from 'axios'
import ProductCards from '../../../../components/shop/ProductCards'
import { FaPlus } from 'react-icons/fa';

const BrandProducts = () => {
    const {name} = useParams()
    const [products,setProducts] =useState([])
    const navigate = useNavigate()
    useEffect( ()=>{
        const fetchProductsByName=async()=>{
            const prods = await axios.get(`${getBaseUrl()}/api/brands/productsByBrandName/${name}`)
            console.log(`${getBaseUrl()}/api/brands/productsByBrandName/${name}`);
            
            console.log(prods);
            setProducts(prods.data)
        }

        fetchProductsByName()
    },[])

      const handleAddProduct = (brand) => {
    navigate("/dashboard/add-product");
  };

  return (
    <div>   
    <div className='flex justify-between '>
        <div className=' font-bold text-2xl '>
            {name}
        </div>
             <button
                className='bg-primary  rounded-full group hover:bg-red-700CD flex gap-2 p-3 text-white justify-center items-center '
                onClick={() => handleAddProduct()}
                title="Add Product"
              >
                Add Products <FaPlus className='text-white ' />
              </button>
    </div>
        <ProductCards products={products}/>
    
    </div>
  )
}

export default BrandProducts
