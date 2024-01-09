
# Shopping cart

A shopping cart to dd products to different stores.

## Getting Started

Install dependencies.

```bash
pnpm install
```

Serve with hot reload at <http://localhost:5173>.

```bash
pnpm run dev
```

### Test

```bash
pnpm run test
```

View and interact with your tests via UI.

```bash
pnpm run test:ui
```

## Features

- Type a product -> Select a product -> press add -> The prudct will be added to cart showing which shop it is for.
- If no product or shop is slected, an error is shown.
- Each shop has an order which determines th eorder of products.
- If a shop does not have an order, its products will shown on the top.
- Integration tests are added.

## Limitations

- More tests could be added
- Some UI tweaks might be needed
- Mock of requests
- Not handling loading and error status while fetching the shops.

Project started with a boilerplate

