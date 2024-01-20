import React, { useContext } from 'react';
import MyContext from '../context';
import { useSelector } from 'react-redux';
import Card, { CardProps } from '../components/Card/Card';
import Categories from '../components/Catogories/Categories';
import Pagination from '../components/Pagination/Pagination';
import { ContextProperties } from '../App';
import { getMainItemsSelector } from '../redux/slices/coffee.slice';
import { getSearchSelector } from '../redux/slices/search.slice';

interface MainItem extends CardProps {}

const Home: React.FC = () => {
    const mainItems = useSelector(getMainItemsSelector);
    //стейт поиска из глобального стейта
    const searchValue = useSelector(getSearchSelector);
    const { pageCount, isLoading }: ContextProperties = useContext(
        MyContext
    ) as ContextProperties;

    //рендеринг списка основных карточек
    const arrCardsMainPage = (
        isLoading ? new Array(3).fill(undefined) : mainItems
    ).map((item: MainItem, index) => <Card key={index} {...item} />);

    console.log(arrCardsMainPage, 'arrCardsMainPage');

    return (
        <>
            <Categories />
            <main className="main">
                <div className="container">
                    <div className="mainInner">
                        <h1>
                            {searchValue
                                ? `Поиск по: "${searchValue}"`
                                : 'Все меню'}
                        </h1>
                        <div className="cards">{arrCardsMainPage}</div>
                        {pageCount > 1 && <Pagination />}
                    </div>
                </div>
            </main>
        </>
    );
};

export default Home;
