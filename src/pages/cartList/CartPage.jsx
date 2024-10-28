import { useContext } from "react"
import { ShoppingCartContext } from "../../context/ShoppingCartContext"
import { useNavigate } from "react-router-dom";
import CartTile from "../components/cartTile/CartTile";


export default function CartPage(){

  const {cartItems} = useContext(ShoppingCartContext);
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto max-md:max-w-xl py-4">
      <h1 className="text-2xl font-bold text-gray-800 text-center">My cart page</h1>
      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <div className="md:col-span-2 spase-y-4">
          {
            cartItems?.length ? 
            cartItems.map(cartItem => <CartTile cartItem={cartItem}/>)
            : <h1>No items in the cart</h1>
          }
        </div>

        <div className="bg-gray-100 rounded-sm p-4 h-max">
          <h3 className="text-xl font-extrabold text-gray-950 border-gray-300 border-b pb-2">Order Summary</h3>
          <ul className="text-gray-700 mt-4 space-y-2">
            <p className="flex flex-wrap gap-4 text-sm font-bold">
              Total: <span>${cartItems.reduce((acc, curr) => acc + curr.totalPrice, 0).toFixed(2)}</span>
            </p>
          </ul>
          <div className="flex gap-2 mt-5">
            <button 
              disabled={cartItems.length === 0 }
              className="disabled:opacity-30 text-sm px-4 py-3 bg-black text-white font-extrabold">Checkout</button>
            <button className="text-sm px-4 py-3 bg-black text-white font-extrabold" onClick={()=> navigate('/products')}>Continue Shopping</button>
          </div>
        </div>
      </div>
    </div>
  )
}