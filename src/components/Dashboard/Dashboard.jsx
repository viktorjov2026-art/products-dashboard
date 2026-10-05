import { useContext, useState } from "react";
import Pagination from "../Pagination/Pagination";
import ProductsTable from "../ProductsTable/ProductsTable";
import "./Dashboard.css";
import { ProductContext } from "../../App";
import ProductFilters from "../ProductFilters/ProductFilters";
import KPICards from "../KPICards/KPICards";

function Dashboard() {
  const { currentProduct, setCurrentProduct } = useContext(ProductContext);

  return (
    <div className="dashboard">
      <div className="main-dashboard">
        <h2>Product dashboard</h2>
        <KPICards />
        <ProductFilters />
        <ProductsTable />

        <Pagination />
      </div>
    </div>
  );
}

export default Dashboard;
