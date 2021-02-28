import React from 'react';
import { StoreProduct } from '../components/StoreProduct';
import css from './StorePage.module.scss';
import productJson from '../products.json'

export const StorePage = () => {
    const products = productJson;
    return (
        <>
            <div className={css.categoryContainer}>
                <span className={css.categoryTitle}>Free plugins</span>
                <div className={css.productsContainer}>
                    {products.filter(p => !p.price).map(p => <StoreProduct {...p} key={p.title}/>)}
                </div>
            </div>
            <div className={css.categoryContainer}>
                <span className={css.categoryTitle}>Premium plugins</span>
                <div className={css.productsContainer}>
                    {products.filter(p => p.price).map(p => <StoreProduct {...p} key={p.title}/>)}
                </div>
            </div>
        </>
    )
};
