import React from 'react';
import MainContent from "../mainContent/MainContent";
import { getListShipService } from "../../api/ship/index";

class MasterShip extends React.Component {

    state = { listShip: [] }

    componentDidMount() {
        this.doGetListShip();
    }

    doTutup = (e) => {
        e.preventDefault();
        this.props.history.push({
            pathname: '/protected/main'
        })
    };

    doGetListShip = async () => {
        const response = await getListShipService(0, 100);
        const data = await response.json();
        this.setState({ listShip: data.content });
    };

    doUpdateShip = (ship) => {
        this.props.history.push({ pathname: '/protected/main/masterShipUpdate', state: { forAct: 'Update', ship: ship } })
    };

    doDeleteShip = (ship) => {
        this.props.history.push({ pathname: '/protected/main/masterShipUpdate', state: { forAct: 'Delete', ship: ship } })
    };

    doAddShip = () => {
        this.props.history.push({ pathname: '/protected/main/masterShipUpdate', state: { forAct: 'Create' } })
    };

    doRenderListShip = () => {
        if (this.state.listShip) {
            return this.state.listShip.map((ship) => {
                let dockTmp;
                try {
                    if (ship.dock.dockCode !== null) {
                        dockTmp = ship.dock.dockCode
                    }
                } catch (error) {
                    console.log("there is a dock that is still empty");
                }

                return (
                    <tr key={ship.id}>
                        <td>{ship.codeShip}</td>
                        <td>{ship.shipName}</td>
                        <td>{ship.captain}</td>
                        <td>{dockTmp}</td>
                        <td className="text-center">
                            <button type="button" className='btn btn-sm btn-info mr-1' onClick={() => {
                                this.doUpdateShip(ship)
                            }}><i className="fas fa-edit"></i> Update
                            </button>
                            <button type="button" className='btn btn-sm btn-danger' onClick={() => {
                                this.doDeleteShip(ship)
                            }}><i className="fas fa-trash"></i> Delete
                            </button>
                        </td>
                    </tr>
                )
            })
        } else {
            return (
                <tr>
                    <td colSpan='2'>No Found</td>
                </tr>
            )
        }
    };

    render() {
        return (
            <MainContent {...this.props}>
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <div className='d-flex flex-row align-items-center'>
                                <div className='flex-grow-1'><h5> <i className="fas fa-ship"></i> Master Ship</h5></div>
                                <div>
                                    <button className="btn btn-sm btn-link" onClick={this.doTutup}><i
                                        className="fas fa-2x fa-times-circle"></i></button>
                                </div>
                            </div>
                        </div>

                        <div className="card-text p-3">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="card-subtitle mb-2">
                                        <button className="btn btn-outline-primary" onClick={this.doAddShip}><i className="fas fa-plus"></i> New Ship
                                        </button>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div class="form-inline mb-2 float-right">
                                        <input type="email" class="form-control mr-1" id="search" placeholder="Search" />
                                        <button className="btn btn-secondary"><i class="fas fa-search"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className=" table-responsive">
                                <table className='table table-bordered'>
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">Ship ID</th>
                                            <th scope="col">Ship Name</th>
                                            <th scope="col">Captain</th>
                                            <th scope="col">Dock</th>
                                            <th scope="col" className="text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.doRenderListShip()}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </MainContent>
        )
    }
}

export default (MasterShip);