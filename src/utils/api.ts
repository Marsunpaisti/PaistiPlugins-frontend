import { functions } from './firebase';

export type SwapDiscordTokenRequest = {
    token_type: string,
    access_token:string,
    expires: string,
    scope :string,
}


export const swapDiscordToken = async (params: SwapDiscordTokenRequest): Promise<string> => {
    const res = await functions.httpsCallable('swapDiscordToken')(params);
    return res.data.token;
}
