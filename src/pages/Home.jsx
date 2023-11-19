import React, { useContext, useState } from "react";
import Header from "../components/Header/Header";
import Categories from "../components/Catogories/Categories";
import MyContext from "../context";
import Pagination from "../components/Pagination/Pagination";

export default function Home({ arrCard }) {
  const { searchValue, pageCount } = useContext(MyContext);
  return (
    <div className="wrapper">
      <Header isShowSearchInput={true} />
      <Categories />
      <main className="main">
        <div className="container">
          <div className="mainInner">
            <h1>{searchValue ? `Поиск по: "${searchValue}"` : "Все меню"}</h1>
            <div className="cards">{arrCard}</div>
            {pageCount > 1 && <Pagination />}
          </div>
        </div>
      </main>
    </div>
  );
}
