import { Route, Routes } from 'react-router-dom'
import ProductListPage from './pages/productList/ProductListPage'
import ProductDetailsPage from './pages/productDetails/ProductDetailsPage'
import CartPage from './pages/cartList/CartPage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<ProductListPage/>}></Route>
      </Routes>
      <Routes>
        <Route path='/product-details/:id' element={<ProductDetailsPage/>}></Route>
      </Routes>
      <Routes>
        <Route path='/cart' element={<CartPage/>}></Route>
      </Routes>
    </>
  )
}

export default App
