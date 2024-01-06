import { useAppDispatch, useAppSelector } from 'app/hooks'
import { fetchShops } from 'app/shopSlice'
import Title from 'components/Title'
import Inputs from 'components/header/Inputs'
import Table from 'components/table/Table'
import { useEffect } from 'react'

function App() {
  const { shops, error, status, products } = useAppSelector(
    (state) => state.shops
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchShops())
  }, [])

  return (
    <div>
      <p>{status}</p>
      <Title />
      <Inputs shops={shops} />
      <Table products={products} />
    </div>
  )
}

export default App
