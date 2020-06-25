export function getListDockService(page, size) {
    return fetch(process.env.REACT_APP_WS_URL + `/docks/?page=${page}&size=${size}`, {
        method: 'GET'
    });
}

export function getListDockByIdPortService(id) {
    return fetch(process.env.REACT_APP_WS_URL + `/docks/${id}`, {
        method: 'GET'
    });
}

export function deleteDockService(dock) {
    return fetch(process.env.REACT_APP_WS_URL + `/docks/${dock.id}`, {
        method: 'DELETE'
    });
}

//"proxy": "http://10.10.11.151:8080"