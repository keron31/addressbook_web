import { Buffer } from "buffer";
import refreshToken from "./refreshToken";

async function requestToApi(url, method, body, authorization) {
    const headers = {
        'Content-Type': 'application/json'
    }

    if (authorization) {
        const accessToken = Buffer.from(sessionStorage.getItem('accessToken'), 'base64').toString();
        headers['Authorization'] = 'Bearer ' + accessToken;
    }

    const request = {
        method,
        headers
    }

    if (body) {
        body = JSON.stringify(body);
        request.body = body;
    }

    try {
        const response = await fetch(url, request);
        if (response.status === 401 || response.status === 403) {
            const success = await refreshToken();
            if (success) {
                return requestToApi(url, method, body, authorization);
            } else {
                sessionStorage.clear();
                window.location.href = "/login";
            }
        } else if (response.status === 200) {
            return await response.json();
        } else {
            return console.log("Error while sending request to api!", response);
        }
    } catch (err) {
        console.clear();
        console.log("Error while sending request to api!", err);
    }
}

export default requestToApi;