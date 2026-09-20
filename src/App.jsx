import { createContext, useEffect, useRef, useState } from "react";

import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";

export const ProductContext = createContext();

function App() {
  const params = new URLSearchParams(window.location.search);

  const isSearch = params.has("search");
  const isDateFrom = params.has("from");
  const isDateTo = params.has("to");
  const isSorted = params.has("sorted");

  const isPage = params.has("page");
  const isSortOrder = params.has("sortOrder");

  const InitializingPage = Number(params.get("page"));

  const [limit, setLimit] = useState(10);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [skip, setSkip] = useState(isPage ? (InitializingPage - 1) * limit : 0);

  const [search, setSearch] = useState(isSearch ? params.get("search") : "");

  const [isInitialized, setIsInitialized] = useState(false);

  const [isSkipZero, setIsSkipZero] = useState(false);
  const [fromDate, setFromDate] = useState(
    isDateFrom ? params.get("from") : "",
  );
  const [toDate, setToDate] = useState(isDateTo ? params.get("to") : "");

  const [kpiData, setKpiData] = useState(null);
  const detailsRef = useRef(null);
  const [kpiLoading, setKpiLoading] = useState(true);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [sorted, setSorted] = useState(isSorted ? params.get("sorted") : "");
  const [sortOrder, setSortOrder] = useState(
    isSortOrder ? params.get("sortOrder") : "desc",
  );

  const time = "T00:00:00Z";
  const from = new Date(fromDate);
  const to = new Date(toDate);

  let url = "https://dummyjson.com/products";
  let urlForKpi = "";

  if (search) {
    url += `/search?q=${search}`;
  }
  if (fromDate) {
    url += `${url.includes("?") ? "&" : "?"}modifiedAfter=${fromDate + time}`;
  }

  if (toDate) {
    url += `${url.includes("?") ? "&" : "?"}modifiedBefore=${toDate + time}`;
  }

  if (sorted) {
    url += `${url.includes("?") ? "&" : "?"}sortBy=${sorted}
&order=${sortOrder}`;
  }

  urlForKpi = url;

  urlForKpi += `${urlForKpi.includes("?") ? "&" : "?"}limit=194`;

  url += `${url.includes("?") ? "&" : "?"}limit=${limit}&skip=${skip}`;

  async function getProducts() {
    try {
      console.log("GET PRODUCTS - loading starts");
      const response = await fetch(url);

      const data = await response.json();

      setData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function getKPIdata() {
    setKpiLoading(true);
    try {
      const response = await fetch(urlForKpi);
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
      getKPIdata();
    }
    if (fromDate || toDate || search) {
      if ((fromDate && toDate && from < to) || search) {
        getKPIdata();
      }
    }
  }, [search, fromDate, toDate]);

  //search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isInitialized) {
        if (skip === 0) {
          setIsSkipZero(!isSkipZero);
        }

        setSkip(0);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  //skip effect
  useEffect(() => {
    getProducts();
  }, [skip, isSkipZero, limit]);

  //date effect
  useEffect(() => {
    if (fromDate && toDate) {
      if (from < to) {
        if (skip === 0) {
          setIsSkipZero(!isSkipZero);
        }

        setSkip(0);
      }
    }

    if (!fromDate || !toDate) {
      if (isInitialized) {
        if (skip === 0) {
          setIsSkipZero(!isSkipZero);
        }

        setSkip(0);
      }
    }
  }, [fromDate, toDate]);

  //sorted effect

  useEffect(() => {
    if (isInitialized) {
      if (skip === 0) {
        setIsSkipZero(!isSkipZero);
      } else {
        setSkip(0);
      }
    }
  }, [sorted, sortOrder]);

  //url effect
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("search", search);

    const page = skip / limit + 1;

    if (fromDate) {
      params.set("from", fromDate);
    }

    if (toDate) {
      params.set("to", toDate);
    }

    params.set("page", page);
    params.set("sorted", sorted);
    params.set("sortOrder", sortOrder);

    const parametars = params.toString();
    window.history.pushState(null, "", `/products?${parametars}`);
  }, [search, fromDate, toDate, skip, limit, sorted, sortOrder]);

  //scroll effect
  useEffect(() => {
    if (currentProduct) {
      detailsRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [currentProduct]);

  //initializing effect
  useEffect(() => {
    setIsInitialized(true);
  }, []);

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
        <Dashboard />
      </ProductContext.Provider>
    </div>
  );
}

export default App;
