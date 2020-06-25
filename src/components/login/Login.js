import React from 'react';
import './login.css';
import { validateUser } from "../../api/user";
import { authUser, changeUserSession } from "../../actions/user/index";
import { connect } from "react-redux";
import Modal from "../modal/Modal";

class Login extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         username: null,
         password: null,
         invalidUsername: '',
         invalidPassword: '',
         alert: 'login hideAlert',
         notificationMessage: '',
         loading: false
      };
      this.usernameRef = React.createRef();
      this.passwordRef = React.createRef();
   };

   componentDidMount() {
      this.usernameRef.current.focus();
   }

   doLogin = async () => {
      if (!this.state.password || !this.state.username) {
         if (!this.state.password) {
            this.setState({ invalidPassword: 'is-invalid' });
         } else {
            this.setState({ invalidPassword: '' });
         }
         if (!this.state.username) {
            this.setState({ invalidUsername: 'is-invalid' });
         } else {
            this.setState({ invalidUsername: '' });
         }
      }

      if (this.state.username && this.state.password) {
         await this.setState({ loading: true });
         try {
            const response = await validateUser(this.state.username, this.state.password);
            const data = await response.json();
            console.log(data);
            if (data !== null) {
               this.props.changeUserSession(true);
               this.props.authUser(data);
               this.props.history.push({ pathname: '/protected/main' })
            }
         } catch (err) {
            await this.setState({ loading: false });
            this.setState({ alert: '', notificationMessage: 'Cannot Login, Try again' })
         }
      }
   };

   onEmailInputChange = (event) => {
      this.setState({ username: event.target.value });
   };

   onPasswordInputChange = (event) => {
      this.setState({ password: event.target.value });
   };

   render() {
      const loginLabel = { emailAddressText: 'Username', passwordText: 'Password', buttonText: 'Login' };
      const { email, password, invalidUsername, invalidPassword, alert, notificationMessage, loading } = this.state;
      return (
         <div className='login main'>
            <Modal visible={loading}>
               <div className="spinner-border" role="status">
               </div>
               <div><strong>Loading...</strong></div>
            </Modal>
            <div className="login container">
               <div className="row justify-content-center ">
                  <div className="col-md-6 col-sm-12 login my-top">
                     <div className="card-body login backgroundColorCard rounded">
                        <h2 className="login labelInput text-center p-3"><i className="fas fa-ship"></i> Enigma Harbor Group
                                    </h2>
                        <br />
                        <div className={`alert alert-danger ${alert}`} role="alert">
                           {notificationMessage}
                        </div>
                        <div>
                           <div className={`form-group`}>
                              <label className=" login labelInput"
                                 htmlFor=" exampleInputEmail1">{loginLabel.emailAddressText}</label>
                              <input ref={this.usernameRef} type=" text"
                                 className={`form-control ${invalidUsername} login inputText`}
                                 id=" exampleInputEmail1"
                                 placeholder=" Enter email" value={email}
                                 onChange={this.onEmailInputChange} />
                              <div className=" invalid-feedback"> Please enter an email in the input.</div>

                           </div>
                           <div className={`form-group login`}>
                              <label className=" login labelInput"
                                 htmlFor=" exampleInputPassword1">{loginLabel.passwordText}</label>
                              <input ref={this.passwordRef} type="password"
                                 className={`form-control ${invalidPassword} login inputText`}
                                 id=" exampleInputPassword1"
                                 onChange={this.onPasswordInputChange}
                                 value={password}
                                 placeholder=" Password" />
                              <div className=" invalid-feedback">Please enter your password in the input.</div>
                           </div>
                           <button type=" submit"
                              className={`btn  btn-outline-primary login inputButton  awesome-button-sm`}
                              onClick={() => this.doLogin()}><i
                                 className="fas fa-sign-in-alt"></i> {loginLabel.buttonText}</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )
   }
};

const mapDispatchToProps = {
   authUser: authUser,
   changeUserSession: changeUserSession
};

export default connect(null, mapDispatchToProps)(Login);