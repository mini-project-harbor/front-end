export function validateUser(username, password) {
    return fetch(process.env.REACT_APP_WS_URL + '/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'username': username,
            'password': password
        })
    });
}