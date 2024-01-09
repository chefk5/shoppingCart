import { useAppDispatch } from 'app/hooks'
import { deleteProduct } from 'app/shopSlice'
import React from 'react'
import { Product } from 'types'
import styles from './Table.module.scss'

const Row = ({ id, name, shop, index }: Product) => {
  const dispatch = useAppDispatch()
  const deleteProductHandler = (id: string) => {
    dispatch(deleteProduct(id))
  }

  return (
    <div
      className={styles.rowContainer}
      style={{ background: index % 2 === 0 ? '#FBFBFB' : '#fff' }}
      data-testid={`row-${index}`}
    >
      <div className={styles.col1}>{name}</div>
      <div className={styles.col2}>{shop}</div>
      <div className={styles.col3}>
        <button
          className="delete-button"
          onClick={() => deleteProductHandler(id)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default Row
