import { useContext } from "react";
import "./ProductsTable.css";
import { ProductContext } from "../../App";
import ProductRow from "../ProductRow/ProductRow";
import loadingGiff from "../../assets/loadingGiff.gif";

function ProductsTable() {
  const { data, loading, error } = useContext(ProductContext);

  if (loading) {
    return <img className="loading-gif" src={loadingGiff} />;
  }

  if (error) {
    return (
      <p>Something went wrong while loading products. Please try again.</p>
    );
  }

  if (data.products.length === 0) {
    return <p>No products found...</p>;
  }

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Thumbnail</th>
          <th>Title</th>
          <th>Category</th>
          <th>Brand</th>
          <th>Price</th>
          <th>Rating</th>
          <th>Stock</th>
        </tr>
      </thead>
      <tbody>
        {data.products.map((product) => {
          return <ProductRow key={product.id} product={product} />;
        })}
      </tbody>
    </table>
  );
}

export default ProductsTable;
