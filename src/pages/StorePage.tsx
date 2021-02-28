import React from 'react';
import { StoreProduct } from '../components/StoreProduct';
import css from './StorePage.module.scss';
export const StorePage = () => {

    const product = { 
        title: 'AIO Fighter',
        description: 'Free version of PAIOFighter that will automatically fight enemies for you',
        image: 'https://firebasestorage.googleapis.com/v0/b/paistiplugins/o/fighter.png?alt=media&token=bf30c36b-b85d-4af5-bf68-7460e88e797d',
    }

    return (
        <>
            <div className={css.categoryContainer}>
                <span className={css.categoryTitle}>Free plugins</span>
                <div className={css.productsContainer}>
                    <StoreProduct {...product}/>
                    <StoreProduct {...product}/>
                </div>
            </div>
            <div className={css.categoryContainer}>
                <span className={css.categoryTitle}>Premium plugins</span>
                <div className={css.productsContainer}>
                    <StoreProduct {...product}/>
                    <StoreProduct {...product}/>
                    <StoreProduct {...product}/>
                </div>
            </div>
        </>
    )
};
