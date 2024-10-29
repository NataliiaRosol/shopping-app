import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { ShoppingCartContext } from "../../context/ShoppingCartContext";


export default function ProductDetailsPage(){

  const {id} = useParams();

  
  const {productDetails, setProductDetails, loading, setLoading, handleAddToCart, cartItems} = useContext(ShoppingCartContext);

  async function fetchProductDetails(){
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const result = await response.json();

    if(result){
      setProductDetails(result);
      setLoading(false)
    }
    
  }
  
  useEffect(()=>{
    fetchProductDetails()
  }, [id]);
  
  if(loading) return <h1>Product details loading! Please wait...</h1>

  return (
    <div>
      <div className="p-6 lg:max-w-7xl max-w-4xl mx-auto">
        <div className="grid items-center grid-cols-1 lg:grid-cols-5 gap-12 shadow-sm p-6">
          <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
            <div className="px-4 py-10 rounded-xl shadow-lg relative">
              <img 
                src={productDetails?.thumbnail} 
                alt={productDetails?.title} 
                className="w-4/5 rounded object-cover"
                />
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
              {
                productDetails?.images?.length ?
                productDetails?.images.map(imgItem =>               
                  <div className="rounded-xl p-4 shadow-md" key={imgItem}>
                    <img 
                      src={imgItem} 
                      alt="product secondary img"
                      className="w-24 cursor-pointer"
                    />
                    {console.log(imgItem)}
                  </div>
                ) : null
              }
            </div>
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-extrabold text-[#333333]">
              {productDetails?.title}
            </h2>
            <div className="flex flex-wrap gap-4 mt-4">
              <p className="text-xl font-bold">${productDetails?.price}</p>
            </div>
            <button 
              onClick={()=> handleAddToCart(productDetails)} 
              disabled={
                productDetails ? 
                cartItems.findIndex(item => item.id === productDetails.id) > -1 : false}
              className="disabled:opacity-30 mt-5 min-w-[200px] px-4 py-3 border border-[#333333] bg-transparent text-sm font-semibold rounded">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}