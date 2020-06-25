import React from 'react';
import './mainContent.css';
import { connect } from "react-redux";
import { logout } from "../../actions/user/index";

class MainContent extends React.Component {
   doLogout = (event) => {
      event.preventDefault();
      this.props.logout();
      // console.log(this.props)
   };

   doShowModule = (event, module) => {
      event.preventDefault();
      switch (module) {
         case 'main':
            this.props.history.push({
               pathname: '/protected/main'
            });
            break;
         case 'harbor':
            this.props.history.push({
               pathname: '/protected/main/masterHarbor'
            });
            break;
         case 'ship':
            this.props.history.push({
               pathname: '/protected/main/masterShip'
            });
            break;
         case 'dock':
            this.props.history.push({
               pathname: '/protected/main/masterDock'
            });
            break;
         case 'trx':
            this.props.history.push({
               pathname: '/protected/main/masterTransaction'
            });
            break;
         default:
            break;
      }
   };

   render() {
      return (
         <div>
            <div className="d-flex" id="wrapper">
               {/* <!-- Sidebar --> */}
               <div className="bg-white border-right" id="sidebar-wrapper">
                  <div className="sidebar-heading p-3"><i className="fas fa-ship"></i> Enigma Harbor </div>
                  <div className="list-group list-group-flush">
                     <button className="list-group-item list-group-item-action bg-white my-side"
                        onClick={(event) => {
                           this.doShowModule(event, 'main')
                        }}>
                        <i className="fas fa-tachometer-alt"></i> Dashboard
                            </button>
                     <button className="list-group-item list-group-item-action bg-white my-side"
                        onClick={(event) => {
                           this.doShowModule(event, 'harbor')
                        }}>
                        <i className="fab fa-docker"></i> Master Harbor
                            </button>
                     <button className="list-group-item list-group-item-action bg-white my-side"
                        onClick={(event) => {
                           this.doShowModule(event, 'ship')
                        }}>
                        <i className="fas fa-ship"></i> Master Ship
                            </button>
                     <button className="list-group-item list-group-item-action bg-white my-side"
                        onClick={(event) => {
                           this.doShowModule(event, 'dock')
                        }}>
                        <i className="fas fa-anchor"></i> Master Dock
                            </button>
                     <button className="list-group-item list-group-item-action bg-white my-side"
                        onClick={(event) => {
                           this.doShowModule(event, 'trx')
                        }}>
                        <i className="fas fa-clipboard-list"></i> Transactions
                            </button>
                  </div>
               </div>
               {/* /#sidebar-wrappe */}

               {/* <!-- Page Content --> */}
               <div id="page-content-wrapper">

                  <nav className="navbar navbar-expand-lg navbar-light bg-white">

                     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                     </button>

                     <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                           <li className="nav-item active">
                              <label className="nav-item nav-link user">{'Welcome ' + this.props.userActive.username}</label>
                           </li>
                           <li className="nav-item">
                              <div className="nav-item nav-link logout" onClick={this.doLogout}><i className="fas fa-sign-out-alt"></i> Logout</div>
                           </li>
                        </ul>
                     </div>
                  </nav>

                  <div className="container-fluid mt-3">
                     {this.props.children}
                  </div>
               </div>
               {/* <!-- /#page-content-wrapper --> */}

            </div>
            {/* <!-- /#wrapper --> */}


         </div>
      )
   }
}

const mapStateToProps = (state) => {
   return { userActive: state.userActive };
};

const mapDispatchToProps = {
   logout: logout
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);