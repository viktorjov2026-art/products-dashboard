import { createContext, useEffect, useRef, useState } from "react";
import ProductDetailsPage from "./pages/ProductDetailsPage";

import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";

export const ProductContext = createContext();

function App() {
  const params = new URLSearchParams(window.location.search);
  const productId = Number(params.get("productId"));
  const [limit, setLimit] = useState(10);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [skip, setSkip] = useState(0);

  const [search, setSearch] = useState("");

  const [isSkipZero, setIsSkipZero] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [kpiData, setKpiData] = useState(null);
  const detailsRef = useRef(null);
  const [kpiLoading, setKpiLoading] = useState(true);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [sorted, setSorted] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const previousSearch = useRef(search);
  const previousSorted = useRef(sorted);
  const previousFromDate = useRef(fromDate);
  const previousToDate = useRef(toDate);
  const previousSortOrder = useRef(sortOrder);

  const time = "T00:00:00Z";
  const from = new Date(fromDate);
  const to = new Date(toDate);

  let baseUrl = "https://dummyjson.com/products";

  async function getProducts({
    search,
    fromDate,
    toDate,
    sorted,
    sortOrder,
    limit,
    skip,
  }) {
    let url = baseUrl;
    const params = new URLSearchParams();
    params.set("limit", limit);
    params.set("skip", skip);

    if (search) {
      url += "/search";
      params.set("q", search);
    }

    if (fromDate) {
      params.set("modifiedAfter", fromDate + time);
    }

    if (toDate) {
      params.set("modifiedBefore", toDate + time);
    }

    if (sorted) {
      params.set("sortBy", sorted);
    }

    params.set("order", sortOrder);

    try {
      const response = await fetch(`${url}?${params}`);

      const data = await response.json();

      setData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function getKPIdata({ search, fromDate, toDate }) {
    setKpiLoading(true);

    let url = baseUrl;
    const params = new URLSearchParams();

    params.set("limit", "194");

    if (search) {
      url += "/search";
      params.set("q", search);
    }

    if (fromDate) {
      params.set("modifiedAfter", fromDate + time);
    }

    if (toDate) {
      params.set("modifiedBefore", toDate + time);
    }
    try {
      const response = await fetch(`${url}?${params}`);

      const data = await response.json();
      setKpiData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setKpiLoading(false);
    }
  }

  //kpi data effect
  useEffect(() => {
    if (!search && !fromDate && !toDate) {
      getKPIdata({ search, fromDate, toDate });
    }

    if (fromDate || toDate) {
      if (fromDate && toDate && from < to) {
        getKPIdata({ search, fromDate, toDate });
      }
    }

    if (search) {
      getKPIdata({ search, fromDate, toDate });
    }
  }, [search, fromDate, toDate]);

  //main effect
  useEffect(() => {
    let timer;
    if (!search && !fromDate && !toDate) {
      getProducts({ search, fromDate, toDate, sorted, sortOrder, limit, skip });
    }
    if (search !== previousSearch.current) {
      timer = setTimeout(() => {
        getProducts({
          search,
          fromDate,
          toDate,
          sorted,
          sortOrder,
          limit,
          skip: 0,
        });
        setSkip(0);
      }, 500);
    }

    if (
      fromDate !== previousFromDate.current ||
      toDate !== previousToDate.current
    ) {
      if (fromDate && toDate && from < to) {
        getProducts({
          search,
          fromDate,
          toDate,
          sorted,
          sortOrder,
          limit,
          skip: 0,
        });
        setSkip(0);
      }
    }

    if (
      sorted !== previousSorted.current ||
      sortOrder !== previousSortOrder.current
    ) {
      getProducts({
        search,
        fromDate,
        toDate,
        sorted,
        sortOrder,
        limit,
        skip: 0,
      });
      setSkip(0);
    }
    previousSearch.current = search;
    previousFromDate.current = fromDate;
    previousToDate.current = toDate;
    previousSorted.current = sorted;
    previousSortOrder.current = sortOrder;
    return () => {
      clearTimeout(timer);
    };
  }, [search, fromDate, toDate, limit, sorted, sortOrder, skip]);

  return (
    <div className="app">
      <ProductContext.Provider
        value={{
          data,
          setData,
          loading,
          setLoading,
          setSkip,
          skip,
          setSearch,
          setFromDate,
          setToDate,
          fromDate,
          toDate,
          search,
          kpiData,
          kpiLoading,

          isSkipZero,
          setCurrentProduct,
          currentProduct,
          setSorted,
          setSortOrder,
          sortOrder,
          setLimit,
          limit,
          error,
          detailsRef,
        }}
      >
        {productId ? <ProductDetailsPage /> : <Dashboard />}
      </ProductContext.Provider>
    </div>
  );
}

export default App;
