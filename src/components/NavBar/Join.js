import React from 'react';
import { connect } from 'react-redux';
import {changeUrl} from '../../actions';

class Join extends React.Component {
    render() {
        // const onSubmit = () => {
        //     if (this.username !== undefined && this.password !== undefined) {
        //         this.props.onClick(this.username.value, this.password.value)
        //     }

        return (
        <a href="#" onClick={() => {this.props.onClick(); return false;}}>JOIN</a>
        )
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onClick: () => dispatch(changeUrl('/sign_up/'))
    }
}

Join = connect(undefined, mapDispatchToProps)(Join);



export default Join;
