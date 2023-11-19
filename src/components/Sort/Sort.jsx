import React, { useContext, useState } from "react";
import sortStyles from "./Sort.module.scss";
import MyContext from "../../context";

export default function Sort() {
  const listOfCategoriesSort = [
    {
      name: "популярности (по возрастанию)",
      sortProperty: "rating",
      sortDirection: "asc",
    },
    {
      name: "популярности (по убыванию)",
      sortProperty: "rating",
      sortDirection: "desc",
    },
    {
      name: "ценe (по возрастанию)",
      sortProperty: "price",
      sortDirection: "asc",
    },
    {
      name: "ценe (по убыванию)",
      sortProperty: "price",
      sortDirection: "desc",
    },
    {
      name: "алфавиту (по возрастанию)",
      sortProperty: "title",
      sortDirection: "asc",
    },
    {
      name: "алфавиту (по убыванию)",
      sortProperty: "title",
      sortDirection: "desc",
    },
  ];
  const [isOpenDropdown, setIsOpenDropDown] = useState(false);

  const { setSortCategory, sortCategory } = useContext(MyContext);

  const onClickListItem = (item) => {
    setSortCategory((prevState) => item);
    setIsOpenDropDown((prevState) => false);
  };

  return (
    <div className={sortStyles.sort}>
      <div className={sortStyles.sortInner}>
        <img
          src="/images/app-down.svg"
          alt="dropdown-icon"
          style={
            isOpenDropdown
              ? { transform: "rotate(-180deg)" }
              : { transform: "rotate(0)" }
          }
        />
        <span>Сортировка по: </span>
        <span onClick={() => setIsOpenDropDown((prevState) => !prevState)}>
          {sortCategory.name}
        </span>
      </div>
      <div
        className={sortStyles.dropdown}
        style={
          isOpenDropdown
            ? { transform: "scaleY(1)", opacity: "1" }
            : { transform: "scaleY(0)", opacity: "0" }
        }
      >
        {listOfCategoriesSort.map((item, index) => (
          <div
            key={index}
            onClick={() => onClickListItem(item)}
            style={
              sortCategory.name === item.name
                ? {
                    color: "#1ec51a",
                    fontWeight: 700,
                    backgroundColor: "rgba(79, 254, 30, 0.1)",
                  }
                : null
            }
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
