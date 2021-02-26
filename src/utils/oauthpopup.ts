import { swapDiscordToken } from './api';
import { auth } from './firebase';
let oAuthWindow: Window | null = null;
let oAuthPromise: Promise<void> | null = null;

// This listener is ran when the popup is closed
export function oAuthWindowClosed (this: Window, _event: any) {
    if (this.opener){
        this.opener.postMessage({closedPrematurely: true});
        this.close();
    }

    return;
}

export const signInWithDiscord = async () => {
    oAuthPromise = new Promise<void>((resolve, reject) => {
        // This listener is in the parent window to receive comms from the popup
        const receiveMessage = async (event: MessageEvent<any>) => {
            // Security check
            if (event.origin !== process.env.REACT_APP_BASE_URL) {
                return;
            }

            // Another security check
            if (event.source === oAuthWindow) {
                console.log('data: ' + JSON.stringify(event.data, undefined, 2));
                const params = event.data;
                if (params.closedPrematurely) {
                    reject('The popup has been closed by user before completion.');
                } else {
                    const customToken = await swapDiscordToken(params);
                    await auth.signInWithCustomToken(customToken);
                    resolve();
                }
            }
        }

        const windowFeatures = 'toolbar=no, menubar=no, width=600, height=800, top=100, left=200';
        window.removeEventListener('message', receiveMessage);
        if (!oAuthWindow || oAuthWindow.closed) {
            oAuthWindow = window.open(process.env.REACT_APP_DISCORD_OAUTH_URL, 'OAUTH_POPUP_DISCORD', windowFeatures);
            oAuthWindow?.addEventListener('beforeunload', oAuthWindowClosed)
        } else {
            oAuthWindow.focus();
        }
    
        window.addEventListener('message', receiveMessage);
    })

    return oAuthPromise;
}