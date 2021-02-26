import React, { useEffect } from 'react';
import { useLocation} from 'react-router-dom';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const DiscordCallbackPage = () => {
    const p = new URLSearchParams(useLocation().search);

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
            window.close();
        }
    }, []);

	return <LoadingSpinner/>
};
