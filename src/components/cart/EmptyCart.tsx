import EmptyCartSvg from './EmptyCartSvg'

const EmptyCart = () => {
  return (
    <div className="px-6 pb-10 pt-5 bg-white flex flex-col justify-between gap-6 items-center rounded-lg">
      <h2 className="text-2xl text-priColor font-bold self-start">Your Cart (0)</h2>
      <EmptyCartSvg />
      <p className="text-xs text-clay font-medium">Your added items will appear here</p>
    </div>
  )
}

export default EmptyCart