import React from 'react';
import { getListShipService } from "../../api/ship";

class MasterShipSelection extends React.Component {

    state = { listShip: [] }

    componentDidMount() {
        this.doGetListShip();
    }

    doGetListShip = async () => {
        const response = await getListShipService(0, 10);
        const data = await response.json();
        this.setState({ listShip: data.content });
        console.log(this.state)
    };

    doRenderShip = () => {
        if (this.state.listShip) {
            return this.state.listShip.map((ship) => {
                return (
                    <option key={ship.id} value={ship.id}>{ship.shipName}</option>
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
        return (this.doRenderShip())
    }
}

export default (MasterShipSelection);
