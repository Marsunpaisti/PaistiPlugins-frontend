import React, { useState } from 'react'
import css from './ApiKeyGenerator.module.scss'
import classNames from 'classnames/bind'
import { functions } from '../utils/firebase'
import { LoadingSpinner } from './LoadingSpinner'
const classes = classNames.bind(css)

export const ApiKeyGenerator: React.FC = () => {
    const [key, setKey] = useState('');
    const [keyLabel, setKeyLabel] = useState('Your secret key. Do not share it with others. Any previous key has been invalidated.')
    const [loading, setLoading] = useState(false);
    const generateKey = async () => {
        setLoading(true);
        const key = await functions.httpsCallable('generateKey')();
        setKey(key.data);
        setLoading(false);
    }

    const copyToClipboard = () => {
        setKeyLabel('Key copied to clipboard');
        navigator.clipboard.writeText(key);
    }

    if (loading){
        return (
        <div className={css.spinnerContainer}>
            <LoadingSpinner size="small"/>
        </div>
        )
    }
    if (key.length > 0){
        return (
            <>
                <div className={css.secretKeyLabelDiv}>
                    <span className={classes(css.secretKeyLabel, 'fadein')}>{keyLabel}</span>
                </div>
                <input className={css.secretKeyField} type="text" value={key} onFocus={() => copyToClipboard()}/>
            </>
        )
    }
    return (<button onClick={() => generateKey()}>Generate secret API key</button> );
}
