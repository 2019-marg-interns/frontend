import React from 'react';
import { connect } from 'react-redux';
import {changeUrl} from '../../actions';

class Mydesign extends React.Component {
    render() {
        // const onSubmit = () => {
        //     if (this.username !== undefined && this.password !== undefined) {
        //         this.props.onClick(this.username.value, this.password.value)
        //     }

        return (
        <a href="#" onClick={() => {this.props.onToMydesign(this.props.profile_user['user_group']); return false;}}>MY DESIGN</a>
        )
    }
}

let mapStateToProps = (state) => {
  return{
    profile_user: state.profile_user,
  }
}


let mapDispatchToProps = (dispatch) => {
    return {
        onToMydesign: (groupid) => dispatch(changeUrl('/group/'+groupid+'/'))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Mydesign);