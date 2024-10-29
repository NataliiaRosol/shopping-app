import { Route, Routes } from 'react-router-dom'
import ProductListPage from './pages/productList/ProductListPage'
import ProductDetailsPage from './pages/productDetails/ProductDetailsPage'
import CartPage from './pages/cartList/CartPage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<ProductListPage/>}/>
      </Routes>
      <Routes>
        <Route path='/product-details/:id' element={<ProductDetailsPage/>}/>
      </Routes>
      <Routes>
        <Route path='/cart' element={<CartPage/>}/>
      </Routes>
    </>
  )
}

export default App
