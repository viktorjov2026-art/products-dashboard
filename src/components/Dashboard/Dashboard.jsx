import { useContext } from "react";
import Pagination from "../Pagination/Pagination";
import ProductsTable from "../ProductsTable/ProductsTable";
import "./Dashboard.css";
import { ProductContext } from "../../App";
import ProductFilters from "../ProductFilters/ProductFilters";
import KPICards from "../KPICards/KPICards";
import ProductDetails from "../ProductDetails/ProductDetails";

function Dashboard() {
  const { currentProduct, setCurrentProduct } = useContext(ProductContext);
  return (
    <div className="dashboard">
      <h2>Product dashboard</h2>
      <KPICards />
      <ProductFilters />
      <ProductsTable />
      {currentProduct && (
        <ProductDetails
          currentProduct={currentProduct}
          setCurrentProduct={setCurrentProduct}
        />
      )}
      <Pagination />
    </div>
  );
}

export default Dashboard;
