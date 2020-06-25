import React from 'react';
import MainContent from "../mainContent/MainContent";
import { getListTrxService } from '../../api/transaction';
import { downloadReportService } from '../../api/fileTransaction';

class MasterTransaction extends React.Component {

   state = { listTrx: [] }
   componentDidMount() {
      this.doGetListDock();
   }

   doTutup = (e) => {
      e.preventDefault();
      this.props.history.push({
         pathname: '/protected/main'
      })
   };

   doGetListDock = async () => {
      const response = await getListTrxService(0, 100);
      const data = await response.json();
      this.setState({ listTrx: data.content });
   };

   doUpdateTrx = (trx) => {
      this.setState({ isButton: false })
      this.props.history.push({ pathname: '/protected/main/MasterTransactionUpdate', state: { forAct: 'Update', trx: trx } })
   };


   doAddTrx = () => {
      this.props.history.push({ pathname: '/protected/main/MasterTransactionUpdate', state: { forAct: 'Create' } })
   };

   onReportDownload = async () => {
      const response = await downloadReportService();
      const blob = await response.blob();
      var fileURL = window.URL.createObjectURL(new Blob([blob], { type: "application/pdf" }));
      window.open(fileURL);
      this.setState({ message: 'Download ok' })
   };

   doRenderListDock = () => {
      if (this.state.listTrx) {
         return this.state.listTrx.map((trx) => {
            let status;
            let buttonUpdate;
            if (trx.status.name === 'docked') {
               status = <div className="badge badge-primary"><i class="far fa-stop-circle"></i> {trx.status.name}</div>
               buttonUpdate = (<button type="button" className='btn btn-sm btn-success mr-1' onClick={() => {
                  this.doUpdateTrx(trx)
               }} ><i class="far fa-check-circle"></i> Update
                  </button>)
            } else if (trx.status.name === 'sailing') {
               status = <div className="badge badge-success"><i class="far fa-check-circle"></i> {trx.status.name}</div>
            } else {
               status = <div className="badge badge-warning"><i class="fas fa-exclamation-circle"></i> {trx.status.name}</div>
               buttonUpdate = (<button type="button" className='btn btn-sm btn-success mr-1' onClick={() => {
                  this.doUpdateTrx(trx)
               }}><i class="far fa-check-circle"></i>  Update
                  </button>)

            }
            return (
               <tr key={trx.id}>
                  <td>{trx.transactionCode}</td>
                  <td>{trx.transactionDate}</td>
                  <td>{trx.port.portName}</td>
                  <td>{trx.ship.shipName}</td>
                  <td>{trx.ship.captain}</td>
                  <td>{status}</td>
                  <td>{trx.load}</td>
                  <td className="text-center">
                     {buttonUpdate}
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
                        <div className='flex-grow-1'><h5>  <i className="fas fa-clipboard-list"></i> Transactions </h5></div>
                        <div>
                           <button className="btn btn-sm btn-link" onClick={this.doTutup}><i
                              className="fas fa-2x fa-times-circle"></i></button>
                        </div>
                     </div>
                  </div>
                  <div className="card-text border rounded p-3">
                     <div className="row">
                        <div className="col-md-4">
                           <div className="card-subtitle mb-2">
                              <button className="btn btn-outline-primary mr-1" onClick={this.doAddTrx}><i className="fas fa-plus"></i> New Transaction</button>
                              <button className="btn btn-secondary" onClick={this.onReportDownload}><i class="fas fa-file-download"></i> Report</button>

                           </div>
                        </div>
                        <div className="col-md-8">
                           <div class="form-inline mb-2 float-right">

                              <input type="email" class="form-control mr-1" id="search" placeholder="Search" />
                              <button className="btn btn-secondary"><i class="fas fa-search"></i></button>
                           </div>
                        </div>
                     </div>
                     <div className="row">
                        <div className="col-md-12">
                           <table className='table table-bordered'>
                              <thead className="thead-dark ">
                                 <tr>
                                    <th scope="col">Trx Code</th>
                                    <th scope="col">Trx Date</th>
                                    <th scope="col">Harbor</th>
                                    <th scope="col">Ship</th>
                                    <th scope="col">Captain</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Load</th>
                                    <th scope="col" className="text-center">Actions</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {this.doRenderListDock()}
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>

               </div>
            </div>
         </MainContent>
      )
   }
}

export default (MasterTransaction);