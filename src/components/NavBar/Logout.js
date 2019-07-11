import React from 'react'
import {connect} from 'react-redux'
import {signOut, changeUrl} from '../../actions'

class Logout extends React.Component {
    //TODO 커밋 전에는 portnum 8000으로 수정
    render() {

        return (
           <div>
              <a href="#" onClick={() => {this.props.onLogOut(); return false;}}>LOGOUT</a>
           </div>

       );
    }
}

let mapStateToProps = (state) => {
    return {
      username: state.authorization !== null ? Object.assign(state.authorization).split(":")[0] : null,
    
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onLogOut: () => dispatch(signOut()),


    }
}

Logout = connect(mapStateToProps, mapDispatchToProps)(Logout);

export default Logout
