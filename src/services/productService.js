import products from "../data/products";

export const getProducts = () => products;

export const getProductById = (id) =>
  products.find((product) => product.id === Number(id));
