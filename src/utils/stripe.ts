import { loadStripe } from '@stripe/stripe-js';
import { functions } from './firebase';

const stripeInstance = loadStripe('pk_live_51IONqNEAKtnsxJlFuSWjPfJi5BOW3ZkmmtAbN2oOtilPs3LqgihwlDN6iDZTquaCF6n8qabbUsu7nxJUNLtZL8ZO00hPiKlADz');

export interface StripeItem {
    price: string,
    quantity: number
}

export const startCheckout = async (items: StripeItem[]) => {
    if (!stripeInstance) {
        throw new Error('Stripe is not initialized!');
    }

    let res;
    try {
        res = await functions.httpsCallable('stripeCreateSession')({line_items: items});
    } catch (e){
        throw new Error('Unable to initiate payment');
    }
    const checkoutResult = await (await stripeInstance)?.redirectToCheckout({
        sessionId: res.data
    });

    if (checkoutResult?.error) {
        throw new Error(checkoutResult.error.message);
    }
}