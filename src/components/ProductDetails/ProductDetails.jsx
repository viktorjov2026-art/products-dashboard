import { useContext } from "react";
import "./ProductDetails.css";
import { ProductContext } from "../../App";

function ProductDetails({ currentProduct, setCurrentProduct }) {
  const { detailsRef } = useContext(ProductContext);
  const meta = currentProduct.meta;
  return (
    <div className="product-details" ref={detailsRef}>
      <h3>Product details:</h3>
      <img src={`${currentProduct.thumbnail}`} alt="" />
      <h3>{currentProduct.title}</h3>
      <p>{currentProduct.description}</p>

      <p className="created-at-info">Created At: {meta.createdAt}</p>
      <p className="updated-at-info">Updated At: {meta.updatedAt}</p>
      <button
        className="close-details-btn"
        onClick={() => setCurrentProduct(null)}
      >
        Close
      </button>
    </div>
  );
}

export default ProductDetails;
