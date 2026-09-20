import { useContext, useEffect, useState } from "react";
import "./Pagination.css";
import { ProductContext } from "../../App";
import ArrowRight from "../Icons/ArrowRight";
import ArrowLeft from "../Icons/ArrowLeft";

function Pagination() {
  const { data, setSkip, loading, skip, setLimit, limit } =
    useContext(ProductContext);

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);

  function resetPagesToStart() {
    setStart(0);
    setEnd(pagesPerBlock);
  }

  function movePagesToNextBlock() {
    setStart(pagesPerBlock);
    setEnd(lastpage);
  }
  useEffect(() => {
    if (loading) {
      return;
    }

    if (skip === 0) {
      resetPagesToStart();
    }
    if (lastpage > pagesPerBlock && skip === (lastpage - 1) * productsPerPage) {
      movePagesToNextBlock();
    }

    if (skip > productsPerPage * pagesPerBlock) {
      movePagesToNextBlock();
    }
  }, [skip]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const total = data.total;

  const productsPerPage = limit;

  const pagesPerBlock = 10;

  const totalPages = Math.ceil(total / productsPerPage);

  const pages = Array.from({ length: totalPages }, (value, index) => index + 1);

  const visiblePages = pages.slice(start, end);

  const lastpage = pages[pages.length - 1];

  const firstpage = pages[0];

  const isLastPage = visiblePages.find((page) => page === lastpage);
  const isFirstPage = visiblePages.find((page) => page === firstpage);

  return (
    <div className="pagination">
      <div className="pages">
        <button
          className="prev-btn"
          onClick={() => {
            if (skip === 0) return;
            setSkip((prev) => prev - productsPerPage);
            if (skip <= pagesPerBlock * productsPerPage) {
              resetPagesToStart();
            }
          }}
        >
          <ArrowLeft />
        </button>
        {isLastPage && !isFirstPage ? (
          <div
            onClick={() => {
              setSkip((firstpage - 1) * productsPerPage);
            }}
            className={`page-button ${skip === (firstpage - 1) * productsPerPage ? "marked" : ""}`}
          >
            {firstpage}
          </div>
        ) : null}
        {isLastPage && !isFirstPage && <span className="separator">...</span>}
        {visiblePages.map((page) => {
          return (
            <div
              onClick={() => {
                setSkip((page - 1) * productsPerPage);
              }}
              className={`page-button ${skip === (page - 1) * productsPerPage ? "marked" : ""}`}
              key={page}
            >
              {page}
            </div>
          );
        })}
        {!isLastPage && lastpage > 10 && <span className="separator">...</span>}
        {!isLastPage && lastpage > 10 && (
          <div
            onClick={() => {
              setSkip((lastpage - 1) * productsPerPage);
            }}
            className={`page-button ${skip === (lastpage - 1) * productsPerPage ? "marked" : ""}`}
          >
            {lastpage}
          </div>
        )}
        <button
          className="next-btn"
          onClick={() => {
            if (skip === (lastpage - 1) * productsPerPage) {
              return;
            }
            setSkip((prev) => prev + productsPerPage);
            if (skip === (pagesPerBlock - 1) * productsPerPage) {
              setStart((prev) => prev + productsPerPage);
              setEnd((prev) => prev + productsPerPage);
            }
          }}
        >
          <ArrowRight />
        </button>
      </div>

      <div className="limit">
        <p>set limit</p>
        <button
          className={`limit-btn ${limit === 10 ? "marked" : ""}`}
          onClick={() => {
            setLimit(10);
            setSkip(0);
          }}
        >
          10
        </button>
        <button
          className={`limit-btn ${limit === 20 ? "marked" : ""}`}
          onClick={() => {
            setLimit(20);
            setSkip(0);
          }}
        >
          20
        </button>
        <button
          className={`limit-btn ${limit === 30 ? "marked" : ""}`}
          onClick={() => {
            setLimit(30);
            setSkip(0);
          }}
        >
          30
        </button>
        products per page
      </div>
    </div>
  );
}

export default Pagination;
