import { useContext } from "react";
import "./KPICards.css";
import { ProductContext } from "../../App";

function KPICards() {
  const { kpiData, kpiLoading, loading } = useContext(ProductContext);

  if (kpiLoading) {
    return;
  }

  const products = kpiData.products;

  const totalRating = products.reduce((acc, product) => {
    acc += product.rating;

    return acc;
  }, 0);

  const lowStock = products.filter((product) => product.stock < 10).length;

  const totalStock = products.reduce((acc, product) => {
    acc += product.stock;

    return acc;
  }, 0);
  const averageRating = totalRating / products.length;

  const totalPrice = products.reduce((acc, product) => {
    acc += product.price;

    return acc;
  }, 0);

  const averagePrice = totalPrice / products.length;

  return (
    <div className="kpi-section">
      <div className="low-stock">
        <p>Low stock:</p> <span>{!loading ? `${lowStock}` : "..."}</span>
      </div>
      <div className="total-products">
        <p>Total products:</p> <span>{!loading ? products.length : "..."}</span>
      </div>
      <div className="average-rating">
        <p>Average rating:</p>{" "}
        <span>
          {!loading ? (Math.round(averageRating) * 100) / 100 : "..."} / 5
        </span>
      </div>
      <div className="average-price">
        <p>Average price:</p>{" "}
        <span>
          {!loading ? Math.round((averagePrice * 100) / 100) : "..."}$
        </span>
      </div>
      <div className="total-stock">
        <p>Total stock</p> <span>{!loading ? totalStock : "..."} units</span>
      </div>
    </div>
  );
}

export default KPICards;
