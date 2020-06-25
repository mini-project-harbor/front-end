export function getListShipService(page, size) {
    return fetch(process.env.REACT_APP_WS_URL + `/ships/?page=${page}&size=${size}`, {
        method: 'GET'
    });
}

export function addShipService(ship) {
    return fetch(process.env.REACT_APP_WS_URL + '/ships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ship)
    });
}

export function deleteShipService(ship) {
    return fetch(process.env.REACT_APP_WS_URL + `/ships/${ship.id}`, {
        method: 'DELETE'
    });
}