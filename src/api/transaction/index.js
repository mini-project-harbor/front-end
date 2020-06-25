export function getListTrxService(page, size) {
    return fetch(process.env.REACT_APP_WS_URL + `/transactions/?page=${page}&size=${size}`, {
        method: 'GET'
    });
}

export function getListStatusService() {
    return fetch(process.env.REACT_APP_WS_URL + `/status`, {
        method: 'GET'
    });
}

export function addTrxService(trx) {
    return fetch(process.env.REACT_APP_WS_URL + '/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trx)
    });
}