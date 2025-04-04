import { useEffect } from "react"
import CartSection from "./components/cart/CartSection"
import ProductDisplaySection from "./components/product-display/ProductDisplaySection"
import { useDispatch } from "react-redux"
import DessertItem from "./types"
import { setProducts } from "./state/slices/productSlice"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('../data.json')
        const data: DessertItem[] = await response.json()
        console.log(data)
        dispatch(setProducts(data))        
      } catch (error) {
        console.error(`Error loading data: ${error}`)
      }
    }

    fetchData()
  }, [dispatch])
  
  return (
    <main className=''>
      <div className="container flex flex-col lg:flex-row gap-8 py-16">
        <ProductDisplaySection />
        <CartSection />
      </div>
    </main>
  )
}

export default App