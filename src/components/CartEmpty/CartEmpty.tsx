import React, { FC } from 'react'
import { Link } from 'react-router-dom'

const CartEmpty: FC = () => {
    return (
        <div className="cart--empty">
            <h2>
                Корзина пустая <span>😕</span>
            </h2>
            <p>
                Вероятней всего, вы не заказывали ещё пиццу.
                <br />
                Для того, чтобы заказать пиццу, перейдите на главную страницу.
            </p>
            <img src="/images/emptyCart.png" alt="Empty cart" />
            <Link to="/" className="button button--black">
                <span>Вернуться назад</span>
            </Link>
        </div>
    )
}
export default CartEmpty
