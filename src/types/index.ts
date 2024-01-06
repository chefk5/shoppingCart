export type Shop = {
  id: string
  name: string
  sortOrder: number
}

export type Product = {
  id: string
  name: string
  shop: string
  sortOrder: number
}
