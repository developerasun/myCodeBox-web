# Learning database design essentials

Break things into smaller ones, atomically. For example,

```ts
// bad
const customer = {
  CustomerName: "some value",
};

// good
const customer = {
  firstname: "some value",
  lastname: "some value",
};
```

Do not include irrelevant data.

```ts
// bad
const customer = {
  firstname: "some value",
  lastname: "some value",
  employerName: "some value",
};

// good
const customer = {
  firstname: "some value",
  lastname: "some value",
};
```

Do not create a redundant data for tables.

```ts
// bad
const order = {
  date: "some value",
  productName: "some value",
};
const product = {
  size: "some value",
  productName: "some value",
};

// good
const order = {
  date: "some value",
};
const product = {
  size: "some value",
  productName: "some value",
};
```

Bridge table pattern helps to resolve many to many relationship. For example, orderProductBridge might have {orderId: 113, productId: 55}, {orderId: 88, productId: 23}.

```ts
const order = {
  orderId: "PK-some value",
  date: "some value",
};

const orderProductBridge = {
  orderId: "PK-some value",
  productId: "PK-some value",
};

const product = {
  productId: "PK-some value",
  price: "some value",
};
```

## Reference

- [Database Design Tutorial](https://youtu.be/I_rxqSJAj6U)
