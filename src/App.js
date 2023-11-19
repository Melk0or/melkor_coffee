import Card from "./components/Card/Card";
import mainItem from "./data/cards.json";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import CartCards from "./components/CartCards/CartCards";
import MyContext from "./context";

const App = () => {
  //стейт для основных карточек
  const [mainItems, setMainItems] = useState([]);
  //стейт для карточек с корзины
  const [cartItems, setCartItems] = useState([]);
  //стейт для отображения скелетона загрузки
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(0);
  const [sortCategory, setSortCategory] = useState({
    name: "популярности (по возрастанию)",
    sortProperty: "rating",
    sortDirection: "abs",
  });
  const [searchValue, setSearchValue] = useState("");
  const [pageSelected, setPageSelected] = useState(1);
  const [pageCount, setPageCount] = useState(4);

  useEffect(() => {
    setIsLoading((prevState) => true);
    changeCountOfPages();
    fetch(
      `https://655352b85449cfda0f2e8000.mockapi.io/mainItems?${
        pageCount > 1 ? `page=${pageSelected}&` : "p=1&"
      }limit=3${
        activeCategory > 0 ? `&categories=${activeCategory}` : ""
      }&sortBy=${sortCategory.sortProperty}&order=${sortCategory.sortDirection}`
    )
      .then((res) => {
        return res.json();
      })
      .then((resArr) => {
        setMainItems((prevState) => resArr);
        setIsLoading((prevState) => false);
      })
      .catch((err) => console.log(err));

    // console.log(mainItems.map((item) => console.log(item.id)));

    // return () => {
    //   setPageSelected((prevState) => 1);
    // };
  }, [activeCategory, sortCategory, pageSelected]);

  //ф-ция для апдейта стейта корзины и возвращения количества единицы товара в корзине на данный момент
  const addToCartAndReturnObjAmount = (obj) => {
    if (cartItems.some((item) => item.id === obj.id)) {
      const findItem = cartItems.find((item) => item.id === obj.id);
      findItem.amount++;
      setCartItems((prevState) => [...prevState]);
      return findItem.amount;
    } else {
      obj.amount++;
      setCartItems((prevState) => [...prevState, obj]);
      return obj.amount;
    }
  };
  //запрос для добавленя элемента в корзину
  const sendPostRequestToBackend = (obj) => {
    //Запрос  на бек будет в первуб очередь
  };
  //основная функция при клике на плюсик
  const onAddToCart = (obj) => {
    sendPostRequestToBackend(obj);
    return addToCartAndReturnObjAmount(obj);
  };

  //рендеринг списка основных карточек
  const arrCardsMainPage = (
    isLoading
      ? new Array(6).fill(undefined)
      : mainItems.filter((item) =>
          item.title.toLowerCase().includes(searchValue.toLowerCase())
        )
  ).map((item, index) => (
    <Card key={index} onAdd={() => onAddToCart(item)} {...item} />
  ));
  //рендеринг списка карточек корзины
  const arrCardsCartPage = cartItems.map((item, index) => (
    <CartCards key={index} onAdd={() => onAddToCart(item)} {...item} />
  ));
  //В силу своей неопытности, свой бекенд сервер написать не могу, поэтому тут костыли, НЕ СМОТРЕТЬ!!!
  function changeCountOfPages() {
    if (activeCategory === 0) setPageCount((prevState) => 4);
    else setPageCount((prevState) => 1);
  }

  return (
    <div className="root">
      <MyContext.Provider
        value={{
          arrCardsCartPage,
          arrCardsMainPage,
          cartItems,
          mainItems,
          setCartItems,
          setMainItems,
          setActiveCategory,
          activeCategory,
          setSortCategory,
          sortCategory,
          isLoading,
          searchValue,
          setSearchValue,
          pageSelected,
          setPageSelected,
          pageCount,
        }}
      >
        <Routes>
          <Route path="/" element={<Home arrCard={arrCardsMainPage} />} />
          <Route
            path="/cart"
            element={<Cart arrCartCard={arrCardsCartPage} />}
          />
        </Routes>
      </MyContext.Provider>
    </div>
  );
};

export default App;
