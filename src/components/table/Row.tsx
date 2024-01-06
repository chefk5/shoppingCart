import { useAppDispatch } from 'app/hooks'
import { deleteProduct } from 'app/shopSlice'
import React from 'react'
import { Product } from 'types'

const Row = ({ id, name, shop }: Product) => {
  const dispatch = useAppDispatch()
  const deleteProductHandler = (id: string) => {
    dispatch(deleteProduct(id))
  }
  return (
    <tr>
      <td>{name}</td>
      <td>{shop}</td>
      <td>
        <button
          className="delete-button"
          onClick={() => deleteProductHandler(id)}
        >
          Delete
        </button>
      </td>
    </tr>
  )
}

export default Row
