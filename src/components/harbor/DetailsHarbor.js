import React, { Component } from 'react';
import MainContent from '../mainContent/MainContent';
import { addHarborService, updateStatusDockService } from '../../api/harbor';
import { deleteDockService, getListDockByIdPortService } from '../../api/dock';

class DetailsHarbor extends Component {

   state = { dockCode: '', isFormAddDock: false, harbor: {}, dock: [] }

   componentDidMount() {
      let harbor = this.props.history.location.state.harbor;
      this.setState({ harbor: harbor })

   }
   componentDidUpdate() {
      this.getHarborFromApi(this.state.harbor.id);
   }
   doDeleteDock = async (dock) => {
      await deleteDockService(dock);
      await this.getHarborFromApi(this.state.harbor.id)
   }

   getHarborFromApi = async (id) => {
      const response = await getListDockByIdPortService(id);
      const data = await response.json();
      this.setState({ dock: data });
   }

   doAddDock = async () => {
      let { dockCode } = this.state;
      if (!dockCode) {
         alert("Fill in all the input forms");
      }
      else {
         let newDock = {
            id: this.state.harbor.id,
            portCode: this.state.harbor.portCode,
            portName: this.state.harbor.portName,
            dock: { dockCode: this.state.dockCode }
         }
         await addHarborService(newDock);
         this.setState({ dockCode: '' });
         await this.getHarborFromApi(this.state.harbor.id)
      }
   }

   onInputDockCode = (event) => {
      this.setState({ dockCode: event.target.value });
   }

   formAddDock = () => {
      this.setState({ isFormAddDock: true });
   }

   doCancel = () => {
      this.setState({ isFormAddDock: false });
   }

   doCloseDetail = () => {
      this.props.history.push({ pathname: '/protected/main/masterHarbor' })
   }

   doUpdateStatusDockNonActive = async (dock) => {
      await updateStatusDockService(dock.id, false)
      await this.getHarborFromApi(this.state.harbor.id)
   }

   doUpdateStatusDockActive = async (dock) => {
      await updateStatusDockService(dock.id, true)
      await this.getHarborFromApi(this.state.harbor.id)
   }


   doRenderListDock = () => {
      let listDock = this.state.dock;
      if (listDock) {
         return listDock.map((dock) => {
            let status;
            let btnUpdateStatusDock;
            if (dock.status.name === 'not available') {
               status = <div className="badge badge-danger"><i class="fas fa-ban"></i> {dock.status.name}</div>
               btnUpdateStatusDock = (<button type="button" className='btn btn-sm btn-success' onClick={() => {
                  this.doUpdateStatusDockActive(dock)
               }}> <i class="far fa-check-circle"></i>
               </button>)
            } else if (dock.status.name === 'available') {
               status = <div className="badge badge-success"><i class="far fa-check-circle"></i> {dock.status.name}</div>
               btnUpdateStatusDock = (<button type="button" className='btn btn-sm btn-danger' onClick={() => {
                  this.doUpdateStatusDockNonActive(dock)
               }}> <i class="fas fa-ban"></i>
               </button>)
            } else {
               status = <div className="badge badge-warning"><i class="fas fa-exclamation-circle"></i> {dock.status.name}</div>
               btnUpdateStatusDock = (<button type="button" className='btn btn-sm btn-success' onClick={() => {
                  this.doUpdateStatusDockActive(dock)
               }}> <i class="far fa-check-circle"></i>
               </button>)
            }
            return (
               <tr key={dock.id}>
                  <td>{dock.dockCode}</td>
                  <td>{status}</td>
                  <td className="text-center">
                     {btnUpdateStatusDock}
                     <button type="button" className='btn btn-sm btn-secondary ml-1' onClick={() => {
                        this.doDeleteDock(dock)
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
      let formAdd;
      if (this.state.isFormAddDock) {
         formAdd = (<div className="card">
            <div className="card-body">
               <div className="card-title">
                  <div className='d-flex flex-row align-items-center'>
                     <div className='flex-grow-1'><h5><i className="fas fa-anchor"></i> Add Dock</h5></div>
                     <div>
                        <button className="btn btn-link" onClick={this.doCancel}><i
                           className="fas fa-2x fa-times-circle"></i></button>
                     </div>
                  </div>
               </div>
               <div className="card-text">
                  <div className="form-group">
                     <label htmlFor="dockCode">Dock Code</label>
                     <input type="text" value={this.state.dockCode} className="form-control"
                        id="dockCode" onChange={this.onInputDockCode}
                     />
                  </div>
               </div>
               <div className='d-flex flex-row-reverse '>
                  <div className="btn-group " role="group" aria-label="Basic example">
                     <button className="btn btn-primary awesome-button-lg" onClick={this.doAddDock}>
                        Add
                     </button>
                     <button className="btn btn-danger awesome-button-lg" onClick={this.doCancel}>Cancel
                     </button>
                  </div>
               </div>
            </div>
         </div>);
      }
      return (
         <MainContent {...this.props}>
            <div className="card">
               <div className="card-body">
                  <div className="card-title">
                     <div className='d-flex flex-row align-items-center'>
                        <div className='flex-grow-1'><h5>  <i className="fab fa-docker"></i> Detail Harbor</h5></div>
                        <div>
                           <button className="btn btn-sm btn-link" onClick={this.doCloseDetail}><i
                              className="fas fa-2x fa-times-circle"></i></button>
                        </div>
                     </div>
                  </div>
                  <div className="card-text border rounded p-3">
                     <div className="row">
                        <div className="col-md-4">
                           <div className="table table-sm">
                              <tr>
                                 <td><h5>{this.state.harbor.portName}</h5></td>
                              </tr>
                              <tr>
                                 <td>{this.state.harbor.portCode}</td>
                              </tr>
                           </div>
                        </div>
                     </div>
                     {formAdd}
                     <div className="row mt-4">
                        <div className="col-md-4">
                           <div className="card-subtitle mb-2">
                              <button className="btn btn-outline-primary" onClick={this.formAddDock}><i className="fas fa-plus"></i> New Dock</button>
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
                           <div className=" table-responsive">
                              <table className='table table-bordered'>
                                 <thead className="thead-dark ">
                                    <tr>
                                       <th scope="col">Dock Code</th>
                                       <th scope="col">Status Dock</th>
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
            </div>

         </MainContent>
      )
   }
}

export default DetailsHarbor;