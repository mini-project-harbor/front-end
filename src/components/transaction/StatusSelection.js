import React from 'react';
import { getListStatusService } from '../../api/transaction';

class StatusSelection extends React.Component {

    state = { listStatus: [] }

    componentDidMount() {
        this.doGetListStatus();
    }

    doGetListStatus = async () => {
        const response = await getListStatusService();
        const data = await response.json();
        this.setState({ listStatus: data });

    };

    doRenderStatus = () => {
        if (this.state.listStatus) {
            return this.state.listStatus.map((status) => {
                return (
                    <option key={status.id} value={status.id}>{status.name}</option>
                )
            });
        } else {
            return (
                <tr>
                    <option></option>
                </tr>
            )
        }
    };

    render() {
        return this.doRenderStatus();
    }
}
export default StatusSelection;
