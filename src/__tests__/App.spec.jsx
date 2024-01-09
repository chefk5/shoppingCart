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

const setup = async (shopsArr) => {
  reducer(<App />, {
    preloadedState: {
      shops: {
        shops: shopsArr,
        products: []
      }
    }
  })
}

const setupAndAddProduct = async (shop, productName, isSetup, shopsArr) => {
  if (isSetup) {
    await setup(shopsArr)
  }

  const btn = await screen.getByText('Add')
  const dropdownElement = await screen.getByTestId('shopInput')
  const inputElement = await screen.getByPlaceholderText('Name')

  fireEvent.change(dropdownElement, { target: { value: shop } })
  fireEvent.change(inputElement, { target: { value: productName } })
  fireEvent.click(btn)
  await waitFor(() => screen.getByTestId('row-0'))
}

test('Adds a products and displays it in the table', async () => {
  await setupAndAddProduct('Rimi', 'Product 1', true, shops)

  const firstRowContent = await screen.getByTestId('row-0').textContent
  expect(firstRowContent).toBe('Product 1RimiDelete')
})

// test('Does not add a product if no item in dropdown is selected', async () => {
//   await setup()
//   let btn = screen.getByText('Add')
//   let inputElement = screen.getByPlaceholderText('Name')
//   fireEvent.change(inputElement, { target: { value: 'Product 1' } })
//   fireEvent.click(btn)
//   const firstRowContent = await screen.findByTestId('row-0').textContent
//   expect(firstRowContent).toBeUndefined()
// })

// test('Products are shown in correct order', async () => {
//   await setupAndAddProduct('Rimi', 'Product 1', true, shops)
//   await setupAndAddProduct('Selver', 'Product 2', false, shops)

//   const firstRowContent = screen.getByTestId(`row-0`).textContent
//   const secondRowContent = screen.getByTestId(`row-1`).textContent
//   expect(firstRowContent).toBe('Product 1RimiDelete')
//   expect(secondRowContent).toBe('Product 2SelverDelete')
// })

// test('Products of shops with no order are rendered first', async () => {
//   const shopsNoOrder = [
//     {
//       id: 'maxima',
//       name: 'Maxima'
//     },
//     {
//       id: 'rimi',
//       name: 'Rimi',
//       sortOrder: 1
//     },
//     {
//       id: 'selver',
//       name: 'Selver',
//       sortOrder: 3
//     }
//   ]
//   await setupAndAddProduct('Selver', 'Product 1', true, shopsNoOrder)
//   await setupAndAddProduct('Maxima', 'Product 2', false, shopsNoOrder)
//   const firstRowContent = screen.getByTestId(`row-0`).textContent
//   const secondRowContent = screen.getByTestId(`row-1`).textContent
//   expect(firstRowContent).toBe('Product 2MaximaDelete')

//   expect(secondRowContent).toBe('Product 1SelverDelete')
// })

// test('Products are deleted when delete btn is pressed', async () => {
//   await setupAndAddProduct('Rimi', 'Product 1', true, shops)
//   await setupAndAddProduct('Selver', 'Product 2', false, shops)
//   const firstRow = screen.getByTestId('row-0')
//   const deleteButtonInFirstRow =
//     firstRow.getElementsByClassName('delete-button')[0]
//   fireEvent.click(deleteButtonInFirstRow)
//   expect(firstRow).not.toBeInTheDocument()
// })

// test('Shows an error if no item is written and dropdown is selected', async () => {
//   setup(shops)

//   const dropdownElement = screen.getByTestId('shopInput')
//   fireEvent.change(dropdownElement, { target: { value: 'Rimi' } })
//   const btn = screen.getByText('Add')
//   fireEvent.click(btn)

//   const firstRowContent = screen.queryByTestId('row-0')
//   const errorMessages = screen.getByTestId('error')

//   expect(firstRowContent).toBeNull()
//   expect(errorMessages).toContainHTML('Please enter a product name')
// })

// test('Shows an error if item is written but dropdown is not selected', async () => {
//   await setup(shops)

//   const inputElement = screen.getByPlaceholderText('Name')
//   const btn = screen.getByText('Add')

//   fireEvent.change(inputElement, { target: { value: 'prod 1' } })
//   fireEvent.click(btn)

//   const firstRowContent = screen.queryByTestId('row-0')
//   const errorMessages = screen.getByTestId('error')

//   expect(firstRowContent).toBeNull()
//   expect(errorMessages).toContainHTML('Please select a shop')
// })
