import React from 'react';
import { StoreProduct } from '../components/StoreProduct';
import css from './StorePage.module.scss';
import productJson from '../products.json'
import { useLocation } from 'react-router';
import { ProductDetails } from '../components/ProductDetails';

export const StorePage = () => {
    const products = productJson;
    const params = new URLSearchParams(useLocation().search);
    const product = params.get('product');

    if (product){
        const productJson = products.find(p => p.id === product);
        if (productJson) return <ProductDetails {...productJson}/>
    }

    return (
        <>
            <div className={css.categoryContainer}>
                <span className={css.categoryTitle}>Free plugins</span>
                <div className={css.productsContainer}>
                    {products.filter(p => !p.price).map((p) => <StoreProduct {...p} key={p.title}/>)}
                </div>
            </div>
            <div className={css.categoryContainer}>
                <span className={css.categoryTitle}>Premium plugins</span>
                <div className={css.productsContainer}>
                    {products.filter(p => p.price).map((p) => <StoreProduct {...p} key={p.title}/>)}
                </div>
            </div>
        </>
    )
};
