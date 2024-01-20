import cardStyles from './Card.module.scss';
import React, { useContext, useState } from 'react';
import MyContext from '../../context';
import Skeleton from '../Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { addItems, getCartSelector } from '../../redux/slices/cart.slice';
import { Link } from 'react-router-dom';
import { CartCardsProps } from '../CartCards/CartCards';
import { ContextProperties } from '../../App';

// const sugar = ["с сахаром", "без сахара"];
// const ml = ["200мл", "300мл", "400мл"]

interface CartCardObj extends CartCardsProps {
    rating: number;
}
export interface CardProps {
    title: string;
    url: string;
    price: number;
    isSugary: boolean;
    size: number;
    rating: number;
    amount: number;
    id: string | number;
}

const Card: React.FC<CardProps> = ({
    title,
    url,
    price,
    isSugary,
    size,
    rating,
    amount,
    id,
}) => {
    //Контекст
    const { isLoading }: ContextProperties = useContext(
        MyContext
    ) as ContextProperties;
    //стейт карточек корзины с глобального хранилища
    const { items } = useSelector(getCartSelector);
    console.log(items, 'КАРТСЕЛЕКТОР');
    const dispatch = useDispatch();

    //Стейты
    const [activeTypeOfSugar, setActiveTypeOfSugar] = useState(
        isSugary || false
    );
    const [activeTypeOfMl, setActiveTypeOfMl] = useState<number>(size || 2);

    const onAddToCart = () => {
        const obj: CartCardObj = {
            title,
            url,
            price,
            activeTypeOfSugar,
            activeTypeOfMl,
            rating,
            amount,
            id,
        };
        dispatch(addItems(obj));
        // setAmountView(
        //   (prevState) => items.find((item) => item.id === obj.id)?.amount + 1 ?? 1
        // );
    };

    const onClickToFirstBar = (index: boolean) => {
        setActiveTypeOfSugar((prevState) => index);
        // mainItems.find((item) => item.id === id).isSugary = index;
        // console.log(mainItems);
    };
    const onClickToSecondBar = (index: number) => {
        setActiveTypeOfMl((prevState) => index);
        // console.log(mainItems.find((item) => item.id === id));
        // mainItems.find((item) => item.id === id).size = index;
        // console.log(mainItems);
    };

    return (
        <div className={cardStyles.card}>
            {isLoading ? (
                <Skeleton />
            ) : (
                <>
                    <Link to={'coffee/' + id}>
                        <img src={url} alt={`coffee${id}`} />{' '}
                    </Link>
                    <h2>{title}</h2>
                    <div className={cardStyles.cardOption}>
                        <div>
                            <span onClick={() => onClickToFirstBar(true)}>
                                c сахаром
                            </span>
                            <span onClick={() => onClickToFirstBar(false)}>
                                без сахара
                            </span>
                            <div
                                style={
                                    activeTypeOfSugar
                                        ? { left: '0' }
                                        : { left: '50%' }
                                }
                            ></div>
                        </div>
                        <div>
                            <span onClick={() => onClickToSecondBar(0)}>
                                200 мл.
                            </span>
                            <span onClick={() => onClickToSecondBar(1)}>
                                300 мл.
                            </span>
                            <span onClick={() => onClickToSecondBar(2)}>
                                400 мл.
                            </span>
                            <div
                                style={
                                    activeTypeOfMl === 0
                                        ? { left: '0' }
                                        : activeTypeOfMl === 1
                                        ? { left: 'calc(100%/3)' }
                                        : { left: 'calc(100%/3*2)' }
                                }
                            ></div>
                        </div>
                    </div>
                    <div className={cardStyles.cardPrice}>
                        <span>от {price} ₽</span>
                        <div
                            onClick={onAddToCart}
                            className={cardStyles.cardAddButton}
                        >
                            <img src="./images/plus.svg" alt="cart-icon" />
                            <span>Добавить</span>
                            <span>
                                {items.find((item) => item.id === id)?.amount ||
                                    0}
                            </span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Card;
