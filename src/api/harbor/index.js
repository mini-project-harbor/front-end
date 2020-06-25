export function getListHarborService(page, size) {
    return fetch(process.env.REACT_APP_WS_URL + `/ports/?page=${page}&size=${size}`, {
        method: 'GET'
    });
}

export function getHarborService(id) {
    return fetch(process.env.REACT_APP_WS_URL + `/ports/${id}`, {
        method: 'GET'
    });
}

export function addHarborService(harbor) {
    return fetch(process.env.REACT_APP_WS_URL + '/ports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(harbor)
    });
}

export function updateStatusDockService(idDock, status) {
    return fetch(process.env.REACT_APP_WS_URL + `/ports/${idDock}/${status}`, {
        method: 'PUT'
    });
}

export function deleteHarborService(id) {
    return fetch(process.env.REACT_APP_WS_URL + `/ports/${id}`, {
        method: 'DELETE'
    });
}