import React from 'react';
import MainContent from "../mainContent/MainContent";
import { getListDockService } from '../../api/dock';
import { updateStatusDockService } from '../../api/harbor';

class MasterDock extends React.Component {

   state = { listDock: [] }

   componentDidMount() {
      console.log(this.doGetListDock())
      this.doGetListDock();
   }

   doTutup = (e) => {
      e.preventDefault();
      this.props.history.push({
         pathname: '/protected/main'
      })
   }

   doUpdateStatusDockActive = async (dock) => {
      await updateStatusDockService(dock.id, true)
      await this.doGetListDock();
   }

   doGetListDock = async () => {
      const response = await getListDockService(0, 10);
      const data = await response.json();
      this.setState({ listDock: data.content });
   };

   doRenderListDock = () => {
      if (this.state.listDock) {
         return this.state.listDock.map((dock) => {
            let status;
            let butonActive;
            if (dock.status.name === 'not available') {
               status = <div className="badge badge-danger"><i class="fas fa-ban"></i> {dock.status.name}</div>
               butonActive = (<button type="button" className='btn btn-sm btn-success mr-1' onClick={() => {
                  this.doUpdateStatusDockActive(dock)
               }}>  <i class="far fa-play-circle"></i>
               </button>)
            } else if (dock.status.name === 'available') {
               status = <div className="badge badge-success"><i class="far fa-check-circle"></i> {dock.status.name}</div>
            } else {
               status = <div className="badge badge-warning"><i class="fas fa-exclamation-circle"></i> {dock.status.name}</div>
               butonActive = (<button type="button" className='btn btn-sm btn-success mr-1' onClick={() => {
                  this.doUpdateStatusDockActive(dock)
               }}>  <i class="far fa-play-circle"></i>
               </button>)
            }
            return (
               <tr key={dock.id}>
                  <td>{dock.dockCode}</td>
                  <td>{status}</td>
                  <td className="text-center">
                     {butonActive}
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
            <div className="card mb-5">
               <div className="card-body">
                  <div className="card-title">
                     <div className='d-flex flex-row align-items-center'>
                        <div className='flex-grow-1'><h5>  <i className="fas fa-anchor"></i> Master Dock</h5></div>
                        <div>
                           <button className="btn btn-sm btn-link" onClick={this.doTutup}><i
                              className="fas fa-2x fa-times-circle"></i></button>
                        </div>
                     </div>
                  </div>
                  <div className="card-text p-3">
                     <div className="row">
                        <div className="col-md-12">
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
                                       <th scope="col">Dock ID</th>
                                       <th scope="col">Status Dock</th>
                                       <th className="text-center" scope="col">Action</th>
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

export default (MasterDock);
