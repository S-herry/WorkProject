import React from "react";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronRight,
  faCircleChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
const ReactPaginates = ({ total_page, current_page, onPageChange }) => {
  return (
    <ReactPaginate
      className="d-flex justify-content-center  align-items-center p-0"
      breakLabel="..."
      nextLabel={
        <h5 className="p-2 m-0">
          <FontAwesomeIcon
            icon={faCircleChevronRight}
            style={{ color: "#3c5e6e" }}
          />
        </h5>
      }
      onPageChange={onPageChange}
      pageRangeDisplayed={2}
      pageCount={total_page}
      activeClassName="active-page"
      pageClassName="custom-page"
      previousLabel={
        <h5 className="p-2 m-0">
          <FontAwesomeIcon
            icon={faCircleChevronLeft}
            style={{ color: "#3c5e6e" }}
          />
        </h5>
      }
      renderOnZeroPageCount={() => {
        return (
          <div className="d-flex justify-content-center align-items-center p-3 m-3">
            <h3>查無資料</h3>
          </div>
        );
      }}
      forcePage={current_page}
    />
  );
};

export default ReactPaginates;
