import { listOfCategoriesSort, SortCategory } from './components/Sort/Sort';
import { getSearchSelector } from './redux/slices/search.slice';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { fetchingCoffee } from './redux/slices/coffee.slice';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NotFound from './components/NotFound/NotFound';
import MainLayout from './layouts/MainLayout';
import CoffeePage from './pages/CoffeePage';
import {
    getFilterSelector,
    setFilterParams,
} from './redux/slices/filter.slice';
import MyContext from './context';
import Home from './pages/Home';
import Cart from './pages/Cart';
import qs from 'qs';

interface FilterSelector {
    activeCategory: number;
    pageSelected: number;
    sortCategory: SortCategory;
}

export interface ContextProperties {
    isLoading: boolean;
    pageCount: number;
}

const App: React.FC = () => {
    //ГЛОБАЛ СТЕЙТ
    //достаем стейт активной категории
    //достаем стейт выделеннной страницы пагинации
    //достаем стейт активной категории сортировки
    const { activeCategory, pageSelected, sortCategory }: FilterSelector =
        useSelector(getFilterSelector);
    //достаем стейт поиска
    const searchValue: string = useSelector(getSearchSelector);

    const dispatch = useDispatch();

    //ЛОКАЛЬНЫЙ СТЕЙТ
    //стейт для отображения скелетона загрузки
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [pageCount, setPageCount] = useState<number>(4);

    const isSearching = useRef(false);
    const isMounted = useRef(false);
    const navigateLocation = useNavigate();

    const fetchCoffee = async () => {
        changeCountOfPages();
        try {
            setIsLoading((prevState) => true);
            await dispatch(
                fetchingCoffee({
                    pageCount,
                    pageSelected,
                    activeCategory,
                    sortCategory,
                    searchValue,
                })
            );
            setIsLoading((prevState) => false);
        } catch (error) {
            setIsLoading((prevState) => true);
            console.log(error);
        }
    };

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const findSortCategory: SortCategory | undefined =
                listOfCategoriesSort.find(
                    (item: SortCategory) =>
                        item.sortProperty === params.sortProperty
                );
            delete params.sortProperty;
            const obj = {
                ...params,
                sortCategory,
                findSortCategory,
            };
            console.log(obj, 'gilter');
            // console.log(obj);
            dispatch(setFilterParams(obj));

            isSearching.current = true;
        }
    }, []);

    useEffect(() => {
        setIsLoading((prevState) => true);
        if (!isSearching.current) {
            fetchCoffee();
        }

        isSearching.current = false;
        // return () => {
        //   setPageSelected((prevState) => 1);
        // };
    }, [activeCategory, sortCategory, pageSelected, searchValue]);

    useEffect(() => {
        if (isMounted.current) {
            const paramString = qs.stringify({
                sortProperty: sortCategory.sortProperty,
                activeCategory,
                pageSelected,
            });

            navigateLocation(`?${paramString}`);
        }
        isMounted.current = true;
    }, [activeCategory, sortCategory, pageSelected, searchValue]);

    //В силу своей неопытности свой бекенд сервер написать не могу, поэтому тут костыли, НЕ СМОТРЕТЬ!!!
    function changeCountOfPages() {
        if (activeCategory === 0) setPageCount((prevState) => 4);
        else setPageCount((prevState) => 1);
    }

    return (
        <div className="root">
            <MyContext.Provider
                value={{
                    isLoading,
                    pageCount,
                }}
            >
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/coffee/:id" element={<CoffeePage />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </MyContext.Provider>
        </div>
    );
};

export default App;
