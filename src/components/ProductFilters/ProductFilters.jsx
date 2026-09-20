import { useContext, useEffect, useState } from "react";
import "./ProductFilters.css";
import { ProductContext } from "../../App";
import SearchIcon from "../Icons/SearchIcon";

function ProductFilters() {
  const {
    setSearch,
    setFromDate,
    setToDate,
    fromDate,
    toDate,
    setSkip,
    search,
    data,
    loading,

    setSorted,

    setSortOrder,
    sortOrder,
  } = useContext(ProductContext);

  if (loading) {
    return;
  }

  return (
    <div className="product-filters">
      <div className="section">
        <label>search products...</label>
        <div className="search-wrapper">
          <SearchIcon className="search-icon" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            className="search-input"
          />
        </div>

        <label>From date:</label>
        <input
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          type="date"
          className="date-input"
        />
        <label>To date:</label>
        <input
          value={toDate}
          onChange={(e) => {
            setToDate(e.target.value);
          }}
          type="date"
          className="date-input"
        />
      </div>
      <label>sort...</label>

      <div className="option-buttons">
        <button
          className="btns clear-filters-btn"
          onClick={() => {
            setSearch("");
            setFromDate("");
            setToDate("");
            setSorted("");
            setSkip(0);
          }}
        >
          Clear filters
        </button>

        <button
          className="btns sort-price-btn"
          onClick={() => setSorted("price")}
        >
          Sort by price
        </button>
        <button
          className="btns sort-rating-btn"
          onClick={() => setSorted("rating")}
        >
          Sort by rating
        </button>
        <button
          className="btns sort-stock-btn"
          onClick={() => setSorted("stock")}
        >
          Sort by stock
        </button>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="" disabled>
            select
          </option>

          <option value="desc">desc</option>
          <option value="asc">asc</option>
        </select>
      </div>
    </div>
  );
}

export default ProductFilters;
