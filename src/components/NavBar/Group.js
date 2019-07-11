import React from 'react';
import { connect } from 'react-redux';
import {changeUrl, } from '../../actions';

class Group extends React.Component {
    render() {
        // const onSubmit = () => {
        //     if (this.username !== undefined && this.password !== undefined) {
        //         this.props.onClick(this.username.value, this.password.value)
        //     }

        return (
        <a href="#" onClick={() => {this.props.onClick(); return false;}}>GROUP</a>
        )
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onClick: () => dispatch(changeUrl('/groups/'))
    }
}

Group = connect(undefined, mapDispatchToProps)(Group);



export default Group;
