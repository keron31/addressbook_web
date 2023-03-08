import { variables } from "../Variables";
import { Buffer } from "buffer";
import requestToApi from "./requestToApi";

async function refreshToken() {
    const accessToken = Buffer.from(sessionStorage.getItem('accessToken'), 'base64').toString();
    const refreshToken = Buffer.from(sessionStorage.getItem('refreshToken'), 'base64').toString();

    const body = {
        accessToken,
        refreshToken
    }

    const response = await requestToApi(variables.REFRESH_TOKEN_URL, "POST", body, false);

    if (response) {
        sessionStorage.setItem('accessToken', Buffer.from(response.accessToken).toString('base64'));
        sessionStorage.setItem('refreshToken', Buffer.from(response.refreshToken).toString('base64'));
        return true;
    } else {
        return false;
    }
}

export default refreshToken;