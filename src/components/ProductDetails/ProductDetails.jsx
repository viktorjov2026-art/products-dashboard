import { useEffect, useState } from "react";
import "./ProductDetails.css";

function ProductDetails({ productId }) {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [productLoading, setProductLoading] = useState(true);

  async function getProduct() {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/${productId}`,
      );

      const product = await response.json();

      setProduct(product);
    } catch (error) {
      setError(error.message);
    } finally {
      setProductLoading(false);
    }
  }

  useEffect(() => {
    getProduct();
  }, [productId]);

  if (productLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Product not found</p>;
  }

  const meta = product.meta;
  return (
    <div className="product-details">
      <h1 className="page-heading">Product details:</h1>
      <img src={`${product.thumbnail}`} alt="" className="product-img" />
      <h3 className="product-title">{product.title}</h3>
      <p className="description">{product.description}</p>

      <p className="price">{product.price}$</p>
      <p className="stock">stock {product.stock}</p>

      <p className="created-at-info">Created At: {meta.createdAt}</p>
      <p className="updated-at-info">Updated At: {meta.updatedAt}</p>
    </div>
  );
}

export default ProductDetails;
