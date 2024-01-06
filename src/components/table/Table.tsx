import React from 'react'
import Row from './Row'
import { Product } from 'types'

type Props = {
  products: Product[]
}

const Table = ({ products }: Props) => {
  return (
    <table>
      <tbody>
        {products.map((product) => (
          <Row
            id={product.id}
            name={product.name}
            shop={product.shop}
            key={product.id}
          />
        ))}
      </tbody>
    </table>
  )
}

export default Table
