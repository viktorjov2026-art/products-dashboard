import "./pages.css";

import ProductDetails from "../components/ProductDetails/ProductDetails";

function ProductDetailsPage() {
  const params = new URLSearchParams(window.location.search);

  const productId = Number(params.get("productId"));
  return (
    <div className="details-page">
      <ProductDetails productId={productId} />
    </div>
  );
}

export default ProductDetailsPage;
