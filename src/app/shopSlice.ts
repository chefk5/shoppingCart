import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getShops } from 'services/ShopService'
import { Product, Shop } from 'types'

export interface ShopState {
  shops: Shop[]
  error: string
  status: string
  products: Product[]
}

const initialState: ShopState = {
  shops: [],
  error: '',
  status: 'loading',
  products: []
}

export const fetchShops = createAsyncThunk('shops/fetchShops', async () => {
  try {
    const shops: Shop[] = await getShops()
    return shops
  } catch (error) {
    console.error('error in shopslice>fetchShops: ', error)
  }
})

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products = [action.payload, ...state.products].sort(
        (a, b) => a.sortOrder - b.sortOrder
      )
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      const selectedItemIndex = state.products.findIndex(
        (product) => product.id === action.payload
      )
      if (selectedItemIndex > -1) {
        state.products.splice(selectedItemIndex, 1)
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchShops.fulfilled, (state, action) => {
      state.shops = action.payload as Shop[]
      state.status = 'success'
    })
    builder.addCase(fetchShops.rejected, (state, action) => {
      state.error = action.error.message as string
      state.status = 'error'
    })
    builder.addCase(fetchShops.pending, (state, action) => {
      state.status = 'loading'
    })
  }
})

export const { addProduct, deleteProduct } = shopSlice.actions

export default shopSlice.reducer
