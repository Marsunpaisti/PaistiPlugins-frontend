import React, { useEffect } from 'react';
import { useLocation} from 'react-router-dom';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { oAuthWindowClosed } from '../utils/oauthpopup';

export const DiscordCallbackPage = () => {
    const fullHash = useLocation().hash;

    // Remove the first # symbol from the string
    const p = new URLSearchParams(fullHash.slice(1));

    console.log(useLocation().hash);

    const params = {
        provider: 'discord',
        token_type: p.get('token_type')!,
        access_token: p.get('access_token')!,
        expires: p.get('expires_in')!,
        scope: p.get('scope')!,
    }

    useEffect(() => {
        // If this window was opened by another
        if (window.opener){
            window.opener.postMessage(params);

            // Remove the event listener so it wont think it was closed before completion
            window.removeEventListener('beforeunload', oAuthWindowClosed)
            window.close();
        }
    }, []);

	return <LoadingSpinner/>
};
