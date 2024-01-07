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
    <tr
      className={styles.row}
      style={{ background: index % 2 == 0 ? '#FBFBFB' : '#fff' }}
      data-testid={`row-${index}`}
    >
      <div
        style={{
          width: '50%',
          display: 'flex',
          paddingLeft: '60px',
          paddingTop: '10px',
          paddingBottom: '10px'
        }}
      >
        <td className={styles.col1}>{name}</td>
        <td className={styles.col2}>{shop}</td>
        <td className={styles.col3}>
          <button
            className="delete-button"
            onClick={() => deleteProductHandler(id)}
          >
            Delete
          </button>
        </td>
      </div>
    </tr>
  )
}

export default Row
