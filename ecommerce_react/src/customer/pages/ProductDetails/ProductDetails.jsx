import StarIcon from '@mui/icons-material/Star';
import { teal } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import React, { useEffect, useState } from 'react'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ShieldIcon from '@mui/icons-material/Shield';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Review from '../Review/Review';
import SimilarProduct from './SimilarProduct';
import ReviewCard from '../Review/ReviewCard';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { store, useAppSelector } from '../../../State/Store';
import { fetchProductById } from '../../../State/customer/ProductSlice';

function ProductDetails() {

  const [quantity,setQuantity] = useState(1)

  const dispatch = useDispatch();
  const {productId} = useParams()
  const {product} = useAppSelector((store)=>store) 

  const [activeImage,setActiveImage] = useState(0)

  useEffect(()=>{
    dispatch(fetchProductById(Number(productId)))
  },[productId])

  const handleActiveImage = (value)=>{
    setActiveImage(value)
  }

  return (
    <div className='px-5 lg:px-20 pt-10'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
        <section className='flex flex-col lg:flex-row gap-5'>
          <div className='w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3'>
            {product.product?.images.map((item,index)=> <img 
            onClick ={()=>handleActiveImage(index)} className='lg:w-full w-[50px] cursor-pointer rounded-md' src={item}/>)}
          </div>
          <div className='w-full lg:w-[85%]'>
            <img className='w-full rounded-md' src={product.product?.images[activeImage]} alt="" />
          </div>
        </section>

        <section>
          <h1 className='font-bold text-lg text-primary'>{product.product?.seller?.businesssDetails.businessName}</h1>
          <p className='text-gray-500 font-semibold '>{product.product?.title}</p>
          <div className='flex justify-between items-center py-2  w-[180px] px-3 mt-5'>
            <div className='flex gap-1 items-center'>
              <span>4</span>
              <StarIcon sx={{color:teal[500],fontSize:"17px"}}/>
            </div>
            <Divider orientation='vertical' flexItem/>
            <span>
              234 Ratings
            </span>
          </div>
          <div className='price flex items-center gap-3 mt-5 text-2xl'>

            <span className='font-sans text-gray-800'>
              ₹ {product.product?.sellingPrice}
            </span>
            <span className='line-through text-gray-400'>
              ₹ {product.product?.mrpPrice}
            </span>
            <span className='text-primary font-semibold'>
              {product.product?.discountPercent} %
            </span>

          </div>

          <p>Inclusive of all taxes. Free Shipping above ₹1500.</p>

          <div className='mt-7 space-y-3'>
            <div className='flex items-center gap-4'>
              <ShieldIcon  sx= {{color:teal[500]}}/>
              <p>Authentic & Quality Assured</p>
            </div>

            <div className='flex items-center gap-4'>
              <WorkspacePremiumIcon  sx= {{color:teal[500]}}/>
              <p>100% money back guarantee</p>
            </div>
            <div className='flex items-center gap-4'>
              <LocalShippingIcon  sx= {{color:teal[500]}}/>
              <p>Free Shipping & Return</p>
            </div>
            <div className='flex items-center gap-4'>
              <AccountBalanceWalletIcon  sx= {{color:teal[500]}}/>
              <p>Pay on delivery might be available</p>
            </div>
          </div>

          <div className='mt-7 space-y-2'>
            <h1>QANTITY</h1>
            <div className='flex items-center gap-2 w-[140px] justify-between'>
              <Button disabled={quantity==1} onClick={()=> setQuantity(quantity-1)}>
                <RemoveIcon/>
              </Button>
              <span>
                {quantity}
              </span>
              <Button onClick={()=> setQuantity(quantity+1)}>
                <AddIcon/>
              </Button>
            </div>
          </div>
          
          <div className='mt-12 flex items-center gap-5'>
            <Button fullWidth
            variant='contained'
             startIcon={<AddShoppingCartIcon/>} sx={{py:"1rem"}}>
              Add to Bag
            </Button>

            <Button fullWidth
            variant='outlined'
             startIcon={<FavoriteIcon/>} sx={{py:"1rem"}}>
              whishlist
            </Button>
          </div>

          <div className='mt-5'>
            <p className='text-gray-500 font-semibold'>{product.product?.description}</p>
          </div>

          <div className='mt-7 space-y-5'>
            <ReviewCard/>
            <Divider/>
          </div>

        </section>

        

      </div>

      <div className='mt-20' >
        <h1 className='text-lg font-bold'>
          Similar Product
        </h1>
        <div className='pt-5'>
          <SimilarProduct/>
        </div>
        
      </div>

    </div>
  )
}
export default ProductDetails;
