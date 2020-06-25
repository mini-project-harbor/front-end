import React from 'react';
import { getListHarborService } from "../../api/harbor";

class MasterHarborSelection extends React.Component {

    state = { listHarbor: [] }

    componentDidMount() {
        this.doGetListHarbor();
    }

    doGetListHarbor = async () => {
        const response = await getListHarborService(0, 10);
        const data = await response.json();
        this.setState({ listHarbor: data.content });
    };

    doRenderHarbor = () => {
        if (this.state.listHarbor) {
            return this.state.listHarbor.map((harbor) => {
                let isStatus;
                harbor.dockModels.map((dock) => {
                    if (dock.status.name === 'available') {
                        isStatus = true;
                    }
                });
                if (isStatus) {
                    return (
                        <option key={harbor.id} value={harbor.id}>{harbor.portName}</option>
                    )
                }
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
        return this.doRenderHarbor();
    }
}
export default MasterHarborSelection;
