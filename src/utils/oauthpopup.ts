import { swapDiscordToken } from './api';
import { auth } from './firebase';
let oAuthWindow: Window | null = null;

const receiveMessage = async (event: MessageEvent<any>) => {
    // Security check
    if (event.origin !== process.env.REACT_APP_BASE_URL) {
        return;
    }

    // Another security check
    if (event.source === oAuthWindow) {
        const data = event.data;
        const params = data.payload;
        const customToken = await swapDiscordToken(params);
        await auth.signInWithCustomToken(customToken);
    }
}

export const signInWithDiscord = () => {
    const windowFeatures = 'toolbar=no, menubar=no, width=600, height=800, top=100, left=100';

    window.removeEventListener('message', receiveMessage);

    if (!oAuthWindow || oAuthWindow.closed) {
        oAuthWindow = window.open(process.env.REACT_APP_DISCORD_OAUTH_URL, 'OAUTH_POPUP_DISCORD', windowFeatures);
    } else {
        oAuthWindow.focus();
    }

    window.addEventListener('message', receiveMessage);
}