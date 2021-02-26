import React, { useEffect } from 'react';
import { useLocation} from 'react-router-dom';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const DiscordCallbackPage = () => {
    const fullHash = useLocation().hash;

    useEffect(() => {
        // Remove the first # symbol from the string
        const p = new URLSearchParams(fullHash.slice(1));
        const params = {
            provider: 'discord',
            token_type: p.get('token_type')!,
            access_token: p.get('access_token')!,
            expires: p.get('expires_in')!,
            scope: p.get('scope')!,
        }

        // If this window was opened by another
        if (window.opener){
            window.opener.postMessage(params);

            window.close();
        }
    }, [fullHash]);

	return <LoadingSpinner/>
};
