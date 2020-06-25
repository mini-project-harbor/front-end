import React from 'react';
import MainContent from "../mainContent/MainContent";
import { addShipService, deleteShipService } from '../../api/ship';

class MasterShipUpdate extends React.Component {
   state = { ship: {}, codeShip: '', shipName: '', captain: '', forAct: '' };

   componentDidMount() {
      const forAct = this.props.history.location.state.forAct;
      if (forAct === 'Create') {
         this.setState({
            forAct: this.props.history.location.state.forAct
         })
      } else {
         this.setState({
            ship: this.props.history.location.state.ship,
            codeShip: this.props.history.location.state.ship.codeShip,
            shipName: this.props.history.location.state.ship.shipName,
            captain: this.props.history.location.state.ship.captain,
            forAct: this.props.history.location.state.forAct
         })
      }

   }

   onInputCodeShipChange = (event) => {
      this.setState({ codeShip: event.target.value })
   };
   onInputShipNameChange = (event) => {
      this.setState({ shipName: event.target.value })
   };

   onInputCaptainChange = (event) => {
      this.setState({ captain: event.target.value })
   };

   addNewShip = async () => {
      let { codeShip, shipName, captain } = this.state;
      if (!(codeShip && shipName && captain)) {
         alert("Fill in all the input forms")
         await this.props.history.push({ pathname: '/protected/main/masterShipUpdate' });
      } else {
         let newShip = {
            codeShip: this.state.codeShip,
            shipName: this.state.shipName,
            captain: this.state.captain
         }
         await addShipService(newShip);
         alert('Data successfully entered');
         this.props.history.push({ pathname: '/protected/main/masterShip' })
      }
   }

   updateShip = async () => {

      let { codeShip, shipName, captain } = this.state;
      if (!(codeShip && shipName && captain)) {
         alert("Fill in all the input forms")
         await this.props.history.push({ pathname: '/protected/main/masterShipUpdate' });
      } else {
         let ship = {
            id: this.state.ship.id,
            codeShip: this.state.codeShip,
            shipName: this.state.shipName,
            captain: this.state.captain
         }
         await addShipService(ship);
         alert('Data successfully updated');
         this.props.history.push({ pathname: '/protected/main/masterShip' })
      }
   }

   deleteShip = async () => {
      let ship = this.props.history.location.state.ship;
      await deleteShipService(ship);
      alert('Data successfully deleted')
      this.props.history.push({ pathname: '/protected/main/masterShip' })
   }


   doUpdate = async (e) => {
      switch (this.state.forAct) {
         case 'Delete':
            await this.deleteShip();
            break;
         case 'Update':
            await this.updateShip();
            break;
         case 'Create':
            await this.addNewShip();
            break;
         default:
            break;
      }
   };

   doCancel = (e) => {
      e.preventDefault();
      this.props.history.push({
         pathname: '/protected/main/masterShip'
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
                           <div className='flex-grow-1'><h5><i className="fas fa-ship"></i>  {`Master Ship ${this.state.forAct}`}</h5></div>
                           <div>
                              <button className="btn btn-link" onClick={this.doCancel}><i
                                 className="fas fa-2x fa-times-circle"></i></button>
                           </div>
                        </div>
                     </div>
                     <div className="card-text">
                        <div className="form-group">
                           <label htmlFor="codeShip">ship ID</label>
                           <input type="text" value={this.state.codeShip} className="form-control"
                              id="codeShip" onChange={this.onInputCodeShipChange}
                              disabled={this.state.forAct === 'Delete'} />
                        </div>
                        <div className="form-group">
                           <label htmlFor="shipName">ship Name</label>
                           <input type="text" value={this.state.shipName} className="form-control"
                              id="shipName" onChange={this.onInputShipNameChange}
                              disabled={this.state.forAct === 'Delete'} />
                        </div>
                        <div className="form-group">
                           <label htmlFor="productName">Captain</label>
                           <input type="text" value={this.state.captain} className="form-control"
                              id="productName" onChange={this.onInputCaptainChange}
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

            </MainContent>
         </div>
      )
   }
}
export default (MasterShipUpdate);