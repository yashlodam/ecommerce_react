import React, { useEffect, useState } from "react";
import { Star, Heart } from "lucide-react";
import "./ProductCard.css"
import Button from "@mui/material/Button";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { teal } from "@mui/material/colors";
import ModeCommentIcon from '@mui/icons-material/ModeComment';

function ProductCard({ product }) {
  

  const images = [
    "https://rukminim2.flixcart.com/image/964/964/xif0q/t-shirt/1/u/i/-original-imahntpgnt2g6j9y.jpeg?q=90",
    "https://rukminim2.flixcart.com/image/964/964/xif0q/t-shirt/1/u/i/-original-imahntpgnt2g6j9y.jpeg?q=90",
    "https://rukminim2.flixcart.com/image/1920/1920/xif0q/t-shirt/h/w/d/-original-imahntpgae835zuu.jpeg?q=90"
  ]
  const [currentImages,setCurrentImage] = useState(0);
  const [isHovered,setIsHovered] = useState(false);

  useEffect(()=>{
    let interval;
    if(isHovered){
      interval = setInterval(()=>{
        setCurrentImage((prevImage)=> (prevImage+1)% images.length);
      },1000);
    }
    else if(interval){
      clearInterval(interval);
      interval=null;
    }

    return ()=> clearInterval(interval);

  },[isHovered]);

  return (
    
    <div className="group px-4 relative">
      <div className="card"
      onMouseEnter={()=> setIsHovered(true)}
      onMouseLeave={()=> setIsHovered(false)}
      >

        {images.map((item,index)=><img className="card-media object-top"
        src={item} alt=""
        style={{transform:`translateX(${(index-currentImages)*100}%)`}}
        />)}
        
          {isHovered && <div className="indicator flex flex-col items-center space-y-2">
            
            <div className="flex gap-3">
              <Button variant="contained" color="secondary">
                <FavoriteIcon sx={{color:teal[500]}}/>
              </Button>
              <Button variant="contained" color="secondary">
                <ModeCommentIcon sx={{color:teal[500]}}/>
              </Button>
            </div>
        
      </div>
}
    </div>
    <div className="details pt-3 space-y-1 group-hover-effect rounded-md">
      <div className="name">
        <h1>Levis</h1>
        <p>T-Shirt</p>

      </div>
      <div className="price flex items-center gap-3">
        <span className="font-semibold text-gray-800">
          ₹ 400
        </span>
        <span className=".thin-line-through text-gray-400">
          ₹ 999
        </span>
        <span className="text-primary font-semibold">
          60%
        </span>
      </div>

    </div>
    </div>
    
  )
}

export default ProductCard;