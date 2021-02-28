import React from 'react';
import css from './StoreProduct.module.scss';

export interface StoreProductProps {
    title: string;
    image: string;
    description: string;
}
export const StoreProduct: React.FC<StoreProductProps> = ({title, image, description}) => {
	return (
        <div className={css.container}>
            <img src={image} alt={title}/>
            <span className={css.title}>{title}</span>
            <span className={css.description}>{description}</span>
        </div>
    )
};
