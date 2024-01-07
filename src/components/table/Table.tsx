import React from 'react'
import Row from './Row'
import { Product } from 'types'
import styles from './Table.module.scss'
type Props = {
  products: Product[]
}

const Table = ({ products }: Props) => {
  return products && products.length ? (
    <table className={styles.table}>
      <tbody data-testid="tableRows">
        {products.map((product, index) => (
          <Row
            id={product.id}
            name={product.name}
            shop={product.shop}
            key={product.id}
            index={index}
          />
        ))}
      </tbody>
    </table>
  ) : (
    <div
      style={{
        marginLeft: '40px'
      }}
    >
      <p>No products found</p>
    </div>
  )
}

export default Table
