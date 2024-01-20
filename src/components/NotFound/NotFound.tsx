import React from 'react'

import styles from './NotFound.module.scss'
import '../../index.scss'

const NotFound: React.FC = () => {
    return (
        <main className="main">
            <div className="container">
                <div className={styles.root}>
                    <h1>
                        <span>😕</span>
                        <p>Ничего не найдено</p>
                    </h1>
                    <p className={styles.description}>
                        К сожалению данная страница отсутствует в нашем
                        интернет-магазине
                    </p>
                </div>
            </div>
        </main>
    )
}

export default NotFound
