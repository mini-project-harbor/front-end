import React from 'react';
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

class PrivateRoute extends React.Component {
    render() {
        return (
            <Route path={this.props.path} render={(props) => {
                return this.props.changeSession ? <this.props.Component {...props} /> :
                    <Redirect to='/' />
            }} />
        )
    }
};

const mapStateToProps = (state) => {
    return { changeSession: state.changeSession };
};

export default connect(mapStateToProps)(PrivateRoute);
