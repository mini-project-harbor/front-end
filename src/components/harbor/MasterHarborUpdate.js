import React from 'react';
import MainContent from "../mainContent/MainContent";
import { addHarborService } from '../../api/harbor';

class MasterHarborUpdate extends React.Component {
    state = { harbor: {}, harborId: '', harborName: '', dockCode: '', forAct: '' };

    componentDidMount() {
        const forAct = this.props.history.location.state.forAct;
        if (forAct === 'Create') {
            this.setState({
                forAct: this.props.history.location.state.forAct
            })
        } else {
            this.setState({
                harbor: this.props.history.location.state.harbor,
                harborId: this.props.history.location.state.harbor.portCode,
                harborName: this.props.history.location.state.harbor.portName,
                forAct: this.props.history.location.state.forAct
            })
        }
    }

    onInputHarborIdChange = (event) => {
        this.setState({ harborId: event.target.value })
    };
    onInputHarborNameChange = (event) => {
        this.setState({ harborName: event.target.value })
    };

    onInputDockCode = (event) => {
        this.setState({ dockCode: event.target.value })
    }

    addNewHarbor = async () => {
        let { harborId, harborName, dockCode } = this.state;
        if (!(harborId && harborName && dockCode)) {
            alert("Fill in all the input forms")
            await this.props.history.push({ pathname: '/protected/main/masterHarborUpdate' });
        } else {
            let newHarbor = {
                portCode: this.state.harborId,
                portName: this.state.harborName,
                dock: { dockCode: this.state.dockCode }
            }
            await addHarborService(newHarbor);
            alert('Data successfully entered');
            await this.props.history.push({ pathname: '/protected/main/masterHarbor' });
        }
    }

    updateHarbor = async () => {
        let { harborId, harborName } = this.state;
        if (!(harborId && harborName)) {
            alert("Fill in all the input forms")
            await this.props.history.push({ pathname: '/protected/main/masterHarborUpdate' });
        } else {
            let updateHarbor = {
                id: this.state.harbor.id,
                portCode: this.state.harborId,
                portName: this.state.harborName
            }
            await addHarborService(updateHarbor);
            alert('Data successfully updated');
            await this.props.history.push({ pathname: '/protected/main/masterHarbor' });
        }
    }

    doUpdate = async (e) => {
        switch (this.state.forAct) {
            case 'Update':
                await this.updateHarbor();
                break;
            case 'Create':
                await this.addNewHarbor();
                break;
            default:
                break;
        }
    };

    doCancel = (e) => {
        e.preventDefault();
        this.props.history.push({
            pathname: '/protected/main/masterHarbor'
        })
    };

    render() {
        return (
            <div>
                <MainContent {...this.props}>
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title">
                                <div className='d-flex flex-row align-items-center'>
                                    <div className='flex-grow-1'><h5><i className="fab fa-docker"></i> {`Master Harbor ${this.state.forAct}`}</h5></div>
                                    <div>
                                        <button className="btn btn-link" onClick={this.doCancel}><i
                                            className="fas fa-2x fa-times-circle"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-text">
                                <div className="form-group">
                                    <label htmlFor="harborID">Harbor ID</label>
                                    <input type="text" value={this.state.harborId} className="form-control"
                                        id="harborID" onChange={this.onInputHarborIdChange}
                                    />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="harborName">Harbor Name</label>
                                    <input type="text" value={this.state.harborName} className="form-control"
                                        id="harborName" onChange={this.onInputHarborNameChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dockCode">Dock Code</label>
                                    <input type="text" value={this.state.dockCode} className="form-control"
                                        id="dockCode" onChange={this.onInputDockCode}
                                        disabled={this.state.forAct === 'Update'} />
                                </div>
                            </div>
                            <div className='d-flex flex-row-reverse '>
                                <div className="btn-group " role="group" aria-label="Basic example">
                                    <button className="btn btn-primary awesome-button-lg" onClick={this.doUpdate}>
                                        Save
                                    </button>
                                    <button className="btn btn-danger awesome-button-lg" onClick={this.doCancel}>Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </MainContent>
            </div >
        )
    }
}

export default MasterHarborUpdate;