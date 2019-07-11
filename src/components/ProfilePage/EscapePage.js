import React from 'react'
import { connect } from 'react-redux'
import { toEscape } from '../../actions/index.js';
class EscapePage extends React.Component{
    render(){
        const onChangeSubmit = ()=>{
            this.props.onClick(this.props.profile_user);
        }
        return(
            <div className="Button-Field">
                <button className="button button_white" onClick={onChangeSubmit}>WITHDRAW</button>
            </div>
        );
    }
}
let mapStateToProps = (state) => {
    return{
        profile_user:Object.assign(state.authorization).split(":")[0],
    }
}
let mapDispatchToProps = (dispatch) =>{
    return{
        onClick:(profuser)=>dispatch(toEscape(profuser)),
    }
}
export default EscapePage = connect(mapStateToProps, mapDispatchToProps)(EscapePage)
