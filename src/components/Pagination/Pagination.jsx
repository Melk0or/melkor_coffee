import React, { useContext, useState } from "react";
import paginationStyles from "./Pagination.module.scss";
import { set } from "lodash.debounce";
import MyContext from "../../context";

const Pagination = () => {
  const { pageSelected, setPageSelected, pageCount } = useContext(MyContext);
  const goBackPage = () => {
    if (pageSelected > 1) setPageSelected((prevState) => prevState - 1);
  };
  const goForwardPage = () => {
    if (pageSelected < pageCount) setPageSelected((prevState) => prevState + 1);
  };
  //console.log(pageSelected);

  const renderPaginationPage = (count) => {
    return new Array(count).fill(1).map(
      (item, index) =>
        (item = (
          <li
            className={
              pageSelected === index + 1 ? paginationStyles.selected : undefined
            }
            onClick={() => setPageSelected((prevState) => index + 1)}
          >
            {index + 1}
          </li>
        ))
    );
  };

  return (
    <div className={paginationStyles.root}>
      <ul className={paginationStyles.list}>
        <li onClick={goBackPage}>&#9754;</li>
        {renderPaginationPage(pageCount)}
        <li onClick={goForwardPage}>&#9755;</li>
      </ul>
    </div>
  );
};

export default Pagination;
