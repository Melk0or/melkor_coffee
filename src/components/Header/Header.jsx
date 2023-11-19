import React from "react";
import headerStyles from "./Header.module.scss";
import { Link, Route, Routes } from "react-router-dom";
import Search from "../Search/Search";

export default function Header({ isShowSearchInput }) {
  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.container}>
        <div className={headerStyles.headerInner}>
          <Link to="/">
            <div className={headerStyles.headerLeft}>
              <img
                src="./images/devil-svgrepo-com.svg"
                width={40}
                alt="devil-img"
              />
              <div>
                <h1>Melkor coffee</h1>
                <p>Самый вкусный кофе во вслеенной</p>
              </div>
            </div>
          </Link>
          {isShowSearchInput && <Search />}
          <Link to="/cart">
            <div className={headerStyles.headerRight}>
              <span>520 ₽</span>
              <img src="./images/shopping-cart.svg" alt="cart-icon" />
              <span>3</span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
