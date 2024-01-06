import { useAppDispatch } from 'app/hooks'
import { addProduct } from 'app/shopSlice'
import React, { useState } from 'react'
import { Product, Shop } from 'types'
import { v4 as uuidv4 } from 'uuid'

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
    // Handle form submission with inputValue and selectedShop
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
    <div className="form-row">
      <input
        type="text"
        placeholder="Enter text"
        value={productName}
        onChange={handleInputChange}
      />
      <select value={selectedShop} onChange={handleSelectChange}>
        <option value="" disabled>
          Select an option
        </option>
        {shops.map((shop) => (
          <option value={shop.name} key={shop.id}>
            {shop.name}
          </option>
        ))}
      </select>
      <button onClick={handleSubmit}>Enter</button>
    </div>
  )
}

export default Inputs
