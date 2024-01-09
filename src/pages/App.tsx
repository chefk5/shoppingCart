import { useAppDispatch, useAppSelector } from 'app/hooks'
import { fetchShops } from 'app/shopSlice'
import Title from 'components/Title'
import Inputs from 'components/header/Inputs'
import Table from 'components/table/Table'
import { useEffect } from 'react'
import '../styles/styles.scss'

function App() {
  const { shops, status, products } = useAppSelector((state) => state.shops)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchShops())
  }, [dispatch])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {status === 'loading' ? (
        <p>Loading</p>
      ) : (
        <>
          <Title />
          <Inputs shops={shops} />
          <Table products={products} />
        </>
      )}
    </div>
  )
}

export default App
