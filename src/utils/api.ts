import { functions } from './firebase';

export type SwapDiscordTokenRequest = {
    token_type: string,
    access_token:string,
    expires: string,
    scope :string,
}


export const swapDiscordToken = async (params: SwapDiscordTokenRequest): Promise<string> => {
    //const res = await axios.post('https://europe-west1-paistiplugins.cloudfunctions.net/api/v1/oauth/discord', params);
    const res = await functions.httpsCallable('swapDiscordToken').call(params);
    return res.data.token;
}
