import React, { useContext, useState } from "react";
import Sort from "../Sort/Sort";
import categoriesStyles from "./Categories.module.scss";
import categoriesArr from "../../data/categoriesArr";
import MyContext from "../../context";

export default function Categories({ onClickCategory }) {
  const { setActiveCategory, activeCategory } = useContext(MyContext);
  const categoriesArrMap = categoriesArr.map((item, index) => (
    <li
      key={index}
      onClick={() => setActiveCategory((prevState) => index)}
      className={activeCategory === index ? categoriesStyles.active : ""}
    >
      {item}
    </li>
  ));

  return (
    <section className={categoriesStyles.choose}>
      <div className={categoriesStyles.container}>
        <div className={categoriesStyles.chooseInner}>
          <ul className={categoriesStyles.chooseButtons}>{categoriesArrMap}</ul>
          <Sort />
        </div>
      </div>
    </section>
  );
}
