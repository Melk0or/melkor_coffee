import React from 'react';
import headerStyles from './Header.module.scss';
import Search from '../Search/Search';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCartSelector } from '../../redux/slices/cart.slice';

interface itemPreview {
    title: string;
    url: string;
    price: number;
    amount: number;
}

interface CartPreview {
    items: itemPreview[];
    totalPrice: number;
}

const Header: React.FC = () => {
    const { items, totalPrice }: CartPreview = useSelector(getCartSelector);
    const totalCount: number = items.reduce(
        (sum: number, item) => item?.amount + sum,
        0
    );
    return (
        <header className={headerStyles.header}>
            <div className={headerStyles.container}>
                <div className={headerStyles.headerInner}>
                    <Link to="/">
                        <div className={headerStyles.headerLeft}>
                            <img
                                src="/images/devil-svgrepo-com.svg"
                                width={40}
                                alt="devil-img"
                            />
                            <div>
                                <h1>Melkor coffee</h1>
                                <p>Самый вкусный кофе во всeленной</p>
                            </div>
                        </div>
                    </Link>
                    {window.location.pathname === '/' && <Search />}
                    {window.location.pathname !== '/cart' && (
                        <Link to="/cart">
                            <div className={headerStyles.headerRight}>
                                <span>{totalPrice} ₽</span>
                                <img
                                    src="/images/shopping-cart.svg"
                                    alt="cart-icon"
                                />
                                <span>{totalCount}</span>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
