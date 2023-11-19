import cardStyles from "./Card.module.scss";
import { useContext, useState } from "react";
import MyContext from "../../context";
import Skeleton from "../Skeleton";

// const sugar = ["с сахаром", "без сахара"];
// const ml = ["200мл", "300мл", "400мл"]

export default function Card({
  title,
  url,
  price,
  isSugary,
  size,
  rating,
  amount,
  id,
  onAdd,
}) {
  //Контекст
  const { mainItems, setMainItems, isLoading } = useContext(MyContext);

  //Стейты
  const [activeTypeOfSugar, setActiveTypeOfSugar] = useState(isSugary);
  const [activeTypeOfMl, setActiveTypeOfMl] = useState(size);
  //количество добавленной в корзину единицы товара
  const [amountView, setAmountView] = useState(isLoading ? 0 : amount);

  const onAddToCart = () => {
    const obj = { title, url, price, isSugary, size, rating, amount, id };
    const returnAmount = onAdd(obj);
    console.log(amountView);
    setAmountView((prevState) => returnAmount);
  };

  const onClickToFirstBar = (index) => {
    setActiveTypeOfSugar((prevState) => index);
    mainItems.find((item) => item.id === id).isSugary = index;
    console.log(mainItems);
    setMainItems((prevState) => [...prevState]);
  };
  const onClickToSecondBar = (index) => {
    setActiveTypeOfMl((prevState) => index);
    mainItems.find((item) => item.id === id).size = index;
    console.log(mainItems);
    setMainItems((prevState) => [...prevState]);
  };

  return (
    <div className={cardStyles.card}>
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <img src={url} alt={`coffee${id}`} />
          <h2>{title}</h2>
          <div className={cardStyles.cardOption}>
            <div>
              <span onClick={() => onClickToFirstBar(true)}>c сахаром</span>
              <span onClick={() => onClickToFirstBar(false)}>без сахара</span>
              <div
                style={activeTypeOfSugar ? { left: "0" } : { left: "50%" }}
              ></div>
            </div>
            <div>
              <span onClick={() => onClickToSecondBar(0)}>200 мл.</span>
              <span onClick={() => onClickToSecondBar(1)}>300 мл.</span>
              <span onClick={() => onClickToSecondBar(2)}>400 мл.</span>
              <div
                style={
                  activeTypeOfMl === 0
                    ? { left: "0" }
                    : activeTypeOfMl === 1
                    ? { left: "calc(100%/3)" }
                    : { left: "calc(100%/3*2)" }
                }
              ></div>
            </div>
          </div>
          <div className={cardStyles.cardPrice}>
            <span>от {price} ₽</span>
            <div onClick={onAddToCart} className={cardStyles.cardAddButton}>
              <img src="./images/plus.svg" alt="cart-icon" />
              <span>Добавить</span>
              <span>{amountView}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
