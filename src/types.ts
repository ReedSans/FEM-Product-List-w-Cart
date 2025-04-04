type Images = {
  thumbnail: string,
  mobile: string,
  tablet: string,
  desktop: string,
}

type DessertItem = {
  image: Images,
  name: string,
  category: string,
  price: number,
}

export type CartItem = DessertItem & {
  quantity: number,
  totalPrice: number,
}

export default DessertItem