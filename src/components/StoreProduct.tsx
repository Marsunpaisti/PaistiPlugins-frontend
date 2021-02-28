import React from 'react';
import css from './StoreProduct.module.scss';

export interface StoreProductProps {
    title: string;
    image: string;
    description: string;
    price?: string;
}
export const StoreProduct: React.FC<StoreProductProps> = ({title, image, description, price}) => {
	return (
        <div className={css.container}>
            <img src={image} alt={title}/>
            <span className={css.title}>{title}</span>
            <span className={css.description}>{description}</span>
            <span className={css.price}>{price ? price : 'FREE'}</span>
        </div>
    )
};
