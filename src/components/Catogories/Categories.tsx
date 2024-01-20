import React from 'react';
import Sort from '../Sort/Sort';
import categoriesStyles from './Categories.module.scss';
import categoriesArr from '../../data/categoriesArr';
import { useDispatch, useSelector } from 'react-redux';
import {
    setSearchState,
    setValueOfSearchInput,
} from '../../redux/slices/search.slice';
import {
    getActiveCategorySelector,
    setCategoryId,
    setPageSelected,
} from '../../redux/slices/filter.slice';

const Categories: React.FC = () => {
    const dispatch = useDispatch();
    const activeCategory: number = useSelector(getActiveCategorySelector);

    const changeCategory = (index: number) => {
        dispatch(setCategoryId(index));
        dispatch(setSearchState(''));
        dispatch(setPageSelected(1));
        dispatch(setValueOfSearchInput(''));
    };

    const categoriesArrMap = categoriesArr.map(
        (item: string, index: number) => (
            <li
                key={index}
                onClick={() => changeCategory(index)}
                className={
                    activeCategory === index ? categoriesStyles.active : ''
                }
            >
                {item}
            </li>
        )
    );

    return (
        <section>
            <div className={categoriesStyles.container}>
                <div className={categoriesStyles.chooseInner}>
                    <ul className={categoriesStyles.chooseButtons}>
                        {categoriesArrMap}
                    </ul>
                    <Sort />
                </div>
            </div>
        </section>
    );
};

export default Categories;
