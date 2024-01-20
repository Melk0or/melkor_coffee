import React, { useState } from 'react';
import sortStyles from './Sort.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
    getSortCategorySelector,
    setSortCategory,
} from '../../redux/slices/filter.slice';

export interface SortCategory {
    name: string;
    sortProperty: string;
    sortDirection: string;
}

//категории сортировки
export const listOfCategoriesSort: SortCategory[] = [
    {
        name: 'популярности (по возрастанию)',
        sortProperty: 'rating',
        sortDirection: 'asc',
    },
    {
        name: 'популярности (по убыванию)',
        sortProperty: 'rating',
        sortDirection: 'desc',
    },
    {
        name: 'ценe (по возрастанию)',
        sortProperty: 'price',
        sortDirection: 'asc',
    },
    {
        name: 'ценe (по убыванию)',
        sortProperty: 'price',
        sortDirection: 'desc',
    },
    {
        name: 'алфавиту (по возрастанию)',
        sortProperty: 'title',
        sortDirection: 'asc',
    },
    {
        name: 'алфавиту (по убыванию)',
        sortProperty: 'title',
        sortDirection: 'desc',
    },
];

const Sort: React.FC = () => {
    //достаем активную категорию сортировки из глобального стейта
    const sortCategory: SortCategory = useSelector(getSortCategorySelector);
    //диспач
    const dispatch = useDispatch();

    // стейт для отображения выпадающего меню
    const [isOpenDropdown, setIsOpenDropDown] = useState<boolean>(false);

    // const { setSortCategory, sortCategory } = useContext(MyContext);

    const onClickListItem = (item: SortCategory) => {
        dispatch(setSortCategory(item));
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
                            ? { transform: 'rotate(-180deg)' }
                            : { transform: 'rotate(0)' }
                    }
                />
                <span>Сортировка по: </span>
                <span
                    onClick={() => setIsOpenDropDown((prevState) => !prevState)}
                >
                    {sortCategory.name}
                </span>
            </div>
            <div
                className={sortStyles.dropdown}
                style={
                    isOpenDropdown
                        ? { transform: 'scaleY(1)', opacity: '1' }
                        : { transform: 'scaleY(0)', opacity: '0' }
                }
            >
                {listOfCategoriesSort.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => onClickListItem(item)}
                        className={
                            sortCategory?.name === item.name
                                ? sortStyles.activeCategory
                                : null
                        }
                    >
                        {item.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sort;
