import { swapDiscordToken } from './api';
import { auth } from './firebase';
let oAuthWindow: Window | null = null;

export const signInWithDiscord = async () => {
    const oAuthPromise = new Promise<void>((resolve, reject) => {
        let closedInterval: NodeJS.Timeout | null = null;

        // This listener is in the parent window to receive comms from the popup
        const receiveMessage = async (event: MessageEvent<any>) => {
            // Security check
            if (event.origin !== process.env.REACT_APP_BASE_URL) {
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
        window.removeEventListener('message', receiveMessage);
        if (closedInterval) clearInterval(closedInterval);
        if (!oAuthWindow || oAuthWindow.closed) {
            oAuthWindow = window.open(process.env.REACT_APP_DISCORD_OAUTH_URL, 'OAUTH_POPUP_DISCORD', windowFeatures);
        } else {
            oAuthWindow.focus();
        }
    
        closedInterval = setInterval(() => {
            if (!oAuthWindow || oAuthWindow.closed){
                reject(new Error('The popup has been closed by the user before finalizing the operation.'))
                if (closedInterval) clearInterval(closedInterval);
            }
        }, 500);

        window.addEventListener('message', receiveMessage);
    })

    return oAuthPromise;
}