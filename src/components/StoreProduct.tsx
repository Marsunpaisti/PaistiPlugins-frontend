import React from 'react';
import { Link } from 'react-router-dom';
import css from './StoreProduct.module.scss';

export interface StoreProductProps {
    title: string;
    image: string;
    description: string;
    id: string;
    price?: string;
}
export const StoreProduct: React.FC<StoreProductProps> = ({title, image, description, price, id}) => {
	return (
        <Link to={'/store?product=' + id}>
            <div className={css.container}>
                <img src={image} alt={title}/>
                <span className={css.title}>{title}</span>
                <span className={css.description}>{description}</span>
                <span className={css.price}>{price ? price : 'FREE'}</span>
            </div>
        </Link>
    )
};
