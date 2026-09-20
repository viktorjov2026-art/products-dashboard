import "./ProductDetails.css";

function ProductDetails({ currentProduct, setCurrentProduct }) {
  const meta = currentProduct.meta;
  return (
    <div className="product-details">
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
