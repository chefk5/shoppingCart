import { fireEvent, reducer, screen, waitFor } from './setupTest'

import App from 'pages/App'

const shops = [
  {
    id: 'maxima',
    name: 'Maxima',
    sortOrder: 3
  },
  {
    id: 'rimi',
    name: 'Rimi',
    sortOrder: 1
  },
  {
    id: 'selver',
    name: 'Selver',
    sortOrder: 2
  }
]

beforeEach(() =>
  reducer(<App />, {
    preloadedState: {
      shops: {
        shops: shops,
        products: []
      }
    }
  })
)

const setupAndAddProduct = async (shop, productName) => {
  const btn = await screen.getByText('Add')
  const dropdownElement = await screen.getByTestId('shopInput')
  const inputElement = await screen.getByPlaceholderText('Name')

  fireEvent.change(dropdownElement, { target: { value: shop } })
  fireEvent.change(inputElement, { target: { value: productName } })
  fireEvent.click(btn)
}

test('Adds a products and displays it in the table', async () => {
  await setupAndAddProduct('Rimi', 'Product 1', true, shops)

  const firstRowContent = await screen.getByTestId('row-0').textContent
  expect(firstRowContent).toBe('Product 1RimiDelete')
})

test('Does not add a product if no item in dropdown is selected', async () => {
  const btn = screen.getByText('Add')
  const inputElement = screen.getByPlaceholderText('Name')
  fireEvent.change(inputElement, { target: { value: 'Product 1' } })
  fireEvent.click(btn)

  const rows = screen.queryAllByTestId(/^row-\d+$/)
  expect(rows).toHaveLength(0)
})

test('Products are shown in correct order', async () => {
  await setupAndAddProduct('Rimi', 'Product 1', true, shops)
  await setupAndAddProduct('Selver', 'Product 2', false, shops)

  await waitFor(
    () => {
      const rows = screen.getAllByTestId(/^row-\d+$/)
      const rowContents = rows.map((row) => row.textContent)

      expect(rowContents).toEqual([
        'Product 1RimiDelete',
        'Product 2SelverDelete'
      ])
    },
    { timeout: 500 }
  )
})

test('Products are deleted when delete btn is pressed', async () => {
  await setupAndAddProduct('Rimi', 'Product 1', true, shops)
  await setupAndAddProduct('Selver', 'Product 2', false, shops)
  const firstRow = screen.getByTestId('row-0')
  const deleteButtonInFirstRow =
    firstRow.getElementsByClassName('delete-button')[0]
  fireEvent.click(deleteButtonInFirstRow)
  expect(firstRow).not.toBeInTheDocument()
})

test('Shows an error if no item is written and dropdown is selected', async () => {
  const dropdownElement = screen.getByTestId('shopInput')
  fireEvent.change(dropdownElement, { target: { value: 'Rimi' } })
  const btn = screen.getByText('Add')
  fireEvent.click(btn)

  const firstRowContent = screen.queryByTestId('row-0')
  const errorMessages = screen.getByTestId('error')

  expect(firstRowContent).toBeNull()
  expect(errorMessages).toContainHTML('Please enter a product name')
})

test('Shows an error if item is written but dropdown is not selected', async () => {
  const inputElement = screen.getByPlaceholderText('Name')
  const btn = screen.getByText('Add')

  fireEvent.change(inputElement, { target: { value: 'prod 1' } })
  fireEvent.click(btn)

  const firstRowContent = screen.queryByTestId('row-0')
  const errorMessages = screen.getByTestId('error')

  expect(firstRowContent).toBeNull()
  expect(errorMessages).toContainHTML('Please select a shop')
})
