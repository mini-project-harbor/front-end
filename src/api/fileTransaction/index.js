export function downloadReportService() {
    return fetch(process.env.REACT_APP_WS_URL + '/transactions/report', {
        method: 'GET'
    });
}