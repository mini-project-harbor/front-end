import React from 'react';
import MainContent from "../mainContent/MainContent";
import MasterHarborSelection from '../harbor/MasterHarborSelection';
import MasterShipSelection from '../ship/MasterShipSelection';
import StatusSelection from './StatusSelection';
import { addTrxService } from '../../api/transaction';

class MasterTransactionUpdate extends React.Component {
   state = { harbor: {}, ship: {}, shipId: null, harborId: null, status: null, load: 0, forAct: '', trxCode: '', trxDate: '' };

   componentDidMount() {
      let today = new Date();
      let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      this.setState({ trxDate: date });
      const forAct = this.props.history.location.state.forAct;
      if (forAct === 'Create') {
         this.setState({
            forAct: this.props.history.location.state.forAct
         })
      } else {
         let trx = this.props.history.location.state.trx;
         console.log(trx);
         this.setState({
            forAct: this.props.history.location.state.forAct,
            harbor: trx.port,
            ship: trx.ship,
            status: trx.status.name,
            trxCode: trx.transactionCode,
            load: trx.load,
            harborId: trx.port.id,
            shipId: trx.ship.id
         })
      }

   }

   onInputTrxCode = (event) => {
      this.setState({ trxCode: event.target.value })
   }

   onInputTrxDate = (event) => {
      this.setState({ trxDate: event.target.value })
   }

   onInputHarborChange = (event) => {
      this.setState({ harborId: event.target.value })
   };
   onInputShipChange = (event) => {
      this.setState({ shipId: event.target.value })
   };

   onInputStatusChange = (event) => {
      this.setState({ status: event.target.value })
   };
   onInputLoadChange = (event) => {
      this.setState({ load: event.target.value })
   }

   doUpdate = async (e) => {
      switch (this.state.forAct) {
         case 'Update':
            await this.updateTrx();
            break;
         case 'Create':
            await this.addNewTrx();
            break;
         default:
            break;
      }
   };

   addNewTrx = async () => {
      let { shipId, harborId, status, trxCode, trxDate } = this.state;
      if (!(shipId && harborId && status && trxCode && trxDate)) {
         alert("Fill in all the input forms")
         await this.props.history.push({ pathname: '/protected/main/masterTransactionUpdate' });
      } else {
         let newTrx = {
            transactionDate: this.state.trxDate,
            transactionCode: this.state.trxCode,
            load: this.state.load,
            portId: this.state.harborId,
            shipId: this.state.shipId,
            statusId: this.state.status
         }
         await addTrxService(newTrx);
         if (addTrxService) {
            alert('Data successfully entered');
         }

         this.props.history.push({
            pathname: '/protected/main/masterTransaction'
         })
      }
   }

   updateTrx = async () => {
      let { shipId, harborId, status, trxCode, trxDate } = this.state;
      if (!(shipId && harborId && status && trxCode && trxDate)) {
         alert("Fill in all the input forms")
         await this.props.history.push({ pathname: '/protected/main/masterTransactionUpdate' });
      } else {
         let updateTrx = {
            transactionCode: this.state.trxCode,
            transactionDate: this.state.trxDate,
            load: this.state.load,
            portId: this.state.harborId,
            shipId: this.state.shipId,
            statusId: this.state.status
         }

         await addTrxService(updateTrx);
         alert('Data successfully updated');
         this.props.history.push({
            pathname: '/protected/main/masterTransaction'
         })
      }
   }

   doCancel = (e) => {
      e.preventDefault();
      this.props.history.push({
         pathname: '/protected/main/masterTransaction'
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
                           <div className='flex-grow-1'><h5><i className="fas fa-ship"></i>  {`Transaction ${this.state.forAct}`}</h5></div>
                           <div>
                              <button className="btn btn-link" onClick={this.doCancel}><i
                                 className="fas fa-2x fa-times-circle"></i></button>
                           </div>
                        </div>
                     </div>
                     <div className="row justify-content-center">
                        <div className="col-md-8">
                           <div className="card-text">
                              <div className="form-group">
                                 <label htmlFor="codeTrx">Transaction Code</label>
                                 <input type="text" value={this.state.trxCode} className="form-control"
                                    id="codeTrx" onChange={this.onInputTrxCode}
                                    disabled={this.state.forAct === 'Delete'} />
                              </div>
                              <div className="form-group">
                                 <label htmlFor="trxDate">Transaction Date</label>
                                 <input type="text" value={this.state.trxDate} className="form-control"
                                    id="trxDate" onChange={this.onInputTrxDate}
                                    readOnly />
                              </div>
                              <div className="form-group">
                                 <label htmlFor="harbor">Harbor</label>
                                 <select class="form-control" id="status" onChange={this.onInputHarborChange} >
                                    <option selected>{this.state.forAct === 'Update' ? `${this.state.harbor.portName}` : 'Klik to See List Harbor'}</option>
                                    <MasterHarborSelection {...this.props} />
                                 </select>
                              </div>
                              <div className="form-group">
                                 <label htmlFor="ship">Ship</label>
                                 <select class="form-control" id="status" onChange={this.onInputShipChange} >
                                    <option selected>{this.state.forAct === 'Update' ? `${this.state.ship.shipName}` : 'Klik to See List Ship'}</option>
                                    <MasterShipSelection {...this.props} />
                                 </select>
                              </div>
                              <div class="form-group">
                                 <label for="status">Status</label>
                                 <select class="form-control" id="status" onChange={this.onInputStatusChange} >
                                    <option selected>{this.state.forAct === 'Update' ? `${this.state.status}` : 'Klik to See List status'}</option>
                                    <StatusSelection {...this.props} />
                                 </select>
                              </div>
                              <div className="form-group">
                                 <label htmlFor="load">Load</label>
                                 <input type="text" value={this.state.load} className="form-control"
                                    id="load" onChange={this.onInputLoadChange}
                                    disabled={this.state.forAct === 'Delete'} />
                              </div>
                           </div>
                           <div className='d-flex flex-row-reverse '>
                              <div className="btn-group" role="group" aria-label="Basic example">
                                 <button className="btn btn-primary awesome-button-lg" onClick={this.doUpdate}>
                                    {this.state.forAct === 'Delete' ? 'Yes, sure delete it' : 'Save'}
                                 </button>
                                 <button className="btn btn-danger awesome-button-lg" onClick={this.doCancel}>Cancel
                                    </button>
                              </div>
                           </div>
                        </div>
                     </div>

                  </div>
               </div>

            </MainContent>
         </div>
      )
   }
}

export default (MasterTransactionUpdate);