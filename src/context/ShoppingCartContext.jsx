import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const ShoppingCartContext = createContext(null);

export default function ShoppingCartProvider({ children }){

  const [loading, setLoading] = useState(true);
  const [listOfProducts, setListOfProducts] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  async function fetchListOfProducts(){
    const apiResponse = await fetch('https://dummyjson.com/products');
    const result = await apiResponse.json();

    if(result && result?.products){
      setListOfProducts(result?.products);
      setLoading(false)
    }
  }

  function handleAddToCart(getProductDetails){
    let copyExistingCartItems = [...cartItems];
    const findIndexOfCurrentItem = copyExistingCartItems.findIndex(cartItem => cartItem.id === getProductDetails.id)
    
    if(findIndexOfCurrentItem === -1){
      copyExistingCartItems.push({
        ...getProductDetails,
        quantity: 1,
        totalPrice: getProductDetails?.price
      })
    }
    else {
      copyExistingCartItems[findIndexOfCurrentItem] = {
        ...copyExistingCartItems[findIndexOfCurrentItem],
        quantity: copyExistingCartItems[findIndexOfCurrentItem].quantity + 1,
        totalPrice: (copyExistingCartItems[findIndexOfCurrentItem].quantity + 1) * copyExistingCartItems[findIndexOfCurrentItem].price,
      }
    }
    
    setCartItems(copyExistingCartItems);
    localStorage.setItem('cartItems', JSON.stringify(copyExistingCartItems));
    navigate('/cart');
  }

  function handleRemoveFromCart(getProductDetails, isFullyRemoveFromCart){
    let copyExistingCartItems = [...cartItems];
    const findIndexOfCurrentCartItem = copyExistingCartItems.findIndex(item => item.id === getProductDetails.id);

    if(isFullyRemoveFromCart){
      copyExistingCartItems.splice(findIndexOfCurrentCartItem, 1)
    }
    else{
        copyExistingCartItems[findIndexOfCurrentCartItem] = {
        ...copyExistingCartItems[findIndexOfCurrentCartItem],
        quantity : copyExistingCartItems[findIndexOfCurrentCartItem].quantity - 1,
        totalPrice: (copyExistingCartItems[findIndexOfCurrentCartItem].quantity - 1) * copyExistingCartItems[findIndexOfCurrentCartItem].price
      }
    }
    
    localStorage.setItem('cartItems', JSON.stringify(copyExistingCartItems));
    setCartItems(copyExistingCartItems)
  }
  

  useEffect(()=>{
    fetchListOfProducts();
    setCartItems(JSON.parse(localStorage.getItem('cartItems') || []))
  }, []);

  return <ShoppingCartContext.Provider value={{listOfProducts, 
                                                loading, 
                                                setLoading, 
                                                productDetails, 
                                                setProductDetails,
                                                handleAddToCart,
                                                cartItems,
                                                handleRemoveFromCart,
                                              }
    }>{ children }</ShoppingCartContext.Provider>
}