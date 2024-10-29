import { useContext } from "react"
import { ShoppingCartContext } from "../../../context/ShoppingCartContext"
//info


export default function CartTile({cartItem}){

  const {handleRemoveFromCart, handleAddToCart} = useContext(ShoppingCartContext);

  return(
    <>
      <div className="grid grid-cols-3 items-start gap-5">
        <div className="col-span-2 flex items-start gap-4">
          <div className="w-27 h-28 max-sm:w-20 shrink-0 bg-gray-400 p-1 rounded-sm">
            <img src={cartItem?.thumbnail}
              className="w-fill h-full object-contain"
              alt="" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">{cartItem?.title}</h3>
            <button onClick={()=> handleRemoveFromCart(cartItem, true)} className="text-sm px-4 py-3 bg-black text-white font-extrabold mt-10">Remove</button>
          </div>
        </div>
        <div className="ml-auto">
          <h3 className="text-lg font-bold text-gray-900">${cartItem?.totalPrice.toFixed(2)}</h3>
          <p className="mt-2 mb-3 font-bold text-[16px]">Quantity: {cartItem?.quantity}</p>
          <div className="mt-3">
            <button 
              onClick={()=> handleRemoveFromCart(cartItem, false)} 
              className="disabled:opacity-30 border border-[#000] mr-5"
              disabled={cartItem?.quantity === 1}>-</button>
            <button onClick={()=> handleAddToCart(cartItem)} className="border border-[#000]">+</button>
          </div>
        </div>
      </div>
      <hr className="border-gray-500 mt-5 mb-5"/>
    </>
  )
}