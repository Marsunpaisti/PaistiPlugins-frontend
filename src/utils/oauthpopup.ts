import { swapDiscordToken } from './api';
import { auth } from './firebase';
let oAuthWindow: Window | null = null;

export const signInWithDiscord = async () => {
    const oAuthPromise = new Promise<void>((resolve, reject) => {
        let closedInterval: NodeJS.Timeout | null = null;

        // This listener is in the parent window to receive comms from the popup
        const receiveMessage = async (event: MessageEvent<any>) => {
            // Security check
            if (event.origin !== process.env.REACT_APP_ORIGIN
                && event.origin !== process.env.REACT_APP_ORIGIN2
                && event.origin !== 'http://localhost:3000'
                && event.origin !== 'https://localhost:5000' 
                && event.origin !== 'http://localhost:5000'
                && event.origin !== 'https://localhost:5000') {
                return;
            }

            // Another security check
            if (event.source === oAuthWindow) {
                const params = event.data;
                if (closedInterval) clearInterval(closedInterval);
                try {
                    const customToken = await swapDiscordToken(params);
                    await auth.signInWithCustomToken(customToken);
                } catch (e){
                    reject(e);
                    return;
                }
                resolve();
                return;
            }
        }

        const parentW = window.outerWidth;
        const parentH = window.outerHeight;
        const w = 600;
        const h = 800
        const cornerLeft = window.screenLeft + Math.round(parentW/2 - w/2);
        const cornerTop = window.screenTop + Math.round(parentH/2 - h/2);
        const windowFeatures = `toolbar=no, menubar=no, width=${w}, height=${h}, top=${cornerTop}, left=${cornerLeft}`;
        const redirectUrl = encodeURIComponent(window.origin + '/discordcallback')
        const oauthUrl = `https://discord.com/api/oauth2/authorize?client_id=814586243588947968&redirect_uri=${redirectUrl}&response_type=token&scope=identify%20email`
        window.removeEventListener('message', receiveMessage);
        if (closedInterval) clearInterval(closedInterval);
        if (!oAuthWindow || oAuthWindow.closed) {
            oAuthWindow = window.open(oauthUrl, 'OAUTH_POPUP_DISCORD', windowFeatures);
        } else {
            oAuthWindow.focus();
        }
    
        closedInterval = setInterval(() => {
            if (!oAuthWindow || oAuthWindow.closed){
                reject(new Error('The popup has been closed by the user before finalizing the operation.'))
                if (closedInterval) clearInterval(closedInterval);
            }
        }, 1000);

        window.addEventListener('message', receiveMessage);
    })

    return oAuthPromise;
}