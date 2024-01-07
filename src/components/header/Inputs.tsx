import { useAppDispatch } from 'app/hooks'
import { addProduct } from 'app/shopSlice'
import React, { useState } from 'react'
import { Product, Shop } from 'types'
import { v4 as uuidv4 } from 'uuid'
import styles from './Inputs.module.scss'
type Props = {
  shops: Shop[]
}

const Inputs = ({ shops }: Props) => {
  const [productName, setProductName] = useState('')
  const [selectedShop, setSelectedShop] = useState('')
  const dispatch = useAppDispatch()
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value)
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedShop(e.target.value)
  }

  const handleSubmit = () => {
    if (selectedShop && productName) {
      const selectedShopOrder = shops.find((shop) => shop.name === selectedShop)
      const newProduct: Product = {
        id: uuidv4(),
        name: productName,
        shop: selectedShop,
        sortOrder: selectedShopOrder?.sortOrder ?? 1
      }
      dispatch(addProduct(newProduct))
    }
  }

  return (
    <div className={styles.inputsContainer}>
      <input
        className={styles.textInput}
        type="text"
        placeholder="Name"
        value={productName}
        onChange={handleInputChange}
      />
      <select
        className={styles.textInput}
        data-testid="shopInput"
        value={selectedShop}
        onChange={handleSelectChange}
      >
        <option value="" disabled>
          Select an option
        </option>
        {shops &&
          shops.map((shop) => (
            <option value={shop.name} key={shop.id}>
              {shop.name}
            </option>
          ))}
      </select>

      <button className={styles.enterBtn} onClick={handleSubmit}>
        Add
      </button>
    </div>
  )
}

export default Inputs
