import React, { useEffect } from 'react'
import SimilarProductCard from './SimilarProductCard'
import { useParams } from 'react-router-dom'
import { store, useAppSelector } from '../../../State/Store';
import { useDispatch } from 'react-redux';
import { fetchAllProducts } from '../../../State/customer/ProductSlice';

function SimilarProduct() {

  const {categoryId} = useParams();
  console.log(categoryId);
  
  const dispatch = useDispatch()

  const {product} = useAppSelector((store)=> store);

  useEffect(()=>{
    dispatch(fetchAllProducts({category:categoryId}))
  },[categoryId])
  console.log(product?.products)
  return (
    <div className='grid lg:grid-col-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 justify-between gap-4 gap-y-8'>
        {product.products.map((item)=> <SimilarProductCard item={item}/>)}
    </div>
  )
}

export default SimilarProduct