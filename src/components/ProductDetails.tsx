import React from 'react';
import css from './ProductDetails.module.scss';
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom';
const classes = classNames.bind(css)

export interface ProductDetailsProps {
    title: string;
    image: string;
    description: string;
    id: string;
    price?: string;
    features?: string[];
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({title, image, description, price, features}) => {
	return (
        <div className={css.container}>
            <div className={css.pictureTextContainer}>
                <div className={css.detailsColumn}>
                    <span className={css.title}>{title}</span>
                    <span className={css.description}>{description}</span>
                    <span className={css.featuresTitle}>Features</span>
                    <ul>
                        {
                            features && features.map(f => <li>{f}</li>)
                        }
                    </ul>
                    <span className={css.featuresTitle}>How to use</span>
                    {!price && <span className={css.description}>Add Paisti Plugins repository to your client, then download PaistiSuite and this plugin. Then you can enable the plugin from the client.</span>}
                    {price && <span className={css.description}>After purchasing a license, download the files and enter your API key into the config. You can get the API key from the <Link className="link" to="/profile">profile</Link> page.</span>}
                </div>
                <div className={css.imageColumn}>
                    <img src={image} alt={title}/>
                    <div className={css.purchaseDetails}>
                        <span className={css.price}>{price ? price : 'Free'}</span>
                        <button className={classes(css.button, {hide: !price})}>Purchase license</button>
                    </div>
                </div>
            </div>
        </div>
    )
};
