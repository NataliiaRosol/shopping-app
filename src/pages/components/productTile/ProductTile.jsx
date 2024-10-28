import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { ShoppingCartContext } from "../../../context/ShoppingCartContext";


export default function ProductTile({singleProduct}){

  const navigate = useNavigate();
  const {handleAddToCart, cartItems} = useContext(ShoppingCartContext)

  function handleNavigateToDetailsPage(productId){
    navigate(`/product-details/${productId}`)
  }

  return(
    <div className="relative group border border-cyan-700 p-6 cursor-pointer">
      <div className="overflow-hidden aspect-w-1 aspect-h-1">
        <img src={singleProduct?.thumbnail} 
          alt={singleProduct?.title} 
          className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
          />
      </div>

      <div className="flex item-start justify-between mt-4 spase-x-4">
        <h3 className="font-bold text-gray-900 sm:text-sm text-xs md:text-base">
          <p className="w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">{singleProduct?.title}</p>
        </h3>

        <div className="text-right">
          <p className='text-xs font-bold text-gray-900 sm:text-sm md:text-[14px]'>{singleProduct?.price}</p>
        </div>
      </div>

      <button className="px-5 mt-5 w-full py-2 rounded-none bg-black text-white font-bold text-lg"
        onClick={()=> handleNavigateToDetailsPage(singleProduct?.id)}
      >View details</button>
      <button 
        className="disabled:opacity-30 px-5 mt-5 w-full py-2 rounded-none bg-black text-white font-bold text-lg"
        onClick={()=> handleAddToCart(singleProduct)}
        disabled={cartItems.findIndex(item => item.id === singleProduct.id) > -1}>Add to Cart</button>
    </div>
  )
}