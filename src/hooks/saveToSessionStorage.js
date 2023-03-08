import { Buffer } from "buffer";

function saveToSessionStorage(responseFromApi) {
    sessionStorage.setItem('accessToken', Buffer.from(responseFromApi['accessToken']).toString('base64'));
    sessionStorage.setItem('refreshToken', Buffer.from(responseFromApi['refreshToken']).toString('base64'));

    if ('id' in responseFromApi) {
        sessionStorage.setItem('id', JSON.stringify(responseFromApi['id']));
        sessionStorage.setItem('firstName', JSON.stringify(responseFromApi['firstName']));
        sessionStorage.setItem('lastName', JSON.stringify(responseFromApi['lastName']));
        sessionStorage.setItem('email', JSON.stringify(responseFromApi['email']));
    }
}

export default saveToSessionStorage;