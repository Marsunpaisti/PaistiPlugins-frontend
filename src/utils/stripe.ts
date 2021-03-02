import { loadStripe } from '@stripe/stripe-js';
import { functions } from './firebase';

const stripeInstance = loadStripe('pk_test_51IONqNEAKtnsxJlFHONyzduaBs91gLZ2LlwoiyPOdeDWjqvNqeSGm5S9Qq1xNobvHgIpm9CagoU5OarYk0aJIFZB00V9sxQaIg');

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