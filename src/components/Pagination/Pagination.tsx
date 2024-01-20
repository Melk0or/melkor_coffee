import React, { useContext } from 'react';
import paginationStyles from './Pagination.module.scss';
import MyContext from '../../context';
import { useDispatch, useSelector } from 'react-redux';
import {
    getPageSelectedSelector,
    setPageSelected,
} from '../../redux/slices/filter.slice';
import { ContextProperties } from '../../App';

const Pagination = () => {
    const dispatch = useDispatch();
    const { pageCount }: ContextProperties = useContext(
        MyContext
    ) as ContextProperties;
    const pageSelected: number = useSelector(getPageSelectedSelector);

    const goBackPage = () => {
        if (pageSelected > 1) dispatch(setPageSelected(pageSelected - 1));
    };
    const goForwardPage = () => {
        if (pageSelected < pageCount)
            dispatch(setPageSelected(pageSelected + 1));
    };

    const renderPaginationPage = (count: number) => {
        return new Array(count).fill(1).map((item: number, index) => (
            <li
                key={index}
                className={
                    pageSelected === index + 1
                        ? paginationStyles.selected
                        : undefined
                }
                onClick={() => dispatch(setPageSelected(index + 1))}
            >
                {index + 1}
            </li>
        ));
    };

    return (
        <div className={paginationStyles.root}>
            <ul>
                <li onClick={goBackPage}>&#9754;</li>
                {renderPaginationPage(pageCount)}
                <li onClick={goForwardPage}>&#9755;</li>
            </ul>
        </div>
    );
};

export default Pagination;
