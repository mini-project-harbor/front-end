import React from 'react';
import MainContent from "../mainContent/MainContent";
import { getListHarborService } from "../../api/harbor";

class MasterHarbor extends React.Component {

   state = { listHarbor: [] }

   componentDidMount() {
      this.doGetListHarbor();
   }

   doTutup = (e) => {
      e.preventDefault();
      this.props.history.push({
         pathname: '/protected/main'
      })
   };


   doGetListHarbor = async () => {
      const response = await getListHarborService(0, 100);
      const data = await response.json();
      await this.setState({ listHarbor: data.content });
   };

   doUpdateHarbor = (harbor) => {
      this.props.history.push({ pathname: '/protected/main/masterHarborUpdate', state: { forAct: 'Update', harbor: harbor } })
   };

   doAddHarbor = () => {
      this.props.history.push({ pathname: '/protected/main/masterHarborUpdate', state: { forAct: 'Create' } })
   };

   doDetailsHarbor = (harbor) => {
      this.props.history.push({ pathname: '/protected/main/detailsHarbor', state: { harbor: harbor } })
   }

   doRenderListHarbor = () => {
      if (this.state.listHarbor) {
         return this.state.listHarbor.map((harbor) => {
            return (
               <tr key={harbor.id}>
                  <td>{harbor.portCode}</td>
                  <td>{harbor.portName}</td>
                  <td className="text-center" >
                     <button type="button" className='btn btn-sm btn-info mr-1' onClick={() => {
                        this.doDetailsHarbor(harbor)
                     }}><i class="fas fa-eye"></i> Details
                            </button>
                     <button type="button" className='btn btn-sm btn-success mr-1' onClick={() => {
                        this.doUpdateHarbor(harbor)
                     }}><i className="fas fa-edit"></i> Update
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
                  <h5 className="card-title">
                     <div className='d-flex flex-row align-items-center'>
                        <div className='flex-grow-1'><i className="fab fa-docker"></i> Master Harbor</div>
                        <div>
                           <button className="btn btn-sm btn-link" onClick={this.doTutup}><i
                              className="fas fa-2x fa-times-circle"></i></button>
                        </div>
                     </div>
                  </h5>
                  <div className="card-text p-3">
                     <div className="row">
                        <div className="col-md-4">
                           <div className="card-subtitle mb-2">
                              <button className="btn btn-outline-primary" onClick={this.doAddHarbor}><i className="fas fa-plus"></i> New Harbor</button>
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
                                 <th scope="col">Harbor ID</th>
                                 <th scope="col">Harbor Name</th>
                                 <th className="text-center" scope="col">Action</th>
                              </tr>
                           </thead>
                           <tbody>
                              {this.doRenderListHarbor()}
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
export default MasterHarbor;