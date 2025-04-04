import DessertCards from "./DessertCards"

const ProductDisplaySection = () => {
  return (
    <div className="">
      <h1 className="text-4xl text-burnt font-bold mb-7">Desserts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <DessertCards />
      </div>
    </div>
  )
}

export default ProductDisplaySection