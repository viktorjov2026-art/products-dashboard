import { useContext } from "react";
import "./ProductRow.css";
import { ProductContext } from "../../App";

function ProductRow({ product }) {
  const { setCurrentProduct } = useContext(ProductContext);

  return (
    <tr className="product-row">
      <td>{product.id}</td>
      <td className="thumbnail">
        {" "}
        <img src={`${product.thumbnail}`} alt="" />
      </td>
      <td>{product.title}</td>
      <td>{product.category}</td>
      <td>{product.brand}</td>
      <td>{product.price}$</td>
      <td>{product.rating}</td>
      <td>{product.stock}</td>

      <td>
        <button
          className="details-btn"
          onClick={() => setCurrentProduct(product)}
        >
          product details
        </button>
      </td>
    </tr>
  );
}

export default ProductRow;
