import React, { useContext, useState } from 'react';
import css from './ProductDetails.module.scss';
import classNames from 'classnames/bind'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { startCheckout } from '../utils/stripe';
import { MainContext } from '../contexts/MainContext';
import { LoadingSpinner } from './LoadingSpinner';
import { Alert } from './Alert';
const classes = classNames.bind(css)

export interface ProductDetailsProps {
    title: string;
    image: string;
    description: string;
    id: string;
    price?: string;
    features?: string[];
    priceId?: string;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({title, image, description, price, features, priceId}) => {
    const { authenticated } = useContext(MainContext);
    const history = useHistory();
    const location = useLocation();
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [error, setError] = useState('');

    const onBuyButtonClick = async () => {
        if (!priceId) return;
        if (!authenticated) {
            const redirect = location.pathname + location.search;
            history.push('/signin#redirect=' + encodeURIComponent(redirect));
            return;
        }

        setPaymentLoading(true);
        try {
            await startCheckout([{
                price: priceId,
                quantity: 1
            }])
        } catch (e){
            setError(e.message);
        }
        setPaymentLoading(false);
    }

	return (
        <div className={css.container}>
            <div className={css.pictureTextContainer}>
                <div className={css.detailsColumn}>
                    <span className={css.title}>{title}</span>
                    <span className={css.description}>{description}</span>
                    <span className={css.featuresTitle}>Features</span>
                    <ul>
                        {
                            features && features.map(f => <li key={f}>{f}</li>)
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
                        {!paymentLoading && error.length > 0 && <div className={css.alert}> <Alert message={'Error: ' + error} type="error" onClick={() => setError('')}/> </div>}
                        {!paymentLoading && <button className={classes(css.button, {hide: !price})} onClick={() => onBuyButtonClick()}>{authenticated ? 'Purchase license' : 'Sign in & Purchase'}</button>}
                        {paymentLoading && <div className={css.spinnerContainer}><LoadingSpinner size="small"/></div>}
                    </div>
                </div>
            </div>
        </div>
    )
};
