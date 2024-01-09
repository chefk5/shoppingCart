import { useAppDispatch } from 'app/hooks'
import { deleteProduct } from 'app/shopSlice'
import styles from './Table.module.scss'

type RowProps = {
  id: string
  name: string
  shop: string
  index: number
}
const Row = ({ id, name, shop, index }: RowProps) => {
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
