import React from 'react';
import { connect } from 'react-redux';
import {changeUrl, } from '../../actions';

class Login extends React.Component {
    render() {
        // const onSubmit = () => {
        //     if (this.username !== undefined && this.password !== undefined) {
        //         this.props.onClick(this.username.value, this.password.value)
        //     }

        return (
        <a href="#" onClick={() => {this.props.onClick(); return false;}}>LOG IN</a>
        )
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onClick: () => dispatch(changeUrl('/log_in/'))
    }
}

Login = connect(undefined, mapDispatchToProps)(Login);



export default Login;
